const on = function ({$ctx, $el, $arg, $exp}) { //$ctx, $el, $arg, $exp
  const handler = function ($ev) {
    $ctx[$exp]({$el, $ev});
  };

  return {
    $mount() {
      $el.on($arg, handler);
    },
    $unmount() {
      $el.off($arg, handler);
    }
  }
};

export default on;
