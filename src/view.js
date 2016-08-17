import element from './element'
import event from './event';
import component from './component';
import service from './service';
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
        const attrs = Object.assign({}, element.getAttrs($old[0]));
        attrs[$old[0].tagName.toLowerCase()] = '';
        const $new = this.$el = $('<div></div>').attr(attrs);
        //const $new = this.$el = $('<div></div>').attr(
        //  Object.assign({'hi-component': $old[0].tagName.toLowerCase()}, element.getAttrs($old[0])));
        $old.replaceWith($new);

        this.tag = $old[0].tagName.toLowerCase();
      }

      // html template
      if (this.template) {
        this.$el.html(this.template);
      }
			//
      //// install delegates
      //this.$el.$on = (event, selector, handler) => {
      //  this.$el.on(event, selector, handler)
      //}
    }

    // compile elements
    {
      element.compile(this);
    }

    // compile components
    {
      component.compile(this);
    }

    // compile services
    {
      service.compile(this);
    }

    // compile directives
    {
      directive.compile(this);
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
