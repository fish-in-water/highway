import {deconstruct, secureHtml} from '../utils';

const sort = ({$source: {
    prop: sourceProp, watch: sourceWatch, secure: sourceSecure
  }, $exp, $scope, $pipeline, $update}) => {

  const matches = $exp.match(/(\S+)\s+(\S+)/);
  const {prop: fieldProp} = deconstruct(matches[1]);
  const {prop: ascProp} = deconstruct(matches[2] || "'asc'");
  const iterator = ($value) => {
    const field = $scope.$get(fieldProp);
    const asc = $scope.$get(ascProp);

    return $value.sort((a, b) => {
      if (asc === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] > b[field] ? -1 : 1;
      }

      // if (a[field] > b[field]) {
      //   return asc === 'asc' ? 1 : -1;
      // } else if (a[field] < b[field]) {
      //   return asc === 'asc' ? 1 : -1;
      // } else {
      //   return 0;
      // }
    })
  };


  if (sourceWatch) {
    let fieldUnwatcher;
    let ascUnwatcher;
    return {
      $mount() {
        fieldUnwatcher = $scope.$watch(fieldProp, () => {
          $update($pipeline($scope.$get(sourceProp), sourceSecure));
        });

        ascUnwatcher = $scope.$watch(ascProp, () => {
          $update($pipeline($scope.$get(sourceProp), sourceSecure));
        });
      },
      $iterator: iterator,
      $unmount() {
        fieldUnwatcher();
        ascUnwatcher();
      }
    }
  } else {
    return {
      $iterator: iterator
    };
  }


};

export default sort;
