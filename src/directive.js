import component from './component';
import element from './element';
import pipe from './pipe';
import {assign, includes, getAttrs, deconstruct, MapList} from './utils';

// 优先级常量, 最高-9, 默认0
const PRIOR = {
  EMERGENCY: -9,
  DEFAULT: 0
};

// 优先级
const priorities = [];

// 全局指令
const directives = {};

/**
 * 指令模块
 * 指令模块解析DOM上定义的属性并进行实例化
 * @param name 指令名
 * @param factory 工厂函数
 * @param priority 优先级
 */
const directive = function (name, factory, priority = PRIOR.DEFAULT) {

  // 创建优先级
  if (!includes(priorities, priority)) {
    priorities.push(priority);
    priorities.sort(function (prev, next) {
      return prev - next;
    });
  }

  // 工厂函数上附加优先级
  factory.priority = priority;
  directives[name] = factory;
};

assign(directive, {
  PRIOR,
  initial($ctx) {

    // 加载全局指令、局部指令至当前上下文
    $ctx.$directives = assign({}, directives, $ctx.$directives);

    // 记录指令实例,便于销毁释放
    $ctx.$directives._instances = new MapList;
  },
  compile($el, $scope, $ctx) {

    const handler = function ($el, $ctx, priority) {

      // 是否为组件
      if (component.isComponent($el, $ctx)) {
        return $el;
      }

      // 获得当前元素的所有ATTR属性并进行编译
      const attrs = getAttrs($el);
      for (var attr in attrs) {
        let name, arg;
        const index = attr.indexOf(':');
        if (index != -1) {
          name = attr.substring(0, index);
          arg = attr.substring(index + 1);
        } else {
          name = attr;
          arg = null;
        }

        const factory = $ctx.$directives[name];
        if (factory && factory.priority === priority) {
          const instance = factory({
            $ctx,
            $el,
            $arg: arg,
            $exp: attrs[attr],
            $scope,
            $directive: name
          });

          if (instance) {
            instance.$mount && instance.$mount($ctx);
            $ctx.$directives._instances.add(element.getId($el, true), instance);

            // halt compile
            if (instance.$halt) {
              return null;
            }

            // if $el changed after compile
            if (instance.$el) {
              $el = instance.$el;
            }
          }
        }
      }

      return $el;
    };

    // 根据指令优先级由高至低进行编译
    $el = priorities.reduce(function ($el, priority) {
      if (!$el) {
        return null;
      }

      return handler($el, $ctx, priority);
    }, $el);

    return $el;

  },
  pattern($exp, $scope, $ctx, $update) {
    const {prop, watch, secure, pipes} = deconstruct($exp);
    const wather = function (newVal, oldVal) {
      $update({newVal, oldVal, secure}); //secure ? secureHtml(value) : value
    };
    const pipeline = pipe.compile({
      prop, watch, secure
    }, pipes, $scope, wather, $ctx);

    wather(pipeline($scope.$get(prop)));

    if (watch) {
      let unwatcher = null;
      return {
        $mount() {
          unwatcher = $scope.$watch(prop, function (newVal, oldVal) {
            wather(pipeline(newVal), pipeline(oldVal));
          });
        },
        $unmount() {
          unwatcher();
          pipeline.destroy();
        }
      };
    } else {
      pipeline.destroy();
    }
  },
  remove($el, $ctx) {
    if (component.isComponent($el, $ctx)) {
      return;
    }

    const id = element.getId($el);
    if (id != null) {
      const instances = $ctx.$directives._instances.find(id);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount($ctx);
      }
      $ctx.$directives._instances.remove(id);
    }
  },
  destroy($ctx) {
    const keys = $ctx.$directives._instances.keys();
    for (const key in keys) {
      const instances = $ctx.$directives._instances.find(key);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount(this);
      }
    }

    $ctx.$directives._instances.clear();
    $ctx.$directives._instances = null;
    $ctx.$directives = null;
  }
});

export default directive;

// 内建指令
import ef from './directives/if';
import repeat from './directives/repeat';
import on from './directives/on';
import bind from './directives/bind';
import value from './directives/value';
import show from './directives/show';
import hide from './directives/hide';
import disable from './directives/disable';
import enable from './directives/enable';
import readonly from './directives/readonly';
import src from './directives/src';
import href from './directives/href';
import klass from './directives/klass';
import attr from './directives/attr';
import css from './directives/css';
import data from './directives/data';

directive('hi-if', ef, directive.PRIOR.EMERGENCY);
directive('hi-repeat', repeat, directive.PRIOR.EMERGENCY);
directive('hi-on', on);
directive('hi-bind', bind);
directive('hi-value', value);
directive('hi-show', show);
directive('hi-hide', hide);
directive('hi-disable', disable);
directive('hi-enable', enable);
directive('hi-readonly', readonly);
directive('hi-src', src);
directive('hi-href', href);
directive('hi-class', klass);
directive('hi-attr', attr);
directive('hi-css', css);
directive('hi-data', data);
