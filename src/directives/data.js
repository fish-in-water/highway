import directive from '../directive';
import {secureHtml, deconstruct} from '../utils';

const data = ({$el, $exp, $arg, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, ({newVal, secure}) => {
    newVal = secure ? secureHtml(newVal) : newVal;
    $el.attr('data-' + $arg, newVal);
  });
};

export default data;
