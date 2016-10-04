import {deconstruct, secureHtml} from '../utils';

const repeat = function ({$ctx, $el, $arg, $exp}) {
  const {prop, watch} = deconstruct($exp);
  const matches = prop.match(/(\S*)\s+in\s+(\S*)/) ;//.match();
  //const itemProp = matches[1];
  const values = $ctx.$scope.$get(matches[2]) || [];
  for (const value in values) {

  }
};

export default repeat;
