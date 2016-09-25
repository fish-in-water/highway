import {deconstruct, secureHtml} from '../utils';

const bind = function ({$ctx, $exp, $update}) {
  const {prop, watch, secure} = deconstruct($exp);
  if (watch) {
    return {
      $mount() {
        $ctx.$scope.$watch(prop, $update);
      },
      $unmount() {
        $ctx.$scope.$unwatch(prop, $update);
      },
      $replace($text) {
        return $text.replace($exp, function () {
          const value = $ctx.$scope.$get(prop);
          return secure ? secureHtml(value) : value;
        });
      }
    };
  } else {
    const value = $ctx.$scope.$get(prop);
    return {
      $replace($text) {
        return $text.replace($exp, function () {
          return secure ? secureHtml(value) : value;
        });
      }
    };
  }
};

export default bind;
