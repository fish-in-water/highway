//import $ from 'Zepto';

/**
 * noop空函数
 */
export const noop = () => {};

/**
 * //获取唯一ID
 * @param prefix 前缀 
 */
let counter = 0;
export const unique = (prefix) => {
  return `${prefix || ''}${counter++}`;
}

/**
 * 深度拷贝
 */
export const assign = function() {
  const args = Array.prototype.slice.call(arguments);
  if (typeof jQuery != 'undefined') {
    const deep = args[args.length - 1];
    if (deep === true || deep === false) {
      args.pop();
      args.unshift(deep);
    }
  }
  return $.extend.apply(null, args);
};

/**
 * 数组中是否包含
 * @param arr 
 * @param val 
 */
export const include = (arr, val) => {
  for (var i = 0, ii = arr.length; i < ii; i++) {
    if (arr[i] === val) {
      return i;
    }
  }

  return -1;
}

/**
 * 是否为空白对象
 */
export const isPlainObject = $.isPlainObject;

/**
 * 是否是日期
 * @param val 
 */
export const isDate = (val) => {
  return val instanceof Date;
}

/**
 * 是否是数组
 * @param val 
 */
export const isArray = (val) => {
  return Object.prototype.toString.call(val) === '[object Array]';
}

/**
 * 是否是对象
 * @param val 
 */
export const isObject = (val) => {
  return val instanceof Object;
  //return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 是否是数字
 * @param val 
 */
export const isNumeric = (val) => {
  return !isNaN(val);
}

/**
 * 是否是布尔true
 * @param val 
 */
export const isTrue = (val) => {
  return !(
    val === false ||
    val === 'false' ||
    val === '' ||
    val == null ||
    (isNumeric(val) && !(val - 0)));
}

/**
 * 是否相等
 * @param val0 
 * @param val1 
 */
export const isEqual = (val0, val1) => {
  if (!isObject(val0) && !isObject(val1)) {
    return val0 === val1;
  }

  // if (isPlainObject(val0) && isPlainObject(val1)) {
  //   const merge = assign({}, val0, val1, true);
  //   for (const key in merge) {
  //     if (merge.hasOwnProperty(key)) {
  //       if (!isEqual(merge[key], val1[key])) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  return false;
}

/**
 * 对象继承
 * @param options 
 */
export const extend = function (options) {
  const Parent = this;
  class Child extends Parent {
    constructor(options) {
      super(options);
    }
  }
  assign(Child.prototype, options);
  return Child;
}

/**
 * 依赖注入
 * @param handler 
 * @param options 
 */
export const inject = (handler, options) => {
  const deps = handler.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
  const args = (deps || []).map((dep) => {
    return options[dep];
  });
  return () => {
    return handler.apply(this, args);
  }
}

/**
 * MapList映射数组
 */
export class MapList {
  constructor() {
    this.data = {};
  }

  /**
   * add
   * @param key 
   * @param value 
   */
  add(key, value) {
    const data = this.data;
    const list = data[key] || (data[key] = []);
    list.push(value);
    return () => {
      this.remove(key, value);
    };
  }

  /**
   * remove
   * @param key 
   * @param value 
   */
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

  /**
   * find
   * @param key 
   * @param value 
   */
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

  /**
   * clear
   */
  clear() {
    const data = this.data;
    for (const k in data) {
      this.remove(k);
    }
  }

  /**
   * keys
   */
  keys() {
    const keys = [];
    for (const key in this.data) {
      keys.push(key);
    }
    return keys;
  }

  /**
   * values
   */
  values() {
    let values = [];
    for (const key of this.keys()) {
      values = values.concat(this.find(key));
    }
    return values;
  }
}

/**
 * 指令解构
 * @param exp 
 */
export const deconstruct = (exp) => {


  /*
  const exps = exp.trim()
    .replace(/^[\{]{2,3}/gi, '')
    .replace(/^[\[]{2,3}/gi, '')
    .replace(/[\}]{2,3}$/gi, '')
    .replace(/[\]]{2,3}$/gi, '')
    .split('|')
    .map((attr) => {
      return attr.trim();
    });

  const exps = exp.replace(/[\[\]\{\}]/gi, '').split('|').map((attr) => {
    return attr.trim();
  });
  */

  let watch = false;
  let secure = true;

  if (/{{{\s*[\s\S]+\s*}}}/.test(exp)) {   //{{{property}}}
    exp = exp.trim().replace(/^[\{]{3}|[\}]{3}$/gi, '');
    watch = true;
    secure = false;
  } else if (/{{\s*[\s\S]+\s*}}/.test(exp)) { //{{property}}
    exp = exp.trim().replace(/^[\{]{2}|[\}]{2}$/gi, '');
    watch = true;
    secure = true;
  } else if (/\[\[\[\s*[\s\S]+\s*]]]/.test(exp)) {  //[[[property]]]
    exp = exp.trim().replace(/^[\[]{3}|[\]]{3}$/gi, '');
    watch = false;
    secure = false;
  } else if (/\[\[\s*[\s\S]+\s*]]/.test(exp)) {   //[[property]]
    exp = exp.trim().replace(/^[\[]{2}|[\]]{2}$/gi, '');
    watch = false;
    secure = true;
  } else {
    watch = true;
    secure = false;
  }

  const exps = exp.split('|').map((attr) => {
      return attr.trim();
  });

  return {
    prop: exps[0],
    watch,
    secure,
    pipes: exps.slice(1)
  }
}

/**
 * 指令构建
 * @param exp 
 * @param watch 
 * @param secure 
 */
export const construct = (exp, watch, secure) => {
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

/**
 * 安全html
 * @param html 
 */
export const secureHtml = (html) => {
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

/**
 * 安全html
 * @param html 
 */
export const secureUri = (html) => {
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

/**
 * 获取DOM属性
 * @param 
 */
export const getAttrs = ($el) => {
  const attrs = {};
  const node = $el[0];
  for (const attr in node.attributes) {
    if (node.attributes.hasOwnProperty(attr)) {
      attrs[node.attributes[attr].name] = node.attributes[attr].value;
    }
  }
  return attrs;
}

export default {
  unique,
  assign,
  include,
  isPlainObject,
  isDate,
  isArray,
  isObject,
  isNumeric,
  isTrue,
  //isEqual,
  //extend,
  //inject,
  MapList,
  deconstruct,
  construct,
  secureHtml,
  secureUri,
  getAttrs
}
