import directive from '../directive';
import {secureUrl} from '../utils';

const src = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    $el.attr('src', secure ? secureUrl(newVal) : newVal);
  });
};

export default src;
