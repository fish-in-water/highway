import text from './text';
import number from './number';
import tel from './tel';
import password from './password';
import radio from './radio';
import checkbox from './checkbox';

const input = function ({$ctx, $el, $exp, $scope}) { //$ctx, $el, $arg, $exp
  switch (($el.attr('type') || '').toLowerCase()) {
    case 'text':
      return text({$ctx, $el, $exp, $scope});
    case 'number':
      return number({$ctx, $el, $exp, $scope});
    case 'tel':
      return tel({$ctx, $el, $exp, $scope});
    case 'password':
      return password({$ctx, $el, $exp, $scope});
    case 'radio':
      return radio({$ctx, $el, $exp, $scope});
    case 'checkbox':
      return checkbox({$ctx, $el, $exp, $scope});
    default :
      return text({$ctx, $el, $exp, $scope});
  }
};

export default input;
