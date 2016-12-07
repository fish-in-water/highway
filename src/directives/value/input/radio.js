import pipe from '../../../pipe';
import {deconstruct, secureHtml} from '../../../utils';

const radio = function ({$ctx, $el, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure, pipes} = deconstruct($exp);
  const watcher = function (value) {
    if (value === $el.val()) {
      $el.attr('checked', true);
    } else {
      $el.removeAttr('checked');
    }
  };
  const inputer = function () {
    $scope.$set(prop, $el.val());
  };
  const pipeline = pipe.compile({
    prop: prop, watch, secure
  }, pipes, $scope, watcher, $ctx);

  // if already checked
  if ($el[0].checked) {
    inputer();
  }

  watcher(pipeline($scope.$get(prop)));

  if (watch) {
    let unwatcher = null;
    return {
      $mount() {
        unwatcher = $scope.$watch(prop, function (value) {
          watcher(pipeline(value));
        });
        $el.on('change', inputer);
      },
      $unmount() {
        unwatcher();
        $el.off('change', inputer);
        pipeline.destroy();
      }
    };
  } else {
    pipeline.destroy();
  }
};

export default radio;
