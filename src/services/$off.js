const $off = function ($ctx) {
  return function (event, selector, handler) {
    $ctx.$el.off(event, selector, handler);
  }
};

export default $off;
