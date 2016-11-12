import directive from '../directive';
import {secureHtml} from '../utils';

const readonly = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? secureHtml(newVal) : newVal;
    if (!(newVal === 'false' || !newVal)) {
      $el.attr('readonly', 'readonly');
    } else {
      $el.removeAttr('readonly');
    }
  });
};

export default readonly;
