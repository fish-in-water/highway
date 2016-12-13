import {assign, isArray, isObject, isDate, isEqual, secureHtml, MapList} from '../utils';
import pipe from '../pipe';

const scope = function ({$ctx}) {
  const factory = function (obj) {
    let series = {};
    let watchers = new MapList;

    return assign(Object.create({

      $create(obj) {
        const scope = factory(obj);
        scope.$parent = this;
        return scope;
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
            scope: $ctx.$parent.$scope,
            prop: matches[1]
          }
        }

        // scope chains
        //const first = prop.match(/^([^.\[\]])+/)[0];
        //if (typeof series[first] === 'undefined' && this.$parent) {
        //  return {
        //    scope: $ctx.$parent.$scope,
        //    prop
        //  }
        //}

        return {
          scope: this,
          prop
        }
      },

      $get(prop = '') {
        const matches = prop.match(/^['"]([\s\S]*)['"]$/)
        if (matches) {
          return matches[1];
        }

        const where = this.$where(prop);
        if (where.scope === this) {
          const val = (() => {
            let val = series[prop];
            let scope = this;
            while (typeof val === 'undefined' && scope.$parent) {
              scope = scope.$parent;
              val = scope.$get(prop);
            }

            return val;
          }).call(this);


          if (isObject(val)) {
            if (isDate(val)) {
              return new Date(val);
            } else if (isArray(val)) {
              return assign([], val, true);
            }  else {
              return assign({}, val, true);
            }
          } else {
            return val;
          }
          /*
          if (isDate(val)) {
            return new Date(val);
          } else if (isArray(val)) {
            return assign([], val);
          } else if (isObject(val)) {
            return assign({}, val);
          } else {
            return val;
          }
          */
        } else {
          return where.scope.$get(where.prop);
        }
      },

      $set(prop = '', newVal = void 0) {
        const matches = prop.match(/^['"]([\s\S]*)['"]$/)
        if (matches) {
          return matches[1];
        }

        if (prop) {
          const iterator = function (path, val, obj) {
            const props = path.split('.');
            const tmp = props.shift();
            const matches = tmp.match(/([^\[]+)\[(\d+)]/);
            //array
            if (matches) {
              const prop = matches[1];
              const index = matches[2] - 0;
              if (obj[prop] == null) {
                obj[prop] = [];
              }

              if (!props.length) {
                obj[prop][index] = val;
              } else {
                if (obj[prop][index] == null) {
                  obj[prop][index] = {};
                }
                iterator(props.join('.'), val, obj[prop][index]);
              }
            } else {
              const prop = tmp;
              if (!props.length) {
                obj[prop] = val;
              } else {
                if (obj[prop] == null) {
                  obj[prop] = {};
                }
                iterator(props.join('.'), val, obj[prop]);
              }
            }
          };

          iterator(prop, newVal, this);

        } else {
          for (const key in this) {
            if (this.hasOwnProperty(key)) {
              delete this[key];
            }
          }

          assign(this, newVal);
        }

        const oldSeries = series;
        const newSeries = series = this.$series(this);

        //const reg = new RegExp(`^${prop}`);
        const arrayIndex = prop.indexOf('[');
        if (-1 != arrayIndex) {
          prop = prop.substring(0, arrayIndex);
        }

        const keys = watchers.keys();
        for (const key of keys) {
          const props = prop.split('.');
          const keys = key.split('.');

          if (0 === key.indexOf(prop) &&
            props[props.length - 1] === keys[props.length - 1]) {

            const oldValue = oldSeries[key];
            const newValue = newSeries[key];

            if (!isEqual(newValue, oldValue)) {
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

      // $pipe(val, pipes) {
      //   return pipe.compile(val, pipes, $ctx);
      // },

      $mount() {
        series = this.$series(this);
        return this;
      },

      $unmount() {
        series = null;
        watchers.clear();
        return this;
      }
    }), obj);
  };

  $ctx.$scope = factory($ctx.$scope);
  $ctx.$get = $ctx.$scope.$get.bind($ctx.$scope);
  $ctx.$set = $ctx.$scope.$set.bind($ctx.$scope);
  $ctx.$watch = $ctx.$scope.$watch.bind($ctx.$scope);
  $ctx.$unwatch = $ctx.$scope.$unwatch.bind($ctx.$scope);
  $ctx.$fire = $ctx.$scope.$fire.bind($ctx.$scope);

  return $ctx.$scope;
};

export default scope;
