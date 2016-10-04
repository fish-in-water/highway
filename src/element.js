import {getAttrs} from './utils';
import component from './component';

const element = {
  compile($el, $ctx) {

    this.clear($el);

    // if is root element
    if ($el === $ctx.$el) {
      //compile el
      $ctx.$el = $ctx.$el || $('<div></div>');
      $ctx.$template && $ctx.$el.html($($ctx.$template));

      //if root is component
      if (component.isComponent($ctx.$el, $ctx)) {
        return;
      }
    }

    const iterator = function ($el, $ctx) {
      if (!$el || !$el.length || !$el[0]) {
        return;
      }

      $el.$children = $el.$children || [];
      for (const childNode of Array.from($el[0].childNodes || [])) {
        const $childNode = $(childNode);
        $childNode.$parent = $el;
        $el.$children.push($childNode);
        if (!component.isComponent($childNode, $ctx)) {
          iterator($childNode, $ctx);
        }
      }
    };

    iterator($ctx.$el, $ctx);
  },
  clear($el) {
    const iterator = function ($el) {
      if (!$el || !$el.length || !$el[0]) {
        return;
      }

      for (const $child of $el.$children || []) {
        delete $child.$parent;
        delete $child.$children;

        iterator($child);
      }
    };

    iterator($el);
  },
  clone($el) {
    const $clone = $el.clone();
    $clone.$parent = $el.$parent;
    $clone.$children = [];
    for (const $child of $el.$children || []) {
      $clone.$children.push($child);
    }
    return $clone;
  },
  append($el, $parent, index, $ctx) {
    if ($el === $ctx.$el) {
      $ctx.$el = $el;
      return;
    }

    const $prev = $parent.$children[index - 1];
    if ($prev && $prev.length) {
      $el.insertAfter($prev);
    } else {
      $el.prependTo($parent);
    }

    $parent.$children.splice(index, 0, $el);
  },
  where($el, $ctx) {
    if (!$el || !$el.length) {
      return {
        $parent: null,
        index: 0
      }
    }

    //if is root
    if ($el === $ctx.$el) {
      return {
        $parent: null,
        index: 0
      }
    }

    const $parent = $el.$parent;
    return {
      $parent,
      index: (function () {
        const $children = $parent.$children;
        for (let i = 0, ii = $children.length; i < ii; i++) {
          if ($children[i] === $el) {
            return i;
          }
        }
        return -1;
      })()
    }
  },
  remove($el, $ctx) {
    const {$parent, index} = this.where($el, $ctx);
    if (!$parent) {
      $ctx.$el = null;
    } else {
      $parent.$children.splice(index, 1);
    }

    $el.remove();
  },
  //replace($new, $old, $ctx) {
  //  const {$parent, index} = this.where($old, $ctx);
  //  //if is root
  //  if (!$parent) {
  //    $ctx.$el = $new;
  //  } else {
  //    $parent.$children[index] = $new;
  //  }
	//
  //  $old.replaceWith($new);
  //  return $new;
  //},
  destroy($ctx) {

  }
};

export default element;
