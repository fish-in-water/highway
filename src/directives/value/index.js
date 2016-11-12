import input from './input';
import textarea from './textarea';

const value = function ({$ctx, $el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  switch ($el[0].nodeName.toLowerCase()) {
    case 'input':
      return input({$ctx, $el, $arg, $exp, $scope});
    case 'textarea':
      return textarea({$ctx, $el, $arg, $exp, $scope});
  }
};

export default value;
