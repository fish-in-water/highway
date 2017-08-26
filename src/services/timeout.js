import {assign} from '../utils';

const timeout = ({$ctx}) => {
  const ids = [];

  $ctx.$timeout = assign((handler, delay) => {
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
