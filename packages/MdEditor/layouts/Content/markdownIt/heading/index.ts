import markdownit from 'markdown-it/lib';
import { Ref } from 'vue';
import { HeadList, MdHeadingId } from '~/type';

export interface HeadingPluginOps extends markdownit.Options {
  mdHeadingId: MdHeadingId;
  headsRef: Ref<HeadList[]>;
}

const HeadingPlugin = (md: markdownit, options: HeadingPluginOps) => {
  md.renderer.rules.heading_open = (tokens, idx) => {
    const token = tokens[idx];

    const text = tokens[idx + 1].content;
    const level = token.markup.length as 1 | 2 | 3 | 4 | 5 | 6;

    options.headsRef.value.push({
      text,
      level
    });

    if (token.map && token.level === 0) {
      token.attrSet('data-line', String(token.map![0]));
      token.attrSet(
        'id',
        options.mdHeadingId(text, level, options.headsRef.value.length)
      );
    }

    return md.renderer.renderToken(tokens, idx, options);
  };

  md.renderer.rules.heading_close = (tokens, idx, opts, _env, self) => {
    return self.renderToken(tokens, idx, opts);
  };
};

export default HeadingPlugin;
