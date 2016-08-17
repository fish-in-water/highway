const services = {};

const service = function (service, handler) {
  services[service] = handler;
};

Object.assign(service, {
  services,
  compile($ctx) {
    for (const service in services) {
      $ctx[service] = services[service]($ctx);
    }
  }
});

export default service;

