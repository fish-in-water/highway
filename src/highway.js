import View from './view';
import service from './service';
import component from './component';
import directive from './directive';
import macro from './macro';

const installServices = function () {
  const $scope = require('./services/$scope');
  const $timeout = require('./services/$timeout');

  service('$scope', $scope.default);
  service('$timeout', $timeout.default);

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
