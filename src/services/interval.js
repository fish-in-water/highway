import {assign} from '../utils';

const timeout = ({$ctx}) => {
  const ids = [];

  $ctx.$interval = assign((handler, delay) => {
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
