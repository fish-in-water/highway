import directive from '../directive';
import {secureHtml, deconstruct, construct} from '../utils';

const klass = ({$el, $exp, $arg, $scope, $ctx}) => { //$ctx, $el, $arg, $exp
  const {prop, watch, secure} = deconstruct($exp);
  const regexp = /\{([\s\S]+)}\[([\s\S]+)]/;

  // mapping
  if (regexp.test(prop)) {
    const instances = prop.split(';').map((klass) => {
      if (klass == null || klass === '') {
        return;
      }

      const matches = klass.match(regexp);   //{'red': 'bg-red', 'green': 'bf-green'}[bgColor]
      const data = {};
      matches[1].split(',').forEach((kv) => {
        const index = kv.indexOf(':');
        const key = kv.substring(0, index).trim().replace(/^['"]|['"]$/g, '');
        const val = kv.substring(index + 1).trim().replace(/^['"]|['"]$/g, '');
        data[key] = val;
      });
      const watcher = (newVal, oldVal) => {
        newVal = secure ? secureHtml(data[newVal]) : data[newVal];
        oldVal = secure ? secureHtml(data[oldVal]) : data[oldVal];

        if (newVal) {
          $el.addClass(newVal);
        }

        if (oldVal) {
          $el.removeClass(oldVal);
        }
      };

      watcher($scope.$get(matches[2]));

      return {
        prop: matches[2],
        watcher
      };
    });

    if (watch) {
      let unwatchers = [];
      return {
        $mount() {
          for (const instance of instances) {
            if (!instance) {
              continue;
            }

            const {prop, watcher} = instance;
            unwatchers.push($scope.$watch(prop, watcher))
          }
        },
        $unmount() {
          for (const unwatcher of unwatchers) {
            unwatcher();
          }
          unwatchers = null;
        }
      };
    }
  } else {
    prop.split(',').map((exp) => {
      if (exp == null || exp === '') {
        return;
      }

      return directive.pattern(construct(exp, watch, secure), $scope, $ctx, ({newVal, oldVal}) => {
        newVal = secure ? secureHtml(newVal) : newVal;
        oldVal = secure ? secureHtml(oldVal) : oldVal;

        if (newVal) {
          $el.addClass(newVal);
        }

        if (oldVal) {
          $el.removeClass(oldVal);
        }
      });
    });


  }
};

export default klass;
