import View from './view';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';

const installServices = function () {
  const scope = require('./services/scope');

  service('$scope', scope.default);
};

const installDirectives = function () {
  const on = require('./directives/on');
  const bind = require('./directives/bind');
  const value = require('./directives/value');

  directive('hi-on', on.default);
  directive('hi-bind', bind.default);
  directive('hi-value', value.default);
};

const installMacros = function () {
  const bind = require('./macros/bind');

  macro('\\[?\\[\\[(\\S+)]]]?', bind.default);
  macro('\\{?\\{\\{(\\S+)}}}?', bind.default);
};

installServices();
installDirectives();
installMacros();

const highway = Object.assign(View, {
  component,
  service,
  macro
});


export default highway;
