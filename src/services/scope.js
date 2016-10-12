import {MapList, isArray, isObject} from '../utils';
import pipe from '../pipe';

const scope = function ($ctx) {
  const factory = function (obj) {
    let series = {};
    let watchers = new MapList;

    return Object.assign(Object.create({

      $create(obj) {
        return factory(obj);
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

      $where(prop = '') {
        if (!prop) {
          return {
            scope: this,
            prop
          }
        }

        const matches = prop.match(/^(?:\$parent).([\s\S]*)/);
        if (matches) {
          return {
            scope: this.$parent.$scope,
            prop: matches[1]
          }
        }

        const first = prop.match(/^([^.\[\]])+/)[0];
        if (typeof series[first] === 'undefined' && this.$parent) {
          return {
            scope: this.$parent,
            prop
          }
        }

        return {
          scope: this,
          prop
        }
      },

      $get(prop = '') {
        const where = this.$where(prop);
        if (where.scope === this) {
          const val = series[prop];
          if (isArray(val)) {
            return Object.assign([], val);
          } else if (isObject(val)) {
            return Object.assign({}, val);
          } else {
            return val;
          }
        } else {
          return where.scope.$get(where.prop);
        }
      },

      $set(prop = '', newVal = void 0) {
        if (prop) {
          this[prop] = newVal;
        } else {
          for (const key in this) {
            if (this.hasOwnProperty(key)) {
              delete this[key];
            }
          }

          Object.assign(this, newVal);
        }

        const oldSeries = series;
        const newSeries = series = this.$series(this);

        const reg = new RegExp(`^${prop}`);
        const keys = watchers.keys();
        for (const key of keys) {
          if (reg.test(key)) {
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
        const where = this.$where(prop);
        if (where.scope === this) {
          return watchers.add(prop, handler);
        } else {
          return where.scope.$watch(where.prop, handler);
        }
      },

      $unwatch(prop, handler) {
        const where = this.$where(prop);
        if (where.scope === this) {
          return watchers.remove(prop, handler);
        } else {
          return where.scope.$unwatch(where.prop, handler);
        }
      },

      $fire(prop, newVal, oldVal) {
        const handlers = watchers.find(prop);
        for (const handler of handlers) {
          handler(newVal, oldVal);
        }
      },

      $pipe(val, pipes) {
        return pipe.compile(val, pipes, $ctx);
      },

      $mount($ctx) {
        series = this.$series(this);
      },

      $unmount($ctx) {
        series = null;
        watchers.clear();
      }
    }), obj);
  }

  $ctx.$scope = factory($ctx.$scope);

  return $ctx.$scope;
};

export default scope;
