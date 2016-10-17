import {isArray} from '../utils';

const orderby = function () {
  return {
    $iterator({$value, $exp}) {

      if (!$exp) {
        return $value;
      }

      if (!isArray($value)) {
        return $value;
      }

      const matches = $exp.match(/(\S+)\s+(\S+)/);
      const field = matches[1];
      const asc = !matches[2] || matches[2].toLowerCase() === 'asc';

      const result =  $value.sort(function (a, b) {
        return asc ? a[field] - b[field] : a[field] - b[field];
      })

      return result;
    }
  }
};

export default orderby;
