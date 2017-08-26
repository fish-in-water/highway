import {assign} from './utils';

const services = {};

/**
 * 服务模块
 * @param name 服务名
 * @param factory 工厂函数
 */
const service = (name, factory) => {
  services[name] = factory;
};

assign(service, {
  initial($ctx) {
    $ctx.$services = assign({}, services, $ctx.$services);
    for (const name in $ctx.$services) {
      const instance = $ctx.$services[name]({$ctx});
      $ctx.$services[name] = instance;
      instance.$mount && instance.$mount({$ctx});
    }
  },
  //compile($el, $scope, $ctx) {
	//
  //},
  destroy($ctx) {
    for (const name in $ctx.$services) {
      const instance = $ctx.$services[name];
      instance.$unmount && instance.$unmount({$ctx});
    }

    $ctx.$services = null;
  }
});

export default service;

// install build-in
import scope from './services/scope';
import event from './services/event';
import timeout from './services/timeout';
import interval from './services/interval';
import http from './services/http';
import find from './services/find';

service('$scope', scope);
service('$event', event);
service('$timeout', timeout);
service('$interval', interval);
service('$http', http);
service('$find', find);

