import directive from '../directive';
import {secureHtml} from '../utils';

const hide = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    $el.css('display', !(secure ? secureHtml(newVal) : newVal) ? '' : 'none');
  });
};

export default hide;
