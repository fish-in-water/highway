var Notice = Highway.extend({
  $template: $('#t-notice').html(),
  $scope: {
    male: true
  },
  clickMe() {
    this.$scope.$set('male', !this.$scope.$get('male'));
    this.$scope.$set('female', !this.$scope.$get('female'));
  }
});
Highway.component('notice', Notice);

var MyForm = Highway.extend({
  $template: $('#t-my-form').html()
});

var MyList = Highway.extend({
  $template: $('#t-my-list').html(),
  $scope: {
    name: 'xuxia',
    age: 200,
    male: true
  }
});

var MyService = function ($ctx) {
  return {
    sayName() {
      console.log('i am xia ge');
    }
  }
}

//alert($('#itest')[0] == $('.ktest')[0])

var app = new Highway({
  $el: $('#my-app'),
  $scope: {
    name: 'xuxia',
    age: 200,
    male: true,
    female: false,
    books: [
      {
        id: '001',
        name: 'yingyu'
      },
      {
        id: '002',
        name: 'shuxue'
      },
      {
        id: '003',
        name: 'yuwen'
      }
    ]
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
    this.$scope.$set('male', !this.$scope.$get('male'));
    this.$scope.$set('female', !this.$scope.$get('female'));
  },
  destroy() {
    this.$destroy();
  }
});


//debugger;
