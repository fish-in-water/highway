import {assign} from '../utils';

const timeout = function ($ctx) {
  const ids = [];

  $ctx.$timeout = assign(function (handler, delay) {
    return ids.push(window.setTimeout(handler.bind($ctx), delay));
  }, {
    $clear(id) {
      window.clearTimeout(id);
    },
    $unmount() {
      ids.forEach((id) => {
        this.$clear(id);
      })
    }
  });

  return $ctx.$timeout;
};

export default timeout;
