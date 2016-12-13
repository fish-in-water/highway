import {MapList} from '../utils';

const event = function ({$ctx}) {
  let events = new MapList;

  $ctx.$on = function (name, handler) {
    return events.add(name, handler);
  };

  $ctx.$off = function (name, handler) {
    events.remove(name, handler);
  };

  $ctx.$listenTo = function (obj, name, handler) {
    return obj.$on(name, handler);
  };

  $ctx.$listenToOnce = function (obj, name, handler) {
    let stopper = null;
    const once = function () {
      handler.apply(this, arguments);
      stopper();
    };

    return stopper = $ctx.$listenTo(obj, name, once);
  };

  $ctx.$stopListening = function (obj, name, handler) {
    return obj.$off(name, handler);
  };

  $ctx.$fire = function (name, data) {
    const handlers = events.find(name);
    for (const handler of handlers) {
      if (handler.call($ctx, data) === false) {
        return false;
      }
    }
  };

  $ctx.$emit = function (name, data) {
    const parent = $ctx.$parent;
    if (parent) {
      if (parent.$fire(name, data) === false) {
        return;
      }
      parent.$emit(name, data);
    }
  };

  $ctx.$broadcast = function (name, data) {
    for (const child of $ctx.$components._instances.values()) {
      if (child.$fire(name, data) === false) {
        break;
      }
      child.$broadcast(name, data);
    }
  };

  return {
    $on: $ctx.$on,
    $off: $ctx.$off,
    $fire: $ctx.$fire,
    $emit: $ctx.$emit,
    $broadcast: $ctx.$broadcast,
    $fire: $ctx.$fire,
    $listenTo: $ctx.$listenTo,
    $listenToOnce: $ctx.listenToOnce,
    $$stopListening: $ctx.$stopListening,
    $unmount: function () {
      events.clear();
      events = null;
    }
  }
};

export default event;
