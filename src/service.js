import {assign} from './utils';

const services = {};

const service = function (name, service) {
  services[name] = service;
};

assign(service, {
  initial($ctx) {
    $ctx.$services = assign({}, services, $ctx.$services);
    for (const service in $ctx.$services) {
      const instance = $ctx.$services[service]($ctx);
      $ctx.$services[service] = instance;
      instance.$mount && instance.$mount($ctx);
    }
  },
  //compile($el, $scope, $ctx) {
	//
  //},
  destroy($ctx) {
    for (const instance in $ctx.$services) {
      instance.$unmount && instance.$unmount($ctx);
    }

    $ctx.$services = null;
  }
});

export default service;

// install build-in
import scope from './services/scope';
service('$scope', scope);





