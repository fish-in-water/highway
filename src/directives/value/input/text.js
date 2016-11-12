import pipe from '../../../pipe';
import {deconstruct, secureHtml} from '../../../utils';

const text = function ({$ctx, $el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure, pipes} = deconstruct($exp);
  const watcher = function (value) {
    $el.val(secure ? secureHtml(value) : value);
  };
  const inputer = function () {
    $scope.$set(prop, $el.val());
  };
  const pipeline = pipe.compile({
    prop: prop, watch, secure
  }, pipes, $scope, watcher, $ctx);

  watcher(pipeline($scope.$get(prop)));

  if (watch) {
    let unwatcher = null;
    return {
      $mount() {
        unwatcher = $scope.$watch(prop, function (value) {
          watcher(pipeline(value));
        });
        $el.on('input', inputer);
        $el.on('change', inputer);
      },
      $unmount() {
        unwatcher();
        $el.off('input', inputer);
        $el.off('change', inputer);
        pipeline.destroy();
      }
    };
  } else {
    pipeline.destroy();
  }
};

export default text;
