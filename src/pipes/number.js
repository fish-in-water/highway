import {deconstruct, secureHtml, isNumeric} from '../utils';

const number = function ({$source: {
  prop: sourceProp, watch: sourceWatch, secure: sourceSecure
  }, $exp, $scope, $pipeline, $update}) {

  const {prop} = deconstruct($exp);
  const iterator = function ($value) {
    if (isNumeric($value)) {
      return ($value).toFixed($scope.$get($exp) - 0);
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

export default number;
