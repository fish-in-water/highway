import input from './input/index';
import textarea from './textarea';
import select from './select';

const value = function ({$ctx, $el, $exp, $scope}) { //$ctx, $el, $arg, $exp
  switch ($el[0].nodeName.toLowerCase()) {
    case 'input':
      return input({$ctx, $el, $exp, $scope});
    case 'textarea':
      return textarea({$ctx, $el, $exp, $scope});
    case 'select':
      return select({$ctx, $el, $exp, $scope});
  }
};

export default value;
