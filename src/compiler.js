import element from './element';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';
import pipe from './pipe';

/**
 * 编译器
 * 对元素（模板）、管道、服务、指令、组件、宏编译服务进行挂载与编译
 * 编译器进行编译工作时，对指定DOM元素进行递归遍历编译
 * @type {{initial: (($ctx?)), compile: (($el?, $scope?, $ctx?)), remove: (($el?, $ctx?)), destroy: (($ctx?))}}
 */
const compiler = {

  /**
   * 初始化
   * @param $ctx 上下文
   */
  initial($ctx) {

    // 元素
    element.initial($ctx);

    // 管道
    pipe.initial($ctx);

    // 服务
    service.initial($ctx);

    // 指令
    directive.initial($ctx);

    // 宏指令
    macro.initial($ctx);

    // 组件
    component.initial($ctx);

    return this;
  },

	/**
   * 对DOM进行遍历并编译
   * @param $el 元素
   * @param $scope 作用域
   * @param $ctx 上下文
   */
  compile($el, $scope, $ctx) {

		/**
     * 迭代
     * @param $el 元素
     * @param $scope 作用域
     * @param $ctx 上下文
     */
    const iterator = ($el, $scope, $ctx) => {
      if (!$el || !$el.length) {
        return;
      }

      // 如果是组件,则进行组件编译
      if (component.isComponent($el, $ctx)) {

        // 组件编译
        component.compile($el, $ctx)
      } else {

        // 指令编译
        if ($el = directive.compile($el, $scope, $ctx)) {

          // 宏指令编译
          if ($el = macro.compile($el, $scope, $ctx)) {

            // 子元素
            for (const childNode of Array.prototype.slice.call($el.children())) {
              iterator($(childNode), $scope, $ctx);
            }
          }
        }
      }
    };

    iterator($el, $scope, $ctx);

    return this;
  },

	/**
   * 对DOM元素进行销毁并删除
   * @param $el 元素
   * @param $ctx 上下文
   * @returns {compiler.remove}
   */
  remove($el, $ctx) {

		/**
     * 迭代器
     * @param $el 元素
     * @param $ctx 上下文
     */
    const iterator = ($el, $ctx) => {
      if (!$el || !$el.length) {
        return;
      }

      // 如果是组件
      if (component.isComponent($el, $ctx)) {

        // 组件销毁
        component.remove($el, $ctx);
      } else {

        // 遍历子元素
        for (const childNode of Array.prototype.slice.call($el.children())) {
          iterator($(childNode), $ctx);
        }

        // 宏指令销毁
        macro.remove($el, $ctx);

        // 指令销毁
        directive.remove($el, $ctx);

        // 元素销毁
        element.remove($el, $ctx);
      }
    };

    iterator($el, $ctx);

    return this;
  },
  destroy($ctx) {

    // 组件
    component.destroy($ctx);

    // 宏指令
    macro.destroy($ctx);

    // 指令
    directive.destroy($ctx);

    // 服务
    service.destroy($ctx);

    // 管道
    pipe.destroy($ctx);

    // 元素
    element.destroy($ctx);

    return this;
  }
};

export default compiler;
