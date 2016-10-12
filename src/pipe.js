const pipes = {};

const pipe = function (name, pipe) {
  pipes[name] = pipe;
};

Object.assign(pipe, {
  initial($ctx) {
    $ctx.$pipes = Object.assign({}, pipes, $ctx.$pipes);
    for (const pipe in $ctx.$pipes) {
      const instance = $ctx.$pipes[pipe]($ctx);
      $ctx.$pipes[pipe] = instance;
      instance.$mount && instance.$mount($ctx);
    }
  },
  compile($value, pipes, $ctx) {
    return pipes.reduce(function ($value, pipe) {
      const instance = $ctx.$pipes[pipe];
      if (!instance) {
        return $value;
        //throw new Error(`pipe of ${pipe} is not defined`);
      }
      const $iterator = instance.$iterator;
      return $iterator($value);
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

pipe('lowercase', lowercase);
pipe('uppercase', uppercase);
