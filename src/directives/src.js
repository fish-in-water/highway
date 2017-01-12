import directive from '../directive';
import {secureUri} from '../utils';

const src = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    $el.attr('src', secure ? secureUri(newVal) : newVal);
  });
};

export default src;
