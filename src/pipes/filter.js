  import {deconstruct, secureHtml, isNumeric} from '../utils';

// =,!=,^=,$=,*=

const SYMBOLS = {
  EQUAL: '=',
  STRICT_EQUAL: '==',
  NOT_EQUAL: '!=',
  STRICT_NOT_EQUAL: '!==',
  START_WITH: '^=',
  END_WITH: '$=',
  CONTAINS: '*='
};

const filter = function ({$source: {
  prop: sourceProp, watch: sourceWatch, secure: sourceSecure
  }, $exp, $scope, $pipeline, $update}) {

  const conds = $exp.split(/or/i).map(function (exp) {
    const matches = exp.trim().match(/(\S+)\s*([=!^$*]+)\s*(\S+)/);
    return {
      field: deconstruct(matches[1]),
      symbol: matches[2],
      value: deconstruct(matches[3])
    }
  });

  const satisfy = function (obj) {
    for (const {field: {prop: fieldProp},
      symbol,
      value: {prop: valueProp}} of conds) {

      const prop = $scope.$get(fieldProp);
      const val = $scope.$get(valueProp);

      if (symbol === SYMBOLS.EQUAL &&
        obj[prop] == val) {
        return true;
      } else if (symbol === SYMBOLS.STRICT_EQUAL &&
        obj[prop] === val) {
        return true;
      } else if (symbol === SYMBOLS.NOT_EQUAL &&
        obj[prop] != val) {
        return true;
      } else if (symbol === SYMBOLS.STRICT_NOT_EQUAL &&
        obj[prop] !== val) {
        return true;
      } else if (symbol === SYMBOLS.START_WITH &&
        (new RegExp(`^${val}`).test(obj[prop]))) {
        return true;
      } else if (symbol === SYMBOLS.END_WITH &&
        (new RegExp(`${val}$`).test(obj[prop]))) {
        return true;
      } else if (symbol === SYMBOLS.CONTAINS &&
        (new RegExp(`${val}`).test(obj[prop]))) {
        return true;
      }
    }
    return false;
  };

  const iterator = function ($value) {
    const result = [];
    for (const item of $value || []) {
      satisfy(item) && result.push(item);
    }
    return result;
  };

  if (sourceWatch) {
    let unwatchers = [];
    return {
      $mount() {
        for (const {field: {prop: fieldProp},
          value: {prop: valueProp}} of conds) {

          unwatchers.push($scope.$watch(fieldProp, function () {
            $update($pipeline($scope.$get(sourceProp)));
          }));

          unwatchers.push($scope.$watch(valueProp, function () {
            $update($pipeline($scope.$get(sourceProp)));
          }));
        }
      },
      $iterator: iterator,
      $unmount() {
        for (const unwatcher of unwatchers) {
          unwatcher();
        }
        unwatchers = null;
      }
    };
  } else {
    return {
      $iterator: iterator
    }
  }
};

export default filter;
