import {inject} from './utils/grocery';

const services = {};

const service = function (service, handler) {
  services[service] = handler;
};

Object.assign(service, {
  services,
  compile($ctx) {
    for (const service in services) {
      const instance = $ctx[service] = inject(services[service], {
        $ctx
      })();
      instance.$mount && instance.$mount();
    }
  },
  extend(handler) {
    return handler;
  }
});

export default service;

