import {assign} from './utils';
import View from './view';
import component from './component';
import service from './service';
import directive from './directive';
import macro from './macro';
import pipe from './pipe';

const highway = assign(View, {
  component,
  service,
  macro,
  pipe
});

export default highway;
