import {inject} from '../../utils/grocery'
import input from './input';

const value = function ($el, $ctx, $arg, $exp) {
  switch ($el.attr('tagName').toLowerCase()) {
    case 'input': {
      inject(input, {
        $el, $ctx, $arg, $exp
      })();
      break;
    }
  }
};

export default value;

