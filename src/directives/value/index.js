import input from './input';

const value = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  switch ($el.attr('tagName').toLowerCase()) {
    case 'input':
      return input({$ctx, $el, $arg, $exp});
  }
};

export default value;
