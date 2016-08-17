const $on = function ($ctx) {
  return function (event, selector, handler) {
    $ctx.$el.on(event, selector, handler);
  }
};

export default $on;
