import {assign} from '../utils';

const find = ({$ctx}) => {
  $ctx.$find = (selector) => {
    return $ctx.$el.find(selector)
  };
  return $ctx.$find;
};

export default find;
