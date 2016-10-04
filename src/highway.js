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
  const ef = require('./directives/if');
  const repeat = require('./directives/repeat');
  const on = require('./directives/on');
  const bind = require('./directives/bind');
  const value = require('./directives/value');
  const show = require('./directives/show');
  const hide = require('./directives/hide');

  directive('hi-if', ef.default, directive.PRIOR.EMERGENCY);
  directive('hi-repeat', repeat.default, directive.PRIOR.EMERGENCY);
  directive('hi-on', on.default);
  directive('hi-bind', bind.default);
  directive('hi-value', value.default);
  directive('hi-show', show.default);
  directive('hi-hide', hide.default);
};

const installMacros = function () {
  const bind = require('./macros/bind');

  macro('\\[?\\[\\[(\\S+)]]]?|\\{?\\{\\{(\\S+)}}}?', bind.default);
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
