import {extend, assign} from './utils';
import compiler from './compiler';

class View {
  static extend = extend;

  constructor(options) {

    assign(this, options);

    this.$willmount && this.$willmount();

    compiler.initial(this).compile(this.$el, this.$scope, this);

    this.$mount && this.$mount();

    this.$didmount && this.$didmount();
  }

  $compile($el, $scope = this.$scope) {

    compiler.compile($el, $scope, this);
  }

  $remove($el) {

    compiler.remove($el, this);
  }

  $destroy() {

    this.$willunmount && this.$willunmount();

    compiler.remove(this.$el, this).destroy(this);

    this.$unmount && this.$unmount();

    this.$didunmount && this.$didunmount();
  }
}

export default View;
