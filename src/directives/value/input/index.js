import text from './text';

const input = function ({$ctx, $el, $arg, $exp, $scope}) { //$ctx, $el, $arg, $exp
  switch ($el.attr('type').toLowerCase()) {
    case 'text':
      return text({$ctx, $el, $arg, $exp, $scope});
  }
};

export default input;
