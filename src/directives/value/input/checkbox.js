import pipe from '../../../pipe';
import {deconstruct, secureHtml} from '../../../utils';

const checkbox = function ({$ctx, $el, $exp, $scope}) { //$ctx, $el, $arg, $exp
  const {prop, watch, secure, pipes} = deconstruct($exp);

  const indexOf = (values, value) => {
    values = values || [];
    for (let i = 0, ii = values.length; i < ii; i++) {
      if (values[i] === value) {
        return i;
      }
    }
    return -1;
  };

  const watcher = function (values) {
    if (-1 != indexOf(values, $el.val())) {
      $el[0].checked = true;
    } else {
      $el[0].checked = false;
    }
  };
  const inputer = function () {
    const values = $scope.$get(prop) || [];
    if ($el[0].checked) {
      values.push($el.val());
    } else {

      const index = indexOf(values, $el.val());
      if (-1 != index) {
        values.splice(index, 1);
      }
    }

    $scope.$set(prop, values)
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

export default checkbox;
