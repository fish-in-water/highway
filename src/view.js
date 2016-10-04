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

    service.compile(this);

    element.compile(this.$el, this);

    directive.compile(this.$el, this, directive.PRIOR.EMERGENCY);

    component.compile(this.$el, this);

    directive.compile(this.$el, this);

    macro.compile(this.$el, this);

    this.$didmount();
  }

  $compile($el) {

    macro.compile($el, this);



    //element.compile($el, this);

    //directive.compile(this, directive.PRIOR.EMERGENCY, $el);

    //element.append($el, this);

    //directive.compile(this, directive.PRIOR.EMERGENCY);



    //directive.compile(this, directive.PRIOR.EMERGENCY);

    //component.compile(this);
		//
    //directive.compile(this);
		//
    //macro.compile(this);
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
    element.remove($el, this);
  }

  $destroy() {
    $ctx.$willunmount && $ctx.$willunmount();

    component.destroy($ctx);

    service.destroy($ctx);

    directive.destroy($ctx);

    macro.destroy($ctx);

    $ctx.$didunmount && $ctx.$didunmount();
  }
}

export default View;
