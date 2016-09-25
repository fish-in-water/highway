var Notice = Highway.extend({
  $template: $('#t-notice').html()
});
Highway.component('notice', Notice);

var MyForm = Highway.extend({
  $template: $('#t-my-form').html()
});

var MyList = Highway.extend({
  $template: $('#t-my-list').html()
});

var MyService = function ($ctx) {
  return {
    sayName() {
      console.log('i am xia ge');
    }
  }
}

var app = new Highway({
  $el: $('#my-app'),
  $scope: {
    name: 'xuxia',
    age: 200
  },
  $components: {
    'my-form': MyForm,
    'my-list': MyList
  },
  $services: {
    'myService': MyService
  },
  $directives: {
    'hi-xxx': function () {

    }
  },
  $macros: {

  },
  clickMe() {
  },
  destroy() {
    this.$destroy();
  }
});


//debugger;
