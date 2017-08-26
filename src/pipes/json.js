import {isObject} from '../utils';

const json = () => {
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
