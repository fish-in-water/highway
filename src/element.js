import {getAttrs, MapList} from './utils';
import component from './component';

const element = {
  initial($ctx) {
    $ctx.$el = $ctx.$el || $('<div></div>');
    $ctx.$template && $ctx.$el.html($($ctx.$template));
  },
  compile($el, $ctx) {

  },
  remove($el, $ctx) {
    $el.remove();
  },
  destroy($ctx) {

  }
};

export default element;
