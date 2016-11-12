//import $ from 'Zepto';

export function noop() {}

let counter = 0;
export function unique(prefix) {
  return `${prefix || ''}${counter++}`;
}

export const assign = function () {
  const args = Array.prototype.slice.call(arguments);
  if (typeof jQuery != 'undefined') {
    const deep = args[args.length - 1];
    if (deep === true || deep === false) {
      args.pop();
      args.unshift(deep);
    }
  }
  return $.extend.apply(this, args);
};

export function includes(arr, val) {
  for (var i = 0, ii = arr.length; i < ii; i++) {
    if (arr[i] === val) {
      return true;
    }
  }

  return false;
}

export const isPlainObject = $.isPlainObject;

export function isDate(val) {
  return val instanceof Date;
}

export function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

export function isObject(val) {
  return val instanceof Object;
  //return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isNumeric(val) {
  return !isNaN(val);
}

export function keys(obj) {

}

export function isEqual(val0, val1) {
  if (!isObject(val0) && !isObject(val1)) {
    return val0 === val1;
  }

  if (isPlainObject(val0) && isPlainObject(val1)) {
    const merge = assign({}, val0, val1, true);
    for (const key in merge) {
      if (merge.hasOwnProperty(key)) {
        if (!isEqual(merge[key], val1[key])) {
          return false;
        }
      }
    }
    return true;
  }

  return false;
}

export function extend(options) {
  const Parent = this;
  class Child extends Parent {
    constructor(options) {
      super(options);
    }
  }
  assign(Child.prototype, options);
  return Child;
}

export function inject(handler, options) {
  const deps = handler.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
  const args = (deps || []).map(function (dep) {
    return options[dep];
  });
  return function () {
    return handler.apply(this, args);
  }
}

export class MapList {
  constructor() {
    this.data = {};
  }

  add(key, value) {
    const data = this.data;
    const list = data[key] || (data[key] = []);
    list.push(value);
    return () => {
      this.remove(key, value);
    };
  }

  remove(key, value) {
    const data = this.data;
    const list = data[key] || [];
    for (let i = 0, ii = list.length; i < ii; i++) {
      const v = list[i];
      if (v == null) {
        continue;
      }
      if (value == null || v === value) {
        list.splice(i, 1);
        i--;
      }
    }
  }

  find(key, value) {
    if (key == null) {
      return [];
    }

    const data = this.data;
    const list = data[key] || [];
    const result = [];
    for (const v of list) {
      if (value == null || v === value) {
        result.push(v);
      }
    }
    return result;
  }

  clear() {
    const data = this.data;
    for (const k in data) {
      this.remove(k);
    }
  }


  keys() {
    const keys = [];
    for (const key in this.data) {
      keys.push(key);
    }
    return keys;
  }

  values() {
    let values = [];
    for (const key of this.keys()) {
      values = values.concat(this.find(key));
    }
    return values;
  }
}

export function deconstruct(exp) {


  /*
  const exps = exp.trim()
    .replace(/^[\{]{2,3}/gi, '')
    .replace(/^[\[]{2,3}/gi, '')
    .replace(/[\}]{2,3}$/gi, '')
    .replace(/[\]]{2,3}$/gi, '')
    .split('|')
    .map(function (attr) {
      return attr.trim();
    });

  const exps = exp.replace(/[\[\]\{\}]/gi, '').split('|').map(function (attr) {
    return attr.trim();
  });
  */

  let watch = false;
  let secure = true;

  if (/{{{\s*[\s\S]+\s*}}}/.test(exp)) {
    exp = exp.trim().replace(/^[\{]{3}|[\}]{3}$/gi, '');
    watch = true;
    secure = false;
  } else if (/{{\s*[\s\S]+\s*}}/.test(exp)) {
    exp = exp.trim().replace(/^[\{]{2}|[\}]{2}$/gi, '');
    watch = true;
    secure = true;
  } else if (/\[\[\[\s*[\s\S]+\s*]]]/.test(exp)) {
    exp = exp.trim().replace(/^[\[]{3}|[\]]{3}$/gi, '');
    watch = false;
    secure = false;
  } else if (/\[\[\s*[\s\S]+\s*]]/.test(exp)) {
    exp = exp.trim().replace(/^[\[]{2}|[\]]{2}$/gi, '');
    watch = false;
    secure = true;
  } else {
    watch = true;
    secure = false;
  }

  const exps = exp.split('|').map(function (attr) {
      return attr.trim();
  });

  return {
    prop: exps[0],
    watch,
    secure,
    pipes: exps.slice(1)
  }
}

export function construct(exp, watch, secure) {
  exp = (exp || '').trim();

  if (watch) {
    if (secure) {
      return `{{${exp}}}`;
    } else {
      return `{{{${exp}}}}`;
    }
  } else {
    if (secure) {
      return `[[${exp}]]`;
    } else {
      return `[[[${exp}]]]`;
    }
  }
}

export function secureHtml(html) {
  if (null == html || '' == html) {
    return html;
  }

  if (typeof html === 'string') {
    return html.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/ /g, '&nbsp;');
  } else {
    return html;
  }
}

export function secureUrl(html) {
  if (null == html || '' == html) {
    return html;
  }

  if (typeof html === 'string') {
    return html.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/ /g, '&nbsp;');
  } else {
    return html;
  }
}

export function getAttrs($el) {
  const attrs = {};
  const node = $el[0];
  for (const attr in node.attributes) {
    if (node.attributes.hasOwnProperty(attr)) {
      attrs[node.attributes[attr].name] = node.attributes[attr].value;
    }
  }
  return attrs;
}
