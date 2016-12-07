import {assign} from '../utils';

const find = function ({$ctx}) {
  $ctx.$find = function (selector) {
    return $ctx.$el.find(selector)
  };
  return $ctx.$find;
};

export default find;
