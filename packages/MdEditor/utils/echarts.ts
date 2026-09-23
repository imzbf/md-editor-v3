import { escapeHtml } from './md-it';

type Option = Record<string, any>;

const isOption = (value: unknown): value is Option => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// ECharts 的组件既支持单个对象，也支持数组；不递归扫描 dataset 等业务数据。
const mapComponents = (value: any, transform: (item: Option) => Option) => {
  if (Array.isArray(value)) {
    return value.map((item) => (isOption(item) ? transform(item) : item));
  }
  return isOption(value) ? transform(value) : value;
};

const safeLink = (value: unknown) => {
  if (typeof value !== 'string') return '';

  try {
    // URL 与浏览器一致地处理前导空白、控制字符和相对地址，避免仅检查字符串前缀。
    const url = new URL(value, 'https://md-editor.invalid/');
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? value : '';
  } catch {
    return '';
  }
};

// DataView 会把 lang[0..2] 写入 innerHTML，数字键对象等非数组配置也必须转义。
const escapeDataViewLang = (value: any) => {
  return [0, 1, 2].map((index) => {
    const text = value[index];
    return text == null ? text : escapeHtml(String(text));
  });
};

// feature 和 lang 都可能从全局配置继承；只清洗 dataView 自身会漏掉父级入口。
const sanitizeDataViewHost = (host: Option): Option => {
  const result = { ...host };
  if (host.lang != null) result.lang = escapeDataViewLang(host.lang);

  const dataView = host.feature?.dataView;
  if (isOption(dataView)) {
    const next = { ...dataView };
    if (dataView.title != null) next.title = escapeHtml(String(dataView.title));
    if (dataView.lang != null) next.lang = escapeDataViewLang(dataView.lang);
    result.feature = { ...host.feature, dataView: next };
  }
  return result;
};

const sanitizeTreeNode = (node: Option): Option => {
  const result = { ...node };
  if (Object.hasOwn(node, 'link')) result.link = safeLink(node.link);
  if (node.children) result.children = mapComponents(node.children, sanitizeTreeNode);
  return result;
};

const getSeriesId = (series: Option) => {
  const id = series.id;
  return typeof id === 'string' || typeof id === 'number' ? String(id) : undefined;
};

/**
 * 收敛 ECharts 自身的 HTML 与导航入口。JSON5 只限制语法，字符串模板仍可能进入
 * innerHTML。这里只复制并处理配置节点，不改写 dataset 或已识别普通系列的业务字段。
 * 应用提供的函数仍是受信任代码；这个处理器不是 JavaScript 沙箱。
 */
export const sanitizeEchartsOption = (option: unknown): Option => {
  if (!isOption(option)) {
    throw new TypeError('ECharts option must be an object.');
  }

  // ECharts 只展开根配置上的 baseOption/options/media，不递归解释增量项中的同名字段。
  const layers = [isOption(option.baseOption) ? option.baseOption : option];
  if (Array.isArray(option.options)) layers.push(...option.options.filter(isOption));
  if (Array.isArray(option.media)) {
    option.media.forEach((item) => {
      if (isOption(item) && isOption(item.option)) layers.push(item.option);
    });
  }

  // 增量配置可以省略 type；id 是稳定身份，名称可能重复，不能单独据此判断类型。
  const seriesIds = new Map<string, boolean>();
  let hasTreeSeries = false;
  for (const layer of layers) {
    const seriesList = Array.isArray(layer.series) ? layer.series : [layer.series];
    for (const series of seriesList) {
      if (!isOption(series) || !series.type) continue;

      const isTree = series.type === 'treemap' || series.type === 'sunburst';
      hasTreeSeries ||= isTree;
      const id = getSeriesId(series);
      if (id !== undefined) {
        seriesIds.set(id, seriesIds.get(id) === true || isTree);
      }
    }
  }

  const sanitizeLayer = (layer: Option): Option => {
    const result = sanitizeDataViewHost(layer);

    // 标题和 sunburst 节点的模型会回退到全局 link/sublink，父级也需要限制协议。
    for (const key of ['link', 'sublink']) {
      if (Object.hasOwn(layer, key)) result[key] = safeLink(layer[key]);
    }

    if (layer.tooltip != null) {
      // 非对象的组件声明也可能创建 tooltip，不能因此保留其默认 HTML 渲染模式。
      const tooltip = (value: unknown) => ({
        ...(isOption(value) ? value : {}),
        ...(value === false ? { show: false } : {}),
        renderMode: 'richText'
      });
      result.tooltip = Array.isArray(layer.tooltip)
        ? layer.tooltip.map(tooltip)
        : tooltip(layer.tooltip);
    }

    if (layer.title) {
      result.title = mapComponents(layer.title, (title) => {
        const next = { ...title };
        for (const key of ['link', 'sublink']) {
          if (Object.hasOwn(title, key)) next[key] = safeLink(title[key]);
        }
        return next;
      });
    }

    if (layer.toolbox) {
      result.toolbox = mapComponents(layer.toolbox, (toolbox) => {
        const next = sanitizeDataViewHost(toolbox);
        // dataView.title 为 null 时还会继承 toolbox.title。
        if (toolbox.title != null) next.title = escapeHtml(String(toolbox.title));
        return next;
      });
    }

    if (layer.series) {
      result.series = mapComponents(layer.series, (series) => {
        const id = getSeriesId(series);
        const byId = id === undefined ? undefined : seriesIds.get(id);
        // 空 type 也会继承原类型。没有稳定 id 的增量项可能按名称或空位匹配到树图。
        const isTree = series.type
          ? series.type === 'treemap' || series.type === 'sunburst'
          : (byId ?? hasTreeSeries);
        if (!isTree) return series;

        const next = sanitizeTreeNode(series);
        if (series.data) next.data = mapComponents(series.data, sanitizeTreeNode);
        if (series.levels) next.levels = mapComponents(series.levels, sanitizeTreeNode);
        return next;
      });
    }

    return result;
  };

  const result = sanitizeLayer(option);
  if (isOption(option.baseOption)) result.baseOption = sanitizeLayer(option.baseOption);
  if (Array.isArray(option.options)) {
    result.options = option.options.map((item) =>
      isOption(item) ? sanitizeLayer(item) : item
    );
  }
  if (Array.isArray(option.media)) {
    result.media = option.media.map((item) =>
      isOption(item) && isOption(item.option)
        ? { ...item, option: sanitizeLayer(item.option) }
        : item
    );
  }
  return result;
};
