import element from './element'
import event from './event';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';

// privates methods
const privates = {
  initialize() {
    // compile services
    {
      service.compile(this);
    }

    // compile elements
    {
      element.compile(this);
    }

    // compile components
    {
      component.compile(this);
    }

    // compile directives
    {
      directive.compile(this);
    }

    // compile macros
    {
      macro.compile(this);
    }
  }
};

class View {
  // constructor
  constructor(options) {
    Object.assign(this, options);
    privates.initialize.call(this);
  }
}

// static
Object.assign(View, {
  extend(options) {
    class Hi extends View {
      constructor(options) {
        super(options);
      }
    }
    Object.assign(Hi.prototype, options);
    return Hi;
  },
});

//prototype
Object.assign(View.prototype, event);

export default View;
