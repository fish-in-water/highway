import {MapList} from '../utils';

const scope = function ($ctx) {
  let watchers = new MapList;
  $ctx.$scope = Object.assign(Object.create({
    $get(prop) {
      return $ctx.$scope[prop] || '';
    },

    $set(prop, newVal) {
      const oldVal = this.$get(prop);
      if (oldVal !== newVal) {
        $ctx.$scope[prop] = newVal;
        this.$fire(prop, newVal, oldVal);
      }
    },

    $watch(prop, handler) {
      return watchers.add(prop, handler);
    },

    $unwatch(prop, hanlder) {
      return watchers.remove(prop, handler);
    },

    $fire(prop, newVal, oldVal) {
      const handlers = watchers.find(prop);
      for (const handler of handlers) {
        handler(newVal, oldVal);
      }
    },

    $unmount($ctx) {
      watchers.clear();
    }
  }), $ctx.$scope);

  return $ctx.$scope;
};

export default scope;
