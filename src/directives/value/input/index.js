import {inject} from '../../../utils/grocery';
import directive from '../../../directive';
import text from './text';
import password from './password';

const input = directive.extend(function ($el, $ctx, $arg, $exp) {
  switch ($el.attr('type').toLowerCase()) {
    case 'text': {
      inject(text, {
        $el, $ctx, $arg, $exp
      })();
      break;
    }
    case 'password': {
      inject(password, {
        $el, $ctx, $arg, $exp
      })();
      break;
    }
  }
});

export default input;



