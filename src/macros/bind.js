import {deconstruct, secureHtml} from '../utils';
import pipe from '../pipe';

/**
 * bind宏
 * @param param0 
 */
const bind = ({$exp, $update, $scope, $ctx}) => {

  const {prop, watch, secure, pipes} = deconstruct($exp);

  const pipeline = pipe.compile({
    prop, watch, secure
  }, pipes, $scope, $update, $ctx);

  if (watch) {
    return {
      $mount() {
        $scope.$watch(prop, $update);
      },
      $unmount() {
        $scope.$unwatch(prop, $update);
        pipeline.destroy();
      },
      $iterator($text) {
        return $text.replace($exp, () => {
          let value = pipeline($scope.$get(prop));
          value = value == null ? '' : value;
          return secure ? secureHtml(value) : value;
        });
      }
    };
  } else {
    let value = pipeline($scope.$get(prop));
    value = value == null ? '' : value;
    pipeline.destroy();
    return {
      $iterator: {
        $exp,
        $value: secure ? secureHtml(value) : value
      }
    }
  }
};

export default bind;
