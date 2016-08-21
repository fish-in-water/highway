import View from './view';
import service from './service';
import component from './component';
import directive from './directive';
import macro from './macro';

const installServices = function () {
  const $template = require('./services/$template');
  const $el = require('./services/$el');
  const $scope = require('./services/$scope');
  const $on = require('./services/$on');
  const $off = require('./services/$off');

  service('$tempalte', $template.default);
  service('$el', $el.default);
  service('$scope', $scope.default);
  service('$on', $on.default);
  service('$off', $off.default);
};

const installDirectives = function () {
  const on = require('./directives/on');
  const value = require('./directives/value');

  directive('hi-on', on.default);
  directive('hi-value', value.default);

};

const installMacro = function () {

  const fill = require('./macros/fill');
  const bind = require('./macros/bind');

  macro('\\[?\\[\\[(\\S+)]]]?', fill.default);
  macro('\\{?\\{\\{(\\S+)}}}?', bind.default);
};

installServices();
installDirectives();
installMacro();

const highway = {
  View,
  service,
  directive,
  component,
  macro
};

export default highway;
