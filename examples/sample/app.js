document.addEventListener('DOMContentLoaded', function () {

  var Todos = Highway.View.extend({
    $template: $('#t-todos').html(),
    $scope: {

    }
  });
  Highway.component('todos', Todos);

  var TodoForm = Highway.View.extend({
    $template: $('#t-todo-form').html(),
    $scope: {

    },
    onclick: function ($ev, $el, type) {
      debugger;
    }
  });
  Highway.component('todo-form', TodoForm);

  var App = Highway.View.extend({
    $template: $('#t-app').html(),
    $scope: {
      name: 'xuxia',
      age: '30<span style="color:red;">11</span>',
      city: '<span style="color:blue;">shanghai</span>'
    },
    change: function () {
      this.$scope.set('name', 'huwei');
    }
  });
  Highway.component('app', App);

  var start = +new Date;
  var app = new App({});
  console.log(+new Date - start)
});
