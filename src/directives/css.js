import directive from '../directive';
import {secureHtml, deconstruct} from '../utils';

const css = function ({$el, $exp, $arg, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    $el.css($arg, newVal);
  });
};

export default css;
