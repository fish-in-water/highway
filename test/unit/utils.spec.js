import {assert} from 'chai';
import {unique, isArray, extend} from '../../../src/utils';

describe('utils', function() {

  it('unique', function() {
    assert.equal(-1, unique() - unique());
  });

  it('isArray', function () {
    assert.equal(false, isArray());
    assert.equal(false, isArray(null));
    assert.equal(false, isArray(''));
    assert.equal(false, isArray(0));
    assert.equal(false, isArray({}));
    assert.equal(true, isArray([]));
  });

  it('isObject', function () {
    assert.equal(true, isArray([]));
    assert.equal(false, isArray({}));
  });

  it('extend', function () {
    class Klass {
      static extend = extend

      constructor() {

      }
    }

    const Child = Klass.extend({

    });

    assert.equal(true, new Child instanceof Klass);
  });

});
