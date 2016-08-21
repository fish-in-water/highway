import service from '../service';

const $timeout = service.extend(function () {
  let timeoutids = [];
  return {
    $unmount() {
      for (const timeoutid of timeoutids) {
        this.clear(timeoutid);
      }
      timeoutids = null;
    },
    set(handler, delay) {
      timeoutids.push(window.setTimeout(handler, delay));
    },
    clear(timeoutid) {
      window.clearTimeout(timeoutid);
    }
  }
});

export default $timeout;
