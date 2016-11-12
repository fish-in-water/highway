import {isObject} from '../utils';

const json = function () {
  return {
    $iterator($value) {
      if (isObject($value)) {
        return JSON.stringify($value);
      } else {
        return $value;
      }
    }
  }
};

export default json;
