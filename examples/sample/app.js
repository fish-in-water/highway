document.addEventListener('DOMContentLoaded', function () {



  var Todos = Highway.View.extend({
    template: $('#t-todos').html(),
    $props: {

    }
  });
  Highway.component('todos', Todos);

  var TodoForm = Highway.View.extend({
    template: $('#t-todo-form').html(),
    $props: {

    },
    onclick: function ($ev, $el, type) {
      debugger;
    }
  });
  Highway.component('todo-form', TodoForm);

  var App = Highway.View.extend({
    template: $('#t-app').html(),
    $props: {

    }
  });
  Highway.component('app', App);

  var app = new App({});
});
