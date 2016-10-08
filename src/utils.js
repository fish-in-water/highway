let counter = 0;
export function unique(prefix) {
  return `${prefix || ''}${counter++}`;
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

export function isObject(obj) {
  return obj instanceof Object;
  //return Object.prototype.toString.call(obj) === '[object Object]';
}

export function extend(options) {
  const Parent = this;
  class Child extends Parent {
    constructor(options) {
      super(options);
    }
  }
  Object.assign(Child.prototype, options);
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
}

export function deconstruct(exp) {
  const prop = exp.replace(/[\[\]\{\}]/gi, '');
  let watch = false;
  let secure = true;

  if (/{{{\s*[\s\S]+\s*}}}/.test(exp)) {
    watch = true;
    secure = false;
  } else if (/{{\s*[\s\S]+\s*}}/.test(exp)) {
    watch = true;
    secure = true;
  } else if (/\[\[\[\s*[\s\S]+\s*]]]/.test(exp)) {
    watch = false;
    secure = false;
  } else if (/\[\[\s*[\s\S]+\s*]]/.test(exp)) {
    watch = false;
    secure = true;
  } else {
    watch = true;
    secure = false;
  }

  return {
    prop,
    watch,
    secure
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
