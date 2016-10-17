import {assign} from './utils';

const pipes = {};

const pipe = function (name, pipe) {
  pipes[name] = pipe;
};

assign(pipe, {
  initial($ctx) {
    $ctx.$pipes = assign({}, pipes, $ctx.$pipes);

    for (const pipe in $ctx.$pipes) {
      const instance = $ctx.$pipes[pipe]($ctx);
      $ctx.$pipes[pipe] = instance;
      instance.$mount && instance.$mount($ctx);
    }
  },
  compile($value, pipes, $ctx) {
    return pipes.reduce(function ($value, pipe) {
      let exp = void 0;
      const index = pipe.indexOf(':');
      if (index != -1) {
        const ori = pipe;
        pipe = ori.substring(0, index).trim();
        exp = ori.substring(index + 1).trim();
      }

      const instance = $ctx.$pipes[pipe];
      if (!instance) {
        return $value;
      }
      const $iterator = instance.$iterator;
      return $iterator(({
        $value,
        $ctx,
        $exp: exp,
        $pipe: pipe
      }));
    }, $value);
  },
  destroy($ctx) {
    for (const instance in $ctx.$pipes) {
      instance.$unmount && instance.$unmount($ctx);
    }

    $ctx.$pipes = null;
  }
});

export default pipe;

// install build-in
import lowercase from './pipes/lowercase';
import uppercase from './pipes/uppercase';
import sort from './pipes/sort';

pipe('lowercase', lowercase);
pipe('uppercase', uppercase);
pipe('sort', sort);
