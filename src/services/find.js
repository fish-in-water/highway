import {assign} from '../utils';

/**
 * find服务
 * @param param0 
 */
const find = ({$ctx}) => {
  $ctx.$find = (selector) => {
    return $ctx.$el.find(selector)
  };
  return $ctx.$find;
};

export default find;
