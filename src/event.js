const on = function (name, callback, ctx) {
  if (!this._events) this._events = {};
  //this._events || (this._events = {});
  var events = this._events[name] || (this._events[name] = []);
  events.push({callback: callback, ctx: ctx});
};
const trigger = function (name) {
  var args = Array.prototype.slice.call(arguments).slice(1);
  var events = this._events && this._events[name];
  if (!events) return;
  events.forEach(function (ev, i) {
    ev.callback.apply(ev.ctx, args);
  });
};
const off = function (name, callback, ctx) {
  if (!this._events) return this;
  for (var n in this._events) {
    var events = this._events[n];
    if (!events) continue;
    for (var i = 0, ii = events.length; i < ii; i++) {
      var ev = events[i];
      if (!ev) continue;
      var remove = (n == (name || n)) &&
        (ev.callback == (callback || ev.callback)) &&
        (ev.ctx == (ctx || ev.ctx));
      if (remove) {
        events.splice(i, 1);
        i--;
      }
    }
  }
};

var event = {
  listenTo: function (obj, name, callback) {
    if (!obj || !name || !callback) return this;
    var listeningTo = this._listeningTo || (this._listeningTo = []);
    listeningTo.push({obj: obj, name: name, callback: callback});
    on.call(obj, name, callback, this);
    return this;
  },
  listenToOnce: function (obj, name, callback) {
    if (!obj || !name || !callback) return this;
    var self = this;
    var once = function () {
      callback.apply(self, arguments);
      self.stopListening(obj, name, once);
    };
    this.listenTo(obj, name, once);
    return this;
  },
  stopListening: function (obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;
    for (var i = 0, ii = listeningTo.length; i < ii; i++) {
      var to = listeningTo[i];
      if (!to) continue;
      var remove = (to.obj == (obj || to.obj)) &&
        (to.name == (name || to.name)) &&
        (to.callback == (callback || to.callback));
      if (remove) {
        listeningTo.splice(i, 1);
        off.call(to.obj, name, callback, this);
        i--;
      }
    }
    return this;
  },
  trigger: function (name) {
    trigger.apply(this, arguments);
    return this;
  }
};

export default event;
