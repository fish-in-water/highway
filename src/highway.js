import View from './view';
import component from './component';
import directive from './directive';

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
  const value = require('./directives/value');

  directive.default('hi-on', on.default);
  directive.default('hi-value', value.default);

};

installServices();
installDirectives();

const highway = {
  View,
  directive,
  component,
};

export default highway;