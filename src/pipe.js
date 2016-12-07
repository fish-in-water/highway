import {assign, unique, MapList} from './utils';

// 全局管道指令
const pipes = {};

/**
 * 管道
 * 利用管道符“|”将两个命令隔开，管道符左边命令的输出就会作为管道符右边命令的输入。
 * 连续使用管道意味着第一个命令的输出会作为第二个命令的输入，第二个命令的输出又会作为第三个命令的输入，依此类推。
 * 例如: {{'name | uppercase'}}
 * @param name 管道名称
 * @param factory 工厂函数
 */
const pipe = function (name, factory) {
  pipes[name] = factory;
};

assign(pipe, {

	/**
   * 初始化,在编译器初始化时调用
   * @param $ctx 上下文
   */
  initial($ctx) {

    // 加载全局管道、局部管道至当前上下文
    $ctx.$pipes = assign({}, pipes, $ctx.$pipes);

    // 记录管道实例,便于销毁释放
    $ctx.$pipes._instances = new MapList;
  },
	/**
   * 管道编译
   * @param $source 原始字段
   * @param $pipes 管道组
   * @param $scope 作用域
   * @param $update 更新函数
   * @param $ctx 上下文
   * 例如{{name | uppercase | lowercase}}中
   * $source = name
   * $pipes = ['uppercase', 'lowercase']
   * $update函数句柄,调用该函数触发更新,用于管道中的双向绑定
	 */
  compile($source, $pipes, $scope, $update, $ctx) {

    const id = unique('p');

		/**
     * 管道线
     * 在一个指令中可能有多个管道,例如{{name | uppercase | lowercase}}
     * @param value
     * @returns {*}
     */
    const pipeline = function (value) {

			// 触发所有宏指令替换,获得结果字符串
      return $ctx.$pipes._instances.find(id).reduce(function (value, instance) {
        return instance.$iterator(value)
      }, value);
    };

		/**
     * 对指令中的管道进行编译
     */
    for (const pipe of $pipes) {
      let name, exp;
      const index = pipe.indexOf(':');
      if (index != -1) {
        name = pipe.substring(0, index).trim();
        exp = pipe.substring(index + 1).trim();
      } else {
        name = pipe;
        exp = null;
      }

			/**
       * 获取管道实例
       * 以income | number: fixedField 为例
       * 如income = 1000, fixedField = 2, 结果1000.00
       */
      const instance = $ctx.$pipes[name]({
        $source, //原始字段。 示例值: income
        $ctx, // 上下文
        $scope, // 作用域
        //$pipe: name, // 管道名称。示例值: number
        $exp: exp, // 表达式。示例值: fixedField字段
        $update, // 更新函数。如需要,管道同样可以进行双向绑定,当管道发生变化时,触发update函数
        $pipeline: pipeline //管道线
      });

      if (instance) {
        // $mount hook
        instance.$mount && instance.$mount($ctx);

        // 增加管道实例
        $ctx.$pipes._instances.add(id, instance);
      }
    }

    // 返回管道线,使调用方可以保持管道线实例
    return assign(pipeline, {
			/**
       * 赋予管道线实例销毁能力
       * 当管道线不需要时候,可主动销毁
       */
      destroy: function () {
        const instances = $ctx.$pipes._instances.find(id);
        for (const instance of instances) {
          instance.$unmount && instance.$unmount($ctx);
        }
        $ctx.$pipes._instances.remove(id);
      }
    })
  },

	/**
   * 销毁
   * @param $ctx
   */
  destroy($ctx) {
    $ctx.$pipes._instances.clear();
    $ctx.$pipes._instances = null;
    $ctx.$pipes = null;
  }
});

export default pipe;

// 内建管道
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
