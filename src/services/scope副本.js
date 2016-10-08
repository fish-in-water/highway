import {MapList, isArray, isObject} from '../utils';

const scope = function ($ctx) {
  const scope = {

  };

  let series = {};
  let watchers = new MapList;

  $ctx.$scope = Object.assign(Object.create({
    $create(prototype) {
      return Object.create(prototype);
    },

    $series(data) {
      const series = {};

      const iterator = function (prop, data) {

        series[prop] = data;

        if (isArray(data)) {
          for (let i = 0, ii = data.length; i < ii; i++) {
            const prop2 = prop + `[${i}]`;
            series[prop2] = data[i];
            iterator(prop + `[${i}]`, data[i]);
          }
        } else if (isObject(data)) {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const childProp = prop ? `${prop}.${key}` : `${key}`;
              iterator(childProp, data[key]);
            }
          }
        }
      };

      iterator('', data);

      return series;
    },

    $get(prop = '') {
      const matches = prop.match(/^(?:\$parent).([\s\S]*)/);
      if (matches) {
        return this.$get(matches[1]);
      }

      return series[prop];
    },

    $set(prop = '', newVal = void 0) {
      if (prop) {
        this[prop] = newVal;
      } else {

      }

      const oldSeries = series;
      const newSeries = series = this.$series(this);

      const reg = new RegExp(`^${prop}`);
      const keys = watchers.keys();
      for (const key of keys) {
        if (reg.test(prop)) {
          const oldValue = oldSeries[key];
          const newValue = newSeries[key];
          if (newValue !== oldValue) {
            this.$fire(key, newValue, oldValue);
          }
        }
      }

      return newVal;
    },

    $watch(prop, handler) {
      return watchers.add(prop, handler);
    },

    $unwatch(prop, handler) {
      return watchers.remove(prop, handler);
    },

    $fire(prop, newVal, oldVal) {
      const handlers = watchers.find(prop);
      for (const handler of handlers) {
        handler(newVal, oldVal);
      }
    },

    $mount($ctx) {
      series = this.$series(this);
    },

    $unmount($ctx) {
      watchers.clear();
    }
  }), $ctx.$scope);

  return $ctx.$scope;
};

export default scope;
