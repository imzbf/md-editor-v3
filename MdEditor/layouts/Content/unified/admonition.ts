// handles different types of whitespace
import { visit } from 'unist-util-visit';

const acceptableCalloutTypes = {
  note: { cssClass: '', iconClass: 'comment-alt-lines' },
  tip: { cssClass: 'is-success', iconClass: 'lightbulb' },
  info: { cssClass: 'is-info', iconClass: 'info-circle' },
  warning: { cssClass: 'is-warning', iconClass: 'exclamation-triangle' },
  danger: { cssClass: 'is-danger', iconClass: 'siren-on' }
};

/**
 * Plugin to generate callout blocks.
 */
export default function () {
  return (tree) => {
    visit(tree, (element) => {
      console.log('element', element);
    });
  };
}
