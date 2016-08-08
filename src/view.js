import element from './utils/element'
import event from './event';
import component from './component';
import directive from './directive';

// privates methods
const privates = {
  initialize() {
    //init el
    {
      // el is empty
      if (!this.$el) {
        this.$el = $('<div></div>');
        const tag = component.findTag(this.constructor);
        const el = component.findEl(tag);
        if (tag && el) {
          this.$el = $(el);
        }
      }

      // if is component
      if (component.isComponent(this.$el[0])) {
        const $old = this.$el;
        const $new = this.$el = $('<div></div>').attr(
          Object.assign({'hi-component': $old[0].tagName.toLowerCase()}, element.getAttrs($old[0])));
        $old.replaceWith($new);
      }

      // html template
      if (this.template) {
        this.$el.html(this.template);
      }
    }

    // compile components
    {
      this.children = component.compile(this.$el[0], this);
    }

    // compile directives
    {

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
    class Klass extends View {
      constructor(options) {
        super(options);
      }
    }
    Object.assign(Klass.prototype, options);
    return Klass;
  },
});

//prototype
Object.assign(View.prototype, event);

export default View;
