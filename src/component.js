import {assign, getAttrs, MapList} from './utils';
import element from './element';

// 全局组件
const components = {};

/**
 * 组件模块
 * 组件模块完成视图中组件(子视图)的编译
 * 普通视图通过component模块加载(指定标签名),即变成组件
 * 例如
 * <my-app>
 *   <query>
 *   </query>
 *   <todos>
 *   </todos>
 * </my-app>
 * my-app视图拥有query, todos两个组件
 * 视图的组件化是非常重要的,有效避免重复开发
 * @param name 组件名称
 * @param View 视图
 */
const component = (name, View) => {
  components[name.toLowerCase()] = View;
};

assign(component, {

	/**
   * 组件初始化
   * @param $ctx
   */
  initial($ctx) {
    //$ctx.$children = [];

    // 完成对全局组件、局部组件加载
    $ctx.$components = assign({}, components, (() => {
      const components = {};
      for (const name in $ctx.$components) {
        components[name.toLowerCase()] = $ctx.$components[name];
      }
      return components;
    })());

    // 组件实例,便于组件实例的释放销毁
    $ctx.$components._instances = new MapList;

		/**
     * 记录子组件引用,通过hi-href='key'命令,达到引用子视图的目的
     * 例如
     * <my-app>
     *   <query hi-href='query'>
     *   </query>
     *   <todos hi-href='todos'>
     *   </todos>
     * </my-app>
     * 在my-app视图中,就可以使用this.$components.$refs['query']引用子视图
     */
    $ctx.$components.$refs = {};
  },

	/**
   * 编译
   * @param $el 元素
   * @param $scope 作用域
   * @param $ctx 上下文
   * @returns {*}
   */
  compile($el, $ctx) {

    // 最对组件进行编译
    if (!this.isComponent($el, $ctx)) {
      return $el;
    }

    // 根节点就是一个标签
    if ($el === $ctx.$el) {

      // 创建组件,但是并不认为是子组件
      this.createComponent($el, $ctx, null);
    } else {

      // 创建当前视图的子组件
      const instance = this.createComponent($el, $ctx, $ctx);

      // 保存实例对象,便于整体销毁、局部销毁时释放
      $ctx.$components._instances.add(element.getId(instance.$el, true), instance);

      // 如有hi-ref指令,则需要在$ctx.$components.$refs中加入,便于视图引用
      const ref = instance.$el.attr('hi-ref');
      if (ref) {
        $ctx.$components.$refs[ref] = instance;
      }
    }

    return null;
  },

	/**
   * 是否为组件
   * 根据DOM对象判断是否为组件
   * 判断依据主要有两个
   * 1、 根据当前元素ID在_instances中是否能查询出对象实例(针对已实例化的子组件)
   * 2、 则标签名是否能在$ctx.$components配置中找到(针对未实例化的子组件)
   * @param $el 元素
   * @param $ctx 上下文
   * @returns {*}
   */
  isComponent($el, $ctx) {

    // 在实例中能否根据ID找到
    const instances = $ctx.$components._instances.find(element.getId($el));
    if (instances && instances.length) {
      return true;
    }

    // 看下标签能否在$ctx.$components中找到
    const node = $el[0];
    return node &&
      node.nodeType === 1 &&
      !!$ctx.$components[node.tagName.toLowerCase()];
  },

	/**
   * 创建组件
   * @param $el 元素
   * @param $ctx 上下文
   * @param $parent 父视图
   */
  createComponent($el, $ctx, $parent) {
    const tagName = $el[0].tagName.toLowerCase();
    const View = $ctx.$components[tagName];
    // hi-component打这个属性为了更容易识别(因为编译后标签名就被替换了)
    const $new = $('<div></div>').html($el.html())
      .attr(assign({'hi-component': tagName}, getAttrs($el)));
    $el.replaceWith($new);
    const instance = new View({$el: $new, $parent});
    return instance;
  },

	/**
   * 删除组件
   * @param $el 元素
   * @param $ctx 上下文
   */
  remove($el, $ctx) {

    // 是否为组件
    if (!component.isComponent($el, $ctx)) {
      return;
    }

    // 根据ID找到实例并销毁
    const id = element.getId($el);
    if (id != null) {

      $ctx.$components._instances.find(id).forEach((instance) => {
        instance.$destroy();

        // 删除引用
        if (instance.$el) {
          const ref = instance.$el.attr('hi-ref');
          if (ref) {
            delete $ctx.$components.$refs[ref];
          }
        }

      });
      $ctx.$components._instances.remove(id);
    }
  },

	/**
   * 销毁
   * @param $ctx 上下文
   */
  destroy($ctx) {

    // 所有实例进行销毁
    $ctx.$components._instances.values().forEach((instance) => {
      instance.$destroy();
    });
  }
});

export default component;
