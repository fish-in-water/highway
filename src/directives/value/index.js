import input from './input';

const value = function ({$ctx, $el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  switch ($el[0].nodeName.toLowerCase()) {
    case 'input':
    case 'textarea':
    case 'select':
      return input({$ctx, $el, $arg, $exp, $scope});
  }
};

export default value;
