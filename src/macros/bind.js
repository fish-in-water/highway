import {deconstruct, secureHtml} from '../utils';

const bind = function ({$exp, $update, $scope}) {
  const {prop, watch, secure} = deconstruct($exp);
  if (watch) {
    return {
      $mount() {
        $scope.$watch(prop, $update);
      },
      $unmount() {
        $scope.$unwatch(prop, $update);
      },
      $iterator($text) {
        return $text.replace($exp, function () {
          let value = $scope.$get(prop);
          value = value == null ? '' : value;
          return secure ? secureHtml(value) : value;
        });
      }
    };
  } else {
    let value = $scope.$get(prop);
    return {
      $iterator: {
        $exp,
        $value: secure ? secureHtml(value) : value
      }
    }
  }
};

export default bind;
