import {inject} from '../../../utils/grocery';
import text from './text';

const input = function ($el, $ctx, $arg, $exp) {
  switch ($el.attr('type').toLowerCase()) {
    case 'text': {
      inject(text, {
        $el, $ctx, $arg, $exp
      })();
      break;
    }
  }
};

export default input;



