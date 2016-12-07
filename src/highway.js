import {assign} from './utils';
import View from './view';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';
import pipe from './pipe';

/**
 * Highway MVVM
 */
const highway = assign(View, {
  component,
  directive,
  service,
  macro,
  pipe
});

export default highway;
