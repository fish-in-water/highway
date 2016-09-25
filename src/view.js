import {extend} from './utils';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';

const privates = {
  compile($ctx) {
    $ctx.$willmount && $ctx.$willmount();

    component.compile($ctx);

    service.compile($ctx);

    directive.compile($ctx);

    macro.compile($ctx);

    $ctx.$didmount && $ctx.$didmount();
  },
  destroy($ctx) {
    $ctx.$willunmount && $ctx.$willunmount();

    component.destroy($ctx);

    service.destroy($ctx);

    directive.destroy($ctx);

    macro.destroy($ctx);

    $ctx.$didunmount && $ctx.$didunmount();
  }
};

class View {
  static extend = extend

  constructor(options) {
    Object.assign(this, options);
    privates.compile(this);
  }

  $willmount($ctx) {

  }

  $didmount($ctx) {

  }

  $willunmount($ctx) {

  }

  $didunmount($ctx) {

  }

  $destroy() {
    privates.destroy(this);
  }
}

export default View;
