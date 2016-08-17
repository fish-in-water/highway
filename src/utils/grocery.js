export function mixin(...Mixins) {
  class Klass {}

  for (let Mixin of Mixins) {
    Object.assign(Klass, Mixin);
    Object.assign(Klass.prototype, Mixin.prototype);
  }

  return Klass;
}

export function inject(handler, options) {
  const deps = handler.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
  const args = (deps || []).map(function (dep) {
    return options[dep] || dep;
  });
  return function () {
    handler.apply(this, args);
  }
}

