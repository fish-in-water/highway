
/**
 * on指令
 * @param param0 
 */
const on = ({$ctx, $el, $arg, $exp}) => { //$ctx, $el, $arg, $exp
  const handler = ($ev) => {
    $ctx[$exp]($el, $ev);
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
