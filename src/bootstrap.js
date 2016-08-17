const installServices = function () {
  const service = require('./service');
  const $on = require('./services/$on');
  const $off = require('./services/$off');

  service.default('$on', $on.default);
  service.default('$off', $off.default);
};

const installDirectives = function () {
  const directive = require('./directive');
  const on = require('./directives/on');

  directive.default('hi-on', on.default);
};

const bootstrap = function () {
  installServices();
  installDirectives();
}

export default bootstrap;
