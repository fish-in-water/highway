casper.on('remote.message', function (e) {
  console.log(e)
});

casper.test.begin('directives:bind', 2, function (test) {
  casper
    .start('examples/directives/bind.html')
    .then(function () {
      test.assertSelectorHasText('#app > div', 'shanghai', 'city should be shangahi')
    })
    .thenEvaluate(function () {
      console.log('--->>>')
      console.log(window.app.$scope.$get('city'))
      console.log('--->>>')
      window.app.$scope.$set('city', 'shenzhen')
      console.log('--->>>')
      //console.log(window.app.$scope.$get('city'))
      console.log('--->>>')
    })
    .then(function () {
      test.assertSelectorHasText('#app > div', 'beijing', 'city should be beijing')
    })
    .run(function () {
      test.done()
    })
});
