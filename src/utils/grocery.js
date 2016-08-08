export function mixin(...Mixins) {
  class Klass {}

  for (let Mixin of Mixins) {
    Object.assign(Klass, Mixin);
    Object.assign(Klass.prototype, Mixin.prototype);
  }

  return Klass;
}


export function noop() {

}
