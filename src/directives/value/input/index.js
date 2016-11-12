import text from './text';

//http://www.runoob.com/tags/att-input-type.html

const input = function ({$ctx, $el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  switch ($el.attr('type').toLowerCase()) {
    case 'text':
    case 'number':
    case 'tel':
    case 'password':
      return text({$ctx, $el, $arg, $exp, $scope});
  }
};

export default input;
