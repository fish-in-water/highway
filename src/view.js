import {extend} from './utils';
import element from './element';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';

class View {
  static extend = extend

  constructor(options) {
    Object.assign(this, options);

    this.$willmount();

    {
      element.initial(this);

      service.initial(this);

      directive.initial(this);

      component.initial(this);

      macro.initial(this);
    }

    this.$compile(this.$el, this.$scope);

    this.$didmount();
  }

  $compile($el, $scope = this.$scope) {

    //service.compile($el, $scope, this);

    element.compile($el, $scope, this);

    directive.compile($el, $scope, this, directive.PRIOR.EMERGENCY);

    component.compile($el, $scope, this);

    directive.compile($el, $scope, this);

    macro.compile($el, $scope, this);
  }

  $willmount() {

  }

  $didmount() {

  }

  $willunmount() {

  }

  $didunmount() {

  }

  $remove($el) {
    component.remove($el, this);

    macro.remove($el, this);

    directive.remove($el, this);

    element.remove($el, this);
  }

  $destroy() {

    this.$willunmount && this.$willunmount();

    this.$remove(this.$el);

    {
      component.destroy(this);

      macro.destroy(this);

      directive.destroy(this);

      service.destroy(this);

      element.destroy(this);
    }

    this.$didunmount && this.$didunmount();
  }
}

export default View;
