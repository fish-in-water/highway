const services = {};

const service = function (name, service) {
  services[name] = service;
};

Object.assign(service, {
  initial($ctx) {
    $ctx.$services = Object.assign({}, services, $ctx.$services);
    for (const service in $ctx.$services) {
      const instance = $ctx.$services[service]($ctx);
      $ctx.$services[service] = instance;
      instance.$mount && instance.$mount();
    }
  },
  compile($ctx) {

  },
  destroy($ctx) {
    console.log('service destroy')
  }
});

export default service;
