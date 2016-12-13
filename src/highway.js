import View from './view';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';
import pipe from './pipe';
import utils from './utils';

/**
 * Highway MVVM
 */

const highway = utils.assign(View, {
  component,
  directive,
  service,
  macro,
  pipe,
  utils
});

export default highway;
