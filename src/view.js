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

    this.initial();

    this.$compile(this.$el);

    this.$didmount();
  }

  initial() {
    element.initial(this);

    service.initial(this);

    directive.initial(this);

    component.initial(this);

    macro.initial(this);
  }

  $compile($el) {

    element.compile($el, this);

    service.compile($el, this);

    directive.compile($el, this, directive.PRIOR.EMERGENCY);

    component.compile($el, this);

    directive.compile($el, this);

    macro.compile($el, this);
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
    directive.remove($el, this);

    element.remove($el, this);
  }

  $destroy() {
    this.$willunmount && this.$willunmount();

    component.destroy(this);

    service.destroy(this);

    directive.destroy(this);

    macro.destroy(this);

    this.$didunmount && this.$didunmount();
  }
}

export default View;
