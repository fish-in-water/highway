import {assign} from '../utils';

const timeout = function ({$ctx}) {
  const ids = [];

  $ctx.$interval = assign(function (handler, delay) {
    return ids.push(window.setInterval(handler.bind($ctx), delay));
  }, {
    $clear(id) {
      window.clearInterval(id);
    },
    $unmount() {
      ids.forEach((id) => {
        this.$clear(id);
      })
    }
  });

  return $ctx.$interval;
};

export default timeout;
