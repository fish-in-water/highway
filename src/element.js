import {unique, MapList} from './utils';
import component from './component';

/**
 * 元素模块
 * 负责对$el的编译处理,同时提供一部分元素相关工具函数
 * @type {{initial: (($ctx)), compile: (($el, $scope, $ctx)), remove: (($el, $ctx)), getId: (($el, generate?)), destroy: (($ctx))}}
 */
const element = {
	/**
   * 初始化
   * @param $ctx 上下文
   */
  initial($ctx) {
    // 如不存在则初始化一个
    $ctx.$el = $ctx.$el || $('<div></div>');

    // 如果传入$template参数,则进行模板初始化
    $ctx.$template && $ctx.$el.html($($ctx.$template));
  },
	/**
   * 删除
   * @param $el 元素
   * @param $ctx 上下文
   */
  remove($el, $ctx) {
    $el.remove();
  },
	/**
   * 获取元素唯一ID
   * @param $el 元素
   * @param generate 如不存在ID,是否生成
   * @returns {*}
   */
  getId($el, generate = false) {
    let id = $el.attr('hi-id');
    if (generate && id == null) {
      $el.attr('hi-id', id = unique());
    }
    return id;
  },
	/**
   * 销毁
   * @param $ctx
   */
  destroy($ctx) {
    $ctx.$el.remove();
    $ctx.$el = null;
    $ctx.$template = null;
  }
};

export default element;
