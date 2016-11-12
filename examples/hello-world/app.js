//var obj1 = {
//  test: 'test1'
//}
//
//var obj2 = Object.assign(obj1, {
//  test: 'test2'
//})
//
//debugger;



var Notice = Highway.extend({
  $template: $('#t-notice').html(),
  $scope: {
    male: true
  },
  $mount() {
    this.$on('myevent', function (data) {
      debugger;
    });
  },
  clickMe() {
    this.$emit('myevent', {a: 'a'});
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
    birthday: new Date,
    bgColor: 'red',
    fontSize: 'fs20',
    dateFormat: 'yyyy-MM-dd hh:mm:ss',
    info: {
      name: true,
      age: 200,
    },
    money: 100000,
    imgUrl: '//gw.alicdn.com/tps/TB1FDOHLVXXXXcZXFXXXXXXXXXX-183-129.png?imgtag=avatar',
    sortBy: 'id',
    limit: 2,
    books: [
      {
        id: '003',
        name: 'buwen'
      },
      {
        id: '001',
        name: 'abhuxue'
      },
      {
        id: '002',
        name: 'cingyu'
      }
    ],
    students: [
      {
        id: '001',
        name: 'xuxia'
      },
      {
        id: '002',
        name: 'huwei'
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
  $mount() {
    //this.$interval(function () {
    //  this.$scope.$set('birthday', new Date);
    //}, 1000);

    this.$on('myevent', function (data) {
      alert(1);
    });
  },
  clickMe() {
    alert(this.$scope.$get('password'));

    //this.$broadcast('myevent', {a: 'a'});



    // src="//m.baidu.com/static/index/plus/plus_logo.png"
    //this.$scope.$set('bgColor', 'green');
    //this.$scope.$set('fontSize', 'fs30');
    //this.$scope.$set('imgUrl', "//m.baidu.com/static/index/plus/plus_logo.png");

    //this.$scope.$set('sortBy', 'name');
    //this.$scope.$set('limit', 1);

    return;

    var books = this.$scope.$get('books');
    books.push({
      id: '003',
      name: 'yuwen'
    });
    this.$scope.$set('books', books);

    this.$scope.$set('male', !this.$scope.$get('male'));
    this.$scope.$set('female', !this.$scope.$get('female'));
    this.$scope.$set('info.name', 'huwei');
  },
  destroy() {
    this.$destroy();
  }
});




//debugger;
