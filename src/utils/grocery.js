export function mixin(...Mixins) {
  class Klass {}

  for (let Mixin of Mixins) {
    Object.assign(Klass, Mixin);
    Object.assign(Klass.prototype, Mixin.prototype);
  }

  return Klass;
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

export function secureHtml(html) {
  if (null == html || '' == html) {
    return html;
  }

  return html.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/ /g, '&nbsp;');
}

export function deconstruction(exp) {
  const prop = exp.replace(/[\[\]\{\}]/gi, '');
  let watch = false;
  let secure = true;

  if (/{{{(\S+)}}}/.test(exp)) {
    watch = true;
    secure = false;
  } else if (/{{(\S+)}}/.test(exp)) {
    watch = true;
    secure = true;
  } else if (/\[\[\[(\S+)]]]/.test(exp)) {
    watch = false;
    secure = false;
  } else if (/\[\[(\S+)]]/.test(exp)) {
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

