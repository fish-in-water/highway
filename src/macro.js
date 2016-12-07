import component from './component';
import element from './element';
import {assign, MapList} from './utils';

// 全局宏指令
const macros = {};

/**
 * 宏指令
 * 在文本中的绑定,称之为宏,例如<span>hi, i am {{name}}, {{sex}}</span>
 * 宏指令使用正则表达式进行文本匹配,当文本匹配,调用相应的工厂函数生成宏指令实例
 * @param exp 正则表达式
 * @param factory 工厂函数
 */
const macro = function (exp, factory) {
  macros[exp] = factory;
};

assign(macro, {

	/**
   * 宏指令初始化
   * @param $ctx 上下文
   */
  initial($ctx) {

    // 加载全局宏指令、局部宏指令至当前上下文
    $ctx.$macros = assign({}, macros, $ctx.$macros, true);

    // 记录宏实例,便于销毁释放
    $ctx.$macros._instances = new MapList;
  },

	/**
   * 宏指令编译
   * @param $el 元素
   * @param $scope 作用域
   * @param $ctx 上下文
   * @returns {*}
   */
  compile($el, $scope, $ctx) {

    // 当前元素有子元素
    if ($el.children().length) {
      return $el;
    }

    // 获取元素原始文本
    const text = $el.text();
    if (text == null || text === '') {
      return $el;
    }

		/**
     * 在一段文本中,可能有多个宏指令,例如<span>hi, i am {{name}}, {{sex}}</span>
     * 其中任意一个字段值发生变化,都需要进行整体更新
     * @type {Array}
     */
    const instances = [];
    const update = function () {
      if (!instances || !instances.length) {
        return;
      }

			//分别调用了宏指令实例的$iterator方法,获得最后的目标值
      const newHtml = instances.reduce(function (text, instance) {
        const $iterator = instance.$iterator;
        if (!$iterator) {
          return text;
        }

        // 如$iterator是个函数,则调用

				/**
         * 判断$iterator类型
         * 如函数,则调用;如不是,直接进行replace
         * 为什么需要判断$iterator类型?
         * Highway同时支持双向绑定{{}}和单向绑定[[]]
         * 例如<span>hi, i am {{name}}, [[sex]]</span>
         * {{name}}双向, [[sex]]单向
         * 双向绑定相较于单向绑定会耗费更多的内存资源,对于大多数情况而言,单向绑定已满足需求
         * 在使用单向绑定时直接返回目标值,可以减少内存资源占用
         */
        if ($.isFunction($iterator)) {
          return $iterator(text);
        } else {
          return text.replace($iterator.$exp, $iterator.$value);
        }

      }, text);

			/**
       * 获取目标值后进行更新
       * 为什么使用html()而不是text()?
       * Highway支持安全编码{{ }}、[[ ]]和非安全编码{{{ }}}、[[[ ]]]
       * 例如使用name值为&nbsp; {{name}}输出{{&nbsp;}}, {{{name}}}输出{{{ }}}
       * 在使用时尽量使用安全编码,防止跨站攻击等安全问题
       */

      $el.html(newHtml == null ? '' : newHtml);
    };

		/**
     * 对当期文本调用宏指令正则表达式
     * 如果匹配,则生成宏指令实例
     */
    for (const exp in $ctx.$macros) {
      const matches = text.match(new RegExp(exp, 'gm'));
      if (matches) {
        // 有可能匹配到了多个, 例如: <span>hi, i am {{name}}, {{sex}}</span>
        for (const match of matches) {
          //以匹配到{{name}}为例
          const instance = $ctx.$macros[exp]({
            $ctx, // 上下文
            $el, // 元素。 示例值为: span
            $exp: match, // name
            $update: update, // 更新函数,如果字段值发生变化,需要即使更新显示值
            $scope // 作用域
          });
          if (!$.isFunction(instance.$iterator)) {
            instance.$iterator.$exp = match;
          };

          // $mount hook
          instance.$mount && instance.$mount($ctx);

          // instance
          instances.push(instance);

          // 为元素编码,在删除元素时需要释放对应的宏指令实例
          $ctx.$macros._instances.add(element.getId($el, true), instance);
        }
      }
    }

    // 首次调用触发更新
    update();

    return $el;
  },
	/**
   * 销毁元素上的宏指令实例
   * @param $el DOM元素
   * @param $ctx 上下文
   */
  remove($el, $ctx) {

    // 如果是组件, 返回, 组件的销毁由组件模块进行销毁
    if (component.isComponent($el, $ctx)) {
      return;
    }

    // 获取DOM元素上的ID,得到对应的宏指令实例,并进行销毁
    const id = element.getId($el);
    if (id != null) {
      let instances = $ctx.$macros._instances.find(id);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount($ctx);
      }
      $ctx.$macros._instances.remove(id);
    }
  },
	/**
   * 销毁宏指令模块
   * @param $ctx 上下文
   */
  destroy($ctx) {

    // 销毁所有宏指令实例
    const keys = $ctx.$macros._instances.keys();
    for (const key in keys) {
      const instances = $ctx.$macros._instances.find(key);
      for (const instance of instances) {
        instance.$unmount && instance.$unmount($ctx);
      }
    }
    $ctx.$macros._instances.clear();
    $ctx.$macros._instances = null;
    $ctx.$macros = null;

  }
});

export default macro;

// 内建宏指令
import bind from './macros/bind';
macro('\\[?\\[\\[([^\\]]+)]]]?|\\{?\\{\\{([^}]+)}}}?', bind);
//macro('\\[?\\[\\[(\\S+)]]]?|\\{?\\{\\{(\\S+)}}}?', bind);
