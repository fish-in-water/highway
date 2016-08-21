import {inject} from '../utils/grocery';

const $scope = function ($ctx) {
  const $scope = $ctx.$scope || ($ctx.$scope = {});
  const watches = {};
  return Object.assign($scope, {
    get(prop) {
      return $scope[prop];
    },
    set(prop, newVal) {
      const oldVal = $scope[prop];
      $scope[prop] = newVal;
      if (newVal !== oldVal) {
        this.fire(prop, oldVal, newVal);
      }
    },
    watch(prop, handler) {
      const handlers = watches[prop] || (watches[prop] = []);
      handlers.push(handler);
    },
    fire(prop, oldVal, newVal) {
      const handlers = watches[prop] || [];
      for (const handler of handlers) {
        inject(handler, {
          $old: oldVal,
          $new: newVal
        })();
      }
    }
  });
};

export default $scope;
