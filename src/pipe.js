import {assign, unique, MapList} from './utils';

const pipes = {};

const pipe = function (name, pipe) {
  pipes[name] = pipe;
};

assign(pipe, {
  initial($ctx) {
    $ctx.$pipes = assign({}, pipes, $ctx.$pipes);
    $ctx.$pipes._instances = new MapList;
  },
  compile($source, $pipes, $scope, $update, $ctx) {

    const id = unique('p');

    const pipeline = function (value) {
      return $ctx.$pipes._instances.find(id).reduce(function (value, instance) {
        return instance.$iterator(value)
      }, value);
    };

    for (let pipe of $pipes) {
      let exp = void 0;
      const index = pipe.indexOf(':');
      if (index != -1) {
        const ori = pipe;
        pipe = ori.substring(0, index).trim();
        exp = ori.substring(index + 1).trim();
      }

      const instance = $ctx.$pipes[pipe]({
        $source,
        $ctx,
        $pipe: pipe,
        $scope,
        $exp: exp,
        $update,
        $pipeline: pipeline
      });

      if (instance) {
        instance.$mount && instance.$mount($ctx);
        $ctx.$pipes._instances.add(id, instance);
      }
    }

    return assign(pipeline, {
      destroy: function () {
        const instances = $ctx.$pipes._instances.find(id);
        for (const instance of instances) {
          instance.$unmount && instance.$unmount($ctx);
        }
        $ctx.$pipes._instances.remove(id);
      }
    })
  },
  destroy($ctx) {
    $ctx.$pipes._instances.clear();
    $ctx.$pipes._instances = null;
    $ctx.$pipes = null;
  }
});

export default pipe;

// install build-in
import lowercase from './pipes/lowercase';
import uppercase from './pipes/uppercase';
import sort from './pipes/sort';
import limit from './pipes/limit';
import filter from './pipes/filter';
import json from './pipes/json';
import date from './pipes/date';
import number from './pipes/number';

pipe('lowercase', lowercase);
pipe('uppercase', uppercase);
pipe('sort', sort);
pipe('limit', limit);
pipe('filter', filter);
pipe('json', json);
pipe('date', date);
pipe('number', number);
