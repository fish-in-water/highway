import {deconstruct, secureHtml, isNumeric} from '../utils';

const limit = function ({$source: {
    prop: sourceProp, watch: sourceWatch, secure: sourceSecure
  }, $exp, $scope, $pipeline, $update}) {

  const {prop} = deconstruct($exp);
  const iterator = function ($value) {
    return ($value || []).slice(0, (isNumeric($exp) ? $exp: $scope.$get($exp)) - 0);
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

export default limit;
