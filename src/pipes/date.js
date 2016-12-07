import {isDate, deconstruct, secureHtml} from '../utils';

const date = function ({$source: {
  prop: sourceProp, watch: sourceWatch, secure: sourceSecure
  }, $exp, $scope, $pipeline, $update}) {

  const {prop} = deconstruct($exp);
  const iterator = function ($value) {
    if (isDate($value)) {
      let format = $scope.$get(prop);
      const obj = {
        "M+": $value.getMonth() + 1,
        "d+": $value.getDate(),
        "h+": $value.getHours(),
        "m+": $value.getMinutes(),
        "s+": $value.getSeconds(),
        "q+": Math.floor(($value.getMonth() + 3) / 3),
        "S": $value.getMilliseconds()
      };

      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ($value.getFullYear() + '').substr(4 - RegExp.$1.length));
      }

      for (const key in obj) {
        if (new RegExp("(" + key + ")").test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ?
            (obj[k]) : (("00" + obj[key]).substr(("" + obj[key]).length)));
        }
      }

      return format;
      //return JSON.stringify($value);
    } else {
      return $value;
    }
  };

  if (sourceWatch) {
    let unwatcher = null;
    return {
      $mount() {
        unwatcher = $scope.$watch(prop, function () {
          $update($pipeline(sourceProp ? secureHtml($scope.$get(sourceProp)) : $scope.$get(sourceProp)));
        });
      },
      $iterator: iterator,
      $unmount() {
        unwatcher();
      }
    };
  } else {
    return {
      $iterator: iterator
    }
  }
};

export default date;
