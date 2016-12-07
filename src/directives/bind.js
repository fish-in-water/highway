import directive from '../directive';
import {secureHtml, isObject, isEqual, deconstruct} from '../utils';

const bind = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    newVal = isObject(newVal) ? newVal.toString() : newVal;
    $el.html(newVal);
  });
};

export default bind;
