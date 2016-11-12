
casper.on('remote.message', function (e) {
  console.log(e)
});

casper.test.begin('directives:bind', 2, function (test) {
  casper
    .start('examples/directives/bind.html')
    .then(function () {
      test.assertEquals('shanghai', this.evaluate(function() {
        return this.$('#app > div').html();
      }));
    })
    .then(function () {
      test.assertEquals('beijing', this.evaluate(function() {
        this.app.$scope.$set('city', 'beijing');
        return this.$('#app > div').html();
      }));
    })
    .run(function () {
      test.done();
    })
});


/*
 this.echo('Page title is: ' + this.evaluate(function() {
 return $('#app > div').html();
 }), 'INFO');
 */

//test.assertSelectorHasText('#app > div', 'shanghai', 'city should be shangahi');
//test.assertEquals(1, 1);

//.thenEvaluate(function () {
//  __utils__.echo('-------》》》》');
//  __utils__.echo('-------》》》》');
//
//  console.log('current city is:' + window.app.$scope.$get('city'));
//
//  return 1;
//})

//.thenEvaluate(function () {
//  console.log('--->>>')
//  console.log(window.app.$scope.$get('city'))
//  console.log('--->>>')
//  window.app.$scope.$set('city', 'shenzhen')
//  console.log('--->>>')
//  //console.log(window.app.$scope.$get('city'))
//  console.log('--->>>')
//})
