export default `<h2 id="1-基本使用示例">1. 基本使用示例</h2>
<p>目前一直在迭代开发，所以尽量安装最新版本。</p>
<pre><code class="language-shell">yarn <span class="hljs-keyword">add</span> md-editor-v3
</code><span class="copy-button">复制代码</span></pre>
<p>目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。</p>
<p>两种方式开发上区别在于<strong>vue 模板</strong>能很好的支持<code>vue</code>特性，比如指令，内置的双向绑定等；而<strong>jsx 语法</strong>更偏向于<code>react</code>的理念，开发环境来讲 jsx 如果在支持 ts 的环境下，会更友好一些。</p>
<h3 id="11-传统开发模式">1.1 传统开发模式</h3>
<p>通过直接链接生产版本来使用，下面是一个小 demo：</p>
<pre><code class="language-js"><span class="hljs-meta">&lt;!DOCTYPE <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-CN"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>传统开发模式中使用<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/md-editor-v3@1.1.4/lib/style.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"md-editor-v3"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">md-editor-v3</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"text"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue@3.1.5/dist/vue.global.prod.min.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/md-editor-v3@1.1.4/lib/md-editor-v3.umd.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
      <span class="hljs-keyword">const</span> <span class="hljs-title class_">App</span> = {
        <span class="hljs-title function_">data</span>(<span class="hljs-params"></span>) {
          <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">text</span>: <span class="hljs-string">'Hello Editor!!'</span>
          };
        }
      };
      <span class="hljs-title class_">Vue</span>.<span class="hljs-title function_">createApp</span>(<span class="hljs-title class_">App</span>).<span class="hljs-title function_">use</span>(<span class="hljs-title class_">MdEditor</span>V3).<span class="hljs-title function_">mount</span>(<span class="hljs-string">'#md-editor-v3'</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code><span class="copy-button">复制代码</span></pre>
<h3 id="12-模块化的-vue-模板">1.2 模块化的 vue 模板</h3>
<pre><code class="language-js"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-editor</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"text"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { defineComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'md-editor-v3'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'md-editor-v3/lib/style.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineComponent</span>({
  <span class="hljs-attr">components</span>: {
    <span class="hljs-title class_">MdEditor</span>
  },
  <span class="hljs-title function_">data</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>
    };
  }
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><span class="copy-button">复制代码</span></pre>
<h3 id="13-模块化的-jsx">1.3 模块化的 jsx</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { defineComponent, ref } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'md-editor-v3'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'md-editor-v3/lib/style.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineComponent</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'MdEditor'</span>,
  <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> text = <span class="hljs-title function_">ref</span>(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MdEditor</span> <span class="hljs-attr">modelValue</span>=<span class="hljs-string">{text.value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(v:</span> <span class="hljs-attr">string</span>) =&gt;</span> (text.value = v)} /&gt;</span>
    );
  }
});
</code><span class="copy-button">复制代码</span></pre>
<h3 id="14-图片上传">1.4 图片上传</h3>
<p>默认可以选择多张图片，支持截图粘贴板上传图片，支持复制网页图片粘贴上传。</p>
<blockquote>
<p>注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！请保存本地后再手动上传。</p>
</blockquote>
<pre><code class="language-js"><span class="hljs-keyword">async</span> <span class="hljs-title function_">onUploadImg</span>(<span class="hljs-params">files: FileList, callback: (urls: <span class="hljs-built_in">string</span>[]) =&gt; <span class="hljs-built_in">void</span></span>) {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
    <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(files).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">rev, rej</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> form = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>();
        form.<span class="hljs-title function_">append</span>(<span class="hljs-string">'file'</span>, file);

        axios
          .<span class="hljs-title function_">post</span>(<span class="hljs-string">'/api/img/upload'</span>, form, {
            <span class="hljs-attr">headers</span>: {
              <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'multipart/form-data'</span>
            }
          })
          .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> <span class="hljs-title function_">rev</span>(res))
          .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> <span class="hljs-title function_">rej</span>(error));
      });
    })
  );

  <span class="hljs-title function_">callback</span>(res.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item: <span class="hljs-built_in">any</span></span>) =&gt;</span> item.<span class="hljs-property">data</span>.<span class="hljs-property">url</span>));
}
</code><span class="copy-button">复制代码</span></pre>
<h2 id="2-props-说明">2. Props 说明</h2>
<p>这是组件最重要的一部分内容，<code>MdEditorV3</code>的属性参数如下：</p>
<br>

<table>
<thead>
<tr>
<th>名称</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
</tr>
</thead>
<tbody><tr>
<td>modelValue</td>
<td>String</td>
<td>''</td>
<td>编辑器内容，vue 模板支持双向绑定（v-model="value"），jsx 中需结合 onChange 事件使用。</td>
</tr>
<tr>
<td>theme</td>
<td>'light' | 'dark'</td>
<td>'light'</td>
<td>主题切换</td>
</tr>
<tr>
<td>editorClass</td>
<td>String</td>
<td>''</td>
<td>将被放到编辑器最外层类中，可用于覆盖某些特定的样式。</td>
</tr>
<tr>
<td>hljs</td>
<td>Object</td>
<td>null</td>
<td>项目中使用到了 highlight，可将实例直接传递，生产环境则不会请求 CDN，需要手动导入支持的高亮代码样式，参考：<a href="https://www.jsdelivr.com/package/npm/highlight.js?path=styles">代码样式传送门</a>。</td>
</tr>
<tr>
<td>highlightJs</td>
<td>String</td>
<td><a href="https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.1/highlight.min.js">highlight.js</a></td>
<td>highlightJs CDN 链接。</td>
</tr>
<tr>
<td>highlightCss</td>
<td>String</td>
<td><a href="https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css">atom-one-dark</a></td>
<td>预览高亮代码样式，更多参考上方<strong>代码样式传送门</strong>。</td>
</tr>
<tr>
<td>historyLength</td>
<td>Number</td>
<td>10</td>
<td>最大记录操作数，默认只记录最近 10 条输入。</td>
</tr>
<tr>
<td>pageFullScreen</td>
<td>Boolean</td>
<td>false</td>
<td>页面内全屏。</td>
</tr>
<tr>
<td>preview</td>
<td>Boolean</td>
<td>true</td>
<td>预览模式，左右分栏，左边为编辑器，右边为内容预览。</td>
</tr>
<tr>
<td>htmlPreview</td>
<td>Boolean</td>
<td>false</td>
<td>直接显示 编译后的 html 源代码（选中复制该内容不能完全展示，因为换行符被忽略了，要获取 html 代码请使用下面的监听事件）。</td>
</tr>
<tr>
<td>language</td>
<td>String</td>
<td>'zh-CN'</td>
<td>内置中英文('zh-CN','en-US')，可自行扩展其他语言，同时可覆盖内置的中英文。</td>
</tr>
<tr>
<td>languageUserDefined</td>
<td>Array</td>
<td>[{key: StaticTextDefaultValue}]</td>
<td>通过这里扩展语言，修改 language 值为扩展 key 即可，类型申明可手动导入</td>
</tr>
<tr>
<td>toolbars</td>
<td>Array</td>
<td>[all]</td>
<td>选择性展示工具栏，可选内容如下<sup>[toolbars]<sup></sup></sup></td>
</tr>
<tr>
<td>toolbarsExclude<sup>v1.1.4</sup></td>
<td>Array</td>
<td>[]</td>
<td>选择性不展示工具栏，内容同<code>toolbars</code></td>
</tr>
<tr>
<td>prettier</td>
<td>Boolean</td>
<td>true</td>
<td>是否启用 prettier 优化 md 内容</td>
</tr>
<tr>
<td>prettierCDN</td>
<td>String</td>
<td><a href="https://unpkg.com/prettier@2.3.2/standalone.js">standalone</a></td>
<td></td>
</tr>
<tr>
<td>prettierMDCDN</td>
<td>String</td>
<td><a href="https://unpkg.com/prettier@2.3.2/parser-markdown.js">parser-markdown</a></td>
<td></td>
</tr>
<tr>
<td>editorName</td>
<td>String</td>
<td>'editor'</td>
<td>当在同一页面放置了多个编辑器，最好提供该属性以区别某些带有 ID 的内容</td>
</tr>
</tbody></table>
<br>

<blockquote>
<p>!!! 编辑器内比较大小的扩展均使用了 CDN 链接，在没有外网的情况，请使用扩展属性替换为本地链接，比如：highlightJs = "//xxx.com/highlight.min.js"</p>
</blockquote>
<p><strong>工具栏选项</strong></p>
<pre><code class="language-js"><span class="hljs-string">'bold'</span>, <span class="hljs-string">'underline'</span>, <span class="hljs-string">'italic'</span>, <span class="hljs-string">'strikeThrough'</span>, <span class="hljs-string">'sub'</span>, <span class="hljs-string">'sup'</span>, <span class="hljs-string">'quote'</span>, <span class="hljs-string">'unorderedList'</span>,
<span class="hljs-string">'orderedList'</span>, <span class="hljs-string">'codeRow'</span>, <span class="hljs-string">'code'</span>, <span class="hljs-string">'link'</span>, <span class="hljs-string">'image'</span>, <span class="hljs-string">'table'</span>, <span class="hljs-string">'revoke'</span>, <span class="hljs-string">'next'</span>, <span class="hljs-string">'save'</span>,
<span class="hljs-string">'pageFullscreen'</span>, <span class="hljs-string">'fullscreen'</span>, <span class="hljs-string">'preview'</span>, <span class="hljs-string">'htmlPreview'</span>, <span class="hljs-string">'github'</span>

<span class="hljs-comment">// 对应功能名称</span>
<span class="hljs-string">'加粗'</span>, <span class="hljs-string">'下划线'</span>, <span class="hljs-string">'斜体'</span>, <span class="hljs-string">'删除线'</span>, <span class="hljs-string">'下标'</span>, <span class="hljs-string">'上标'</span>, <span class="hljs-string">'引用'</span>, <span class="hljs-string">'无序列表'</span>,
<span class="hljs-string">'有序列表'</span>, <span class="hljs-string">'行内代码'</span>, <span class="hljs-string">'块级代码'</span>, <span class="hljs-string">'链接'</span>, <span class="hljs-string">'图片'</span>, <span class="hljs-string">'表格'</span>, <span class="hljs-string">'后退一步'</span>, <span class="hljs-string">'前进一步'</span>, <span class="hljs-string">'保存'</span>，
<span class="hljs-string">'页面内全屏'</span>, <span class="hljs-string">'屏幕全屏'</span>, <span class="hljs-string">'内容预览'</span>, <span class="hljs-string">'html代码预览'</span>, <span class="hljs-string">'源码地址'</span>
</code><span class="copy-button">复制代码</span></pre>
<p>自定义语言，可在源码中搜索<code>StaticTextDefaultValue</code>，即可找到类型提示。中文示例（某些字段若不主动提供，可能会造成页面不美观）：</p>
<pre><code class="language-js">{
    toolbarTips: {
      bold: <span class="hljs-string">'加粗'</span>,
      underline: <span class="hljs-string">'下划线'</span>,
      italic: <span class="hljs-string">'斜体'</span>,
      strikeThrough: <span class="hljs-string">'删除线'</span>,
      title: <span class="hljs-string">'标题'</span>,
      sub: <span class="hljs-string">'下标'</span>,
      sup: <span class="hljs-string">'上标'</span>,
      quote: <span class="hljs-string">'引用'</span>,
      unorderedList: <span class="hljs-string">'无序列表'</span>,
      orderedList: <span class="hljs-string">'有序列表'</span>,
      codeRow: <span class="hljs-string">'行内代码'</span>,
      code: <span class="hljs-string">'块级代码'</span>,
      link: <span class="hljs-string">'链接'</span>,
      image: <span class="hljs-string">'图片'</span>,
      table: <span class="hljs-string">'表格'</span>,
      revoke: <span class="hljs-string">'后退'</span>,
      next: <span class="hljs-string">'前进'</span>,
      save: <span class="hljs-string">'保存'</span>,
      prettier: <span class="hljs-string">'美化'</span>,
      pageFullscreen: <span class="hljs-string">'浏览器全屏'</span>,
      fullscreen: <span class="hljs-string">'屏幕全屏'</span>,
      preview: <span class="hljs-string">'预览'</span>,
      htmlPreview: <span class="hljs-string">'html代码预览'</span>,
      github: <span class="hljs-string">'源码地址'</span>
    },
    titleItem: {
      h1: <span class="hljs-string">'一级标题'</span>,
      h2: <span class="hljs-string">'二级标题'</span>,
      h3: <span class="hljs-string">'三级标题'</span>,
      h4: <span class="hljs-string">'四级标题'</span>,
      h5: <span class="hljs-string">'五级标题'</span>,
      h6: <span class="hljs-string">'六级标题'</span>
    },
    linkModalTips: {
      title: <span class="hljs-string">'添加'</span>,
      descLable: <span class="hljs-string">'链接描述：'</span>,
      descLablePlaceHolder: <span class="hljs-string">'请输入描述...'</span>,
      urlLable: <span class="hljs-string">'链接地址：'</span>,
      UrlLablePlaceHolder: <span class="hljs-string">'请输入链接...'</span>,
      buttonOK: <span class="hljs-string">'确定'</span>,
      buttonUpload: <span class="hljs-string">'上传'</span>
    },
    // v1.<span class="hljs-number">1.4</span>新增
    copyCode: {
      text: <span class="hljs-string">'复制代码'</span>;
      tips: <span class="hljs-string">'已复制'</span>;
    }
  }
</code><span class="copy-button">复制代码</span></pre>
<h2 id="3-绑定事件">3. 绑定事件</h2>
<p>目前支持的内容如下：</p>
<br>

<table>
<thead>
<tr>
<th>名称</th>
<th>入参</th>
<th>说明</th>
</tr>
</thead>
<tbody><tr>
<td>onChange</td>
<td>v:String</td>
<td>内容变化事件（当前与<code>textare</code>的<code>oninput</code>事件绑定，每输入一个单字即会触发）</td>
</tr>
<tr>
<td>onSave</td>
<td>v:String</td>
<td>保存事件，快捷键与保存按钮均会触发</td>
</tr>
<tr>
<td>onUploadImg</td>
<td>files:FileList, callback:Function</td>
<td>上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传</td>
</tr>
<tr>
<td>onHtmlChanged</td>
<td>h:String</td>
<td>html 变化回调事件，用于获取预览 html 代码</td>
</tr>
</tbody></table>
<br>

<h2 id="4-快捷键使用">4. 快捷键使用</h2>
<p>目前除了<code>CTRL + T</code>与浏览器冲突意外，其余的都绑定了相应的快捷键。</p>
<p>主要以<code>CTRL</code>搭配对应功能英文单词首字母，冲突项添加<code>SHIFT</code>，再冲突替换为<code>ALT</code>。</p>
<table>
<thead>
<tr>
<th>键位</th>
<th>功能</th>
<th>说明</th>
<th>开发标记</th>
</tr>
</thead>
<tbody><tr>
<td>CTRL + S</td>
<td>保存</td>
<td>触发编辑器的<code>onSave</code>回调</td>
<td>√</td>
</tr>
<tr>
<td>CTRL + B</td>
<td>加粗</td>
<td><code>**加粗**</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + U</td>
<td>下划线</td>
<td><code>&lt;u&gt;下划线&lt;/u&gt;</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + I</td>
<td>斜体</td>
<td><code>*斜体*</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + 1-6</td>
<td>1-6 级标题</td>
<td><code># 标题</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + ↑</td>
<td>上角标</td>
<td><code>&lt;sup&gt;上角标&lt;/sup&gt;</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + ↓</td>
<td>下角标</td>
<td><code>&lt;sub&gt;下角标&lt;/sub&gt;</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + Q</td>
<td>引用</td>
<td><code>&gt; 引用</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + O</td>
<td>有序列表</td>
<td><code>1. 有序列表</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + L</td>
<td>链接</td>
<td><code>[链接](https://imbf.cc)</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + T</td>
<td>表格</td>
<td><code>|表格|</code> 放弃开发（无法实现）</td>
<td>x</td>
</tr>
<tr>
<td>CTRL + Z</td>
<td>撤回</td>
<td>触发编辑器内内容撤回，与系统无关</td>
<td>√</td>
</tr>
<tr>
<td>CTRL + SHIFT + S</td>
<td>删除线</td>
<td><code>~删除线~</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + SHIFT + U</td>
<td>无序列表</td>
<td><code>- 无序列表</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + SHIFT + C</td>
<td>块级代码</td>
<td>多行代码块</td>
<td>√</td>
</tr>
<tr>
<td>CTRL + SHIFT + I</td>
<td>图片链接</td>
<td><code>![图片](https://imbf.cc)</code></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + SHIFT + Z</td>
<td>前进一步</td>
<td>触发编辑器内内容前进，与系统无关</td>
<td>√</td>
</tr>
<tr>
<td>CTRL + SHIFT + F</td>
<td>美化内容</td>
<td></td>
<td>√</td>
</tr>
<tr>
<td>CTRL + ALT + C</td>
<td>行内代码</td>
<td>行内代码块</td>
<td>√</td>
</tr>
</tbody></table>
<h2 id="5-开发理念">5. 开发理念</h2>
<p>本节介绍编辑器中部分功能的实现。</p>
<h3 id="51-编辑区">5.1 编辑区</h3>
<ul>
<li><p>由于不是富文本编辑器，所以采用了<code>textarea</code>标签作为编辑区。</p>
</li>
<li><p>为解决代码插入文本，在我的博客留言板中封装了两个比较实用的方法<code>insert</code>和<code>setPosition</code>，一个用于向光标位置插入特定内容，另一个用于重新定位光标位置，<a href="https://github.com/imzbf/md-editor-v3/blob/master/MdEditor/utils/index.ts">源码位置</a>。</p>
</li>
<li><p>编辑器与工具栏的交互，由于没有 vuex，所以内置了<code>EventBus</code>，在不同地方通过这种方式来进行交互。（目前，同一页面嵌入两个编辑器<code>EventBus</code>被共享，暂未修复）。</p>
</li>
<li><p>编辑器与快捷键，通过监听每一个按键对应的<code>ctrl</code>、<code>shift</code>等属性是否为<code>true</code>实现，并且均阻止了默认事件触发。在 windows 中以<code>CTRL</code>键为主要触发单元，在 MacOS 中以<code>META</code>键为主。</p>
</li>
</ul>
<h3 id="52-组件：divider">5.2 组件：<strong>Divider</strong></h3>
<p>分隔符，应用于工具栏中分隔功能模块，美化作用，实现为以宽为<code>1px</code>的元素做衬托。</p>
<h3 id="53-组件：dropdown">5.3 组件：<strong>Dropdown</strong></h3>
<p>源码：<a href="https://github.com/imzbf/md-editor-v3/tree/master/MdEditor/components/Dropdown">传送门</a></p>
<ul>
<li><p>下拉模块，主要用于下拉菜单使用。该组件将主插槽内容作为触发器，<code>overlay</code>插槽内容作为拉下展示内容，通过 vue 内置的<code>cloneVNode</code>方法克隆组件，以绑定扩展属性及事件，达到了不添加多余的节点的目的；</p>
</li>
<li><p>内容插入通过 vue 内置的<code>Teleport</code>组件，将内容插入到编辑器内部（预设的地方），不会污染全局结构；</p>
</li>
<li><p>在卸载对应组件时，<code>onUnmounted</code>方法会主动卸载绑定事件。</p>
</li>
</ul>
<h3 id="54-组件：modal">5.4 组件：Modal</h3>
<p>源码：<a href="https://github.com/imzbf/md-editor-v3/tree/master/MdEditor/components/Modal">传送门</a></p>
<ul>
<li>作为弹窗模块使用，实现与<strong>Dropdown</strong>大为相似，默认了显示动画及居中位置；</li>
<li>这里加入了一个新特性，在显示弹窗时，可以通过点击弹窗标题移动弹框。</li>
</ul>
<p>封装的移动元素<a href="https://github.com/imzbf/md-editor-v3/blob/master/MdEditor/utils/dom.ts">代码</a>，优化了正确解绑事件，该方法针对了触发器实现，单一窗口并不通用。</p>
<h3 id="55-主题模式">5.5 主题模式</h3>
<p>内置了暗黑和默认模式，两种模式由内部<code>theme</code>属性控制，由于<code>antd</code>中以<code>less</code>修改变量值达到切换主题的方式依赖项较多，并未采用，实现则是最基础的两种主题两个类名的方式。</p>
<h2 id="结尾">结尾</h2>
<p>若有觉得可用的功能或发现编辑器的 Bug，请通过以下方式反馈给我，让我们共同进步。</p>
<ol>
<li>邮箱：<a href="mailto:zbfcqtl@163.com">zbfcqtl@163.com</a></li>
<li>博客留言：<a href="https://imbf.cc">imbf.cc</a></li>
<li>issue 管理：<a href="https://github.com/imzbf/md-editor-v3/issues">github issues</a></li>
</ol>`;
