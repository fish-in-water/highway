import {unique, MapList} from './utils';
import component from './component';

const element = {
  initial($ctx) {
    $ctx.$el = $ctx.$el || $('<div></div>');
    $ctx.$template && $ctx.$el.html($($ctx.$template));
  },
  compile($el, $scope, $ctx) {
    return $el;
  },
  remove($el, $ctx) {
    $el.remove();
  },
  getId($el, generate = false) {
    let id = $el.attr('hi-id');
    if (generate && id == null) {
      $el.attr('hi-id', id = unique());
    }
    return id;
  },
  destroy($ctx) {
    $ctx.$el.remove();
    $ctx.$el = null;
    $ctx.$template = null;
  }
};

export default element;
