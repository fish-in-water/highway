import {inject} from '../../utils/grocery';
import directive from '../../directive';
import input from './input';

const value = directive.extend(function ($el, $ctx, $arg, $exp) {
  switch ($el.attr('tagName').toLowerCase()) {
    case 'input': {
      inject(input, {
        $el, $ctx, $arg, $exp
      })();
      break;
    }
  }
});

export default value;

