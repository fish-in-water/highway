import {extend, assign} from './utils';
import compiler from './compiler';

/**
 * 视图层
 */
class View {
  static extend = extend;

  /**
   * 构造
   * @param options 参数
   */

  constructor(options) {

    assign(this, options);

    // $willmount hook
    this.$willmount && this.$willmount();

    // compiler, initial -> compile
    compiler.initial(this).compile(this.$el, this.$scope, this);

    // $mount hook，最常用
    this.$mount && this.$mount();

    // $didmount hook
    this.$didmount && this.$didmount();
  }

  /**
   * 销毁
   */
  $destroy() {

    // $willunmount hook
    this.$willunmount && this.$willunmount();

    // compiler, remove -> destroy
    compiler.remove(this.$el, this).destroy(this);

    // $unmount hook, 最常用
    this.$unmount && this.$unmount();

    // $didunmount hook
    this.$didunmount && this.$didunmount();
  }
}

export default View;
