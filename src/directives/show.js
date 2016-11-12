import directive from '../directive';
import {secureHtml} from '../utils';

const show = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    $el.css('display', newVal? '' : 'none');
  });
};

export default show;
