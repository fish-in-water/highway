[TOC]

# Highway

## 0. 前言

Highway是一个验证型MVVM框架，用于验证MVVM架构的内部实现原理。Highway的核心源码非常精简，并且做了详尽的注释解读，前期您可以通过阅读源码了解其中的实现原理。但请不要随意用于您的生产环境，因为它并没有被完整的测试过，除非您对Highway已非常了解。后续虾哥会推出相关教程，解读MVVM框架的实现细节，尽情期待。:-)

## 1. 快速开始

1. 获取Highway

   git clone https://github.com/fish-in-water/highway.git

2. 获取Highway/dest/highway.js文件

3. 获取jQuery或Zepto

4. 新建html文件，复制以下内容，注意文件引用，并使用Chrome打开

   ```
   <!-- examples/basic/quick-start.html -->

   <!doctype html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
     <title>quick-start</title>
   </head>
   <body>
   <div id="app">
     <div>
       hello, <input type="text" hi-value="name">
     </div>
     <div>
       hello, {{name}}
     </div>
     <div>
       hello, <span hi-bind="name"></span>
     </div>
   </div>

   <script type="text/javascript" src="../../lib/zepto/zepto.min.js"></script>
   <script type="text/javascript" src="../../dest/highway.min.js"></script>
   <script type="text/javascript" src="../../lib/babel-standalone/babel.min.js"></script>
   <script type="text/babel">
     const app = new Highway({
       $el: $('#app'),
       $scope: {
         name: 'world'
       },
       $mount() {
         this.$timeout(() => {
           this.$scope.$set('name', 'friend');
         }, 3000);
       }
     });

   </script>
   </body>
   </html>
   ```




## 2. 视图

通过new Highway可创建视图实例

```
const app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'hello world'
    }
  });
```



### 2.1 属性/方法

* $el: 元素。
* $template：模板字符串。
* $scope：初始化数据。
* $willmount：生命周期函数，编译前调用。不常用
* $mount：生命周期函数，编译完成条用。常用
* $didmount：生命周期函数，编译完成调用，在$mount之后。不常用
* $destory：销毁函数，调用销毁当前实例。
* $willunmount：生命周期函数，销毁前调用。不常用
* $unmount：生命周期函数，销毁完成后调用。常用
* $didunmount：生命周期函数，销毁完成后调用。在$unmount之后。不常用

```
<!-- examples/views/prop-function.html -->

<div id="app">
</div>

<script id="template" type="text/template">
  <div>i will destory after {{timeout}} seconds</div>
</script>

const app = new Highway({
  $el: $('#app'),
  $template: $('#template').html(),
  $scope: {
    timeout: 3
  },
  $willmount() {
    console.log('>>>::$willmount');
  },
  $mount() {
    console.log('>>>::$mount');

    this.$interval(() => {
     const timeout = this.$scope.$get('timeout') - 1;
     if (timeout >= 0) {
        this.$scope.$set('timeout', timeout);
     } else {
        this.$destroy();
     }
    }, 1000);
  },
  $didmount() {
    console.log('>>>::$didmount');
  },
  $willunmount() {
    console.log('>>>::$willunmount');
  },
  $unmount() {
    console.log('>>>::$unmount');
  },
  $didunmount() {
    console.log('>>>::$didunmount');
  },
});

```



### 2.2 绑定

#### 2-2-1. 双向绑定

##### 2-2-1-1. 安全

采用{{ property }}或者不指定{{ }}

```
// html
<div hi-bind="user.name"><div> // 'hi&lt;script&gt;'

// js
new Highway({
  $scope: {
    user: {
      name: 'hi<script>'
    }
  }
});
```



##### 2-2-1-2. 非安全

采用{{{ property }}}

```
<div hi-bind="{{{user.name}}}"><div> // 'hi<script>'
```



#### 2-2-2. 单向绑定

模板引擎，编译时根据$scope初始值确定视图，编译完成后无法通过$scope更新，以便节约内存，提高性能



##### 2-2-2-1. 安全

采用[[ property ]]

```
<div hi-bind="[[user.name]]"><div> // 'hi&lt;script&gt;'
```



##### 2-2-2-1. 非安全

采用[[[ property ]]]

```
<div hi-bind="[[[user.name]]]"><div> // 'hi<script>'
```



### 2.4 作用域

使用$scope作为MVVM框架中的Model

```
var app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'world'
    }
  });
```



#### 2-4-1. $get

使用$scope.$get(prop)方法获取属性值，缩写为$get

```
var app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'world'
    },
    clickMe: function () {
      var name = this.$get('name'); //equal to this.$scope.$get
    }
  });
```

> 如是嵌套属性，可通过属性分割符"."获取，例如this.$scope.$get('user.name')，$set类同
>
> 如是数组属性，可通过[int]数组下标获取，例如this.$scope.$get('students[2].name')，$set类同



#### 2-4-2. $set

使用$scope.$set(prop, value)方法获取属性值，缩写为$get

```
var app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'world'
    },
    clickMe: function () {
      this.$set('name', 'xiage'); // equal to this.$scope.$set
    }
  });
```



#### 2-4-3. $watch

使用$scope.$watch(prop, handler)监控属性变化，缩写为$watch

```
var app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'world'
    },
    $mount: {
      // watch name value chanage
      // equal to this.$scope.$watch
      var unwatcher = this.$watch('name', function (newVal, oldVal) { 
        console.log(newVal + ',' + oldVal);
      });	
      
      // clear wathcer after 3s
      this.$timeout(function () {
        unwatcher();
      }, 3000);
    }
  }); 
```



#### 2-4-4. $unwatch

使用$scope.$unwatch(prop, [handler])监控属性变化，可缩写为$unwatch

```
var app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'world'
    },
    $mount: {
      var handler = function (newVal, oldVal) {
        console.log(newVal + ',' + oldVal);
      };
    
      // watch name value chanage
      // equal to this.$ctx.$watch
      this.$watch('name', handler);	

      this.$timeout((function () {
        // equal to this.$ctx.$unwatch
        this.$unwatch('name', handler);	
        
        // scope will remove all watchers on name if handler is empty
        //this.$unwatch('name');	
      }).bind(this), 3000);
    }
  });
```



#### 2-4-5. 常量

单引号或双引号标记的值为常量，并不会从$scope值取值

```
// 单引号
<div hi-bind="'user.name'"><div> // 'user.name'

// 双引号
<div hi-bind='"user.name"'><div> // 'user.name'
```



### 2-5. 作用域链

视图与子视图作用域(不同于上下文)相互隔离

```
<view-parent>

  <p>{{name}}</p>

  <view-child>
    <p>hi, i am {{name}}, my parent is {{$parent.name}}</p>
  <view-child>

</view-parent>

```

name属性值只会从当前上下文作用域获取值，如遇空值并不会自动向父组件寻找，如需向上寻找添加$parent前缀。

参考如下name取值

| view- child | view-parent | <p>hi, i am {{name}}, my parent is {{$parent.name}}</p> |
| ----------- | ----------- | ---------------------------------------- |
| ' child'    | 'parent'    | <p>hi, i am child, my parent is parent</p> |
| undefined   | 'parent'    | <p>hi, i am , my parent is parent</p>    |
| 'child'     | undefined   | <p>hi, i am child, my parent is</p>      |
| undefined   | undefined   | <p>hi, i am , my parent is </p>          |



## 3. 指令

### 3-1. 内建

#### 3-1-1. hi-bind

元素innerHTML绑定

```
<div hi-bind="name"></div>
```



#### 3-1-2. hi-value

表单组件的值绑定

1. text

   ````
   <input type="text" hi-value="name">
   ````

2. password

   ```
   <input type="password" hi-value="password">
   ```

3. number

   ```
   <input type="number" hi-value="amount">
   ```

4. tel

   ```
   <input type="tel" hi-value="amount">
   ```

5. textarea

   ```
   <textarea hi-value="desc"></textarea>
   ```

6. select

   ```
   <select hi-value="city">
     <option value="shanghai">shanghai</option>
     <option value="guangzhou">guangzhou</option>
     <option value="shenzhen">shenzhen</option>
   </select>
   ```

7. radio

   ```
   <input name="sex" type="radio" value="male" hi-value="sex"> male
   <input name="sex" type="radio" value="female" hi-value="sex"> female
   ```

8. checkbox

   ```
   <input name="hobbies" type="checkbox" value="sports" hi-value="hobbies"> sports
   <input name="hobbies" type="checkbox" value="games" hi-value="hobbies"> games
   <input name="hobbies" type="checkbox" value="reading" hi-value="hobbies"> reading

   ```

   > checkbox的绑定值是一个数组，如上，选中sports, games, 得到hobbies值为['sports', 'games']



#### 3-1-3. hi-on

事件绑定, 格式hi-on:event="handler"

触发时handler获得

* $el: 触发元素
* $ev: window.event事件

```
<div hi-on:click="clickMe"></div>

var app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'world'
    },
    clickMe: function ($el, $ev) {
      alert('hello world');
    }
  });
```



#### 3-1-4. hi-show

显示绑定，显示元素当属性值为true

```
<div hi-show="showMe"></div>
```



#### 3-1-5. hi-hide

隐藏绑定，显示元素当属性值为true

```
<div hi-show="hideMe"></div>
```



#### 3-1-6. hi-if

局部插入绑定,，插入元素当属性值为true，如为false将被移除

```
<div hi-if="ifMe"></div>
```

>hi-if会触发局部编译/销毁过程，同时移除元素
>
>hi-show/hi-hide仅会隐藏元素，并不会移除



#### 3-1-7. hi-repeat

重复绑定

```
<ul>
  <li hi-repeat="book in books">
    id: {{book.id}}, name: {{book.name}}
  </li>
</ul>
```

> repeat指令会触发局部编译，同时临时伸展作用域



#### 3-1-8. hi-src

元素src绑定

```
<iframe hi-src="url"></iframe>
<img hi-src="url"></img>
```



#### 3-1-9. hi-href

元素href绑定

```
<a hi-href="href"></a>
```



#### 3-1-10. hi-data

元素data属性绑定, hi-data:dataProp="prop"

```
<a hi-data:name="name"></a> // => <a data-name="name in scope"></a>
```



#### 3-1-11. hi-enable

元素enable绑定

```
<button hi-enable="enableMe">button</button>
```



#### 3-1-12. hi-disable

元素disable绑定

```
<button hi-disable="disableMe">button</button>
```



#### 3-1-13. hi-readonly

```
<input type="text" hi-readonly="readonlyMe" >
```



#### 3-1-14. hi-attr

元素属性值绑定。hi-attr:domAttr="prop"，任意绑定指定DOM属性值。

````
// 绑定src
<img hi-attr:src="url"></img>

// 绑定alt
<img hi-attr:alt="alt"></img>
````



#### 3-1-15. hi-css

元素css值绑定。hi-css:css="prop"。

```
<div hi-css:background-color="{{bgColor}}"></div>
```



#### 3-1-16. hi-class

元素样式值绑定。hi-class="obj[prop]"，遇多个中间以；分割

```
  <div hi-class="{'red': 'bg-red', 'green': 'bg-green'}[bgColor];{'fs20': 'fs-20', 'fs30': 'fs-30'}[fontSize]"></div>

```



### 3-2. 自定义

自定义指令为一个工厂函数

参数

* $el: 指定所在的DOM元素，为一个jQuery对象
* $arg: 参数，例如hi-attr:title="myTitle", $arg = 'title'
* $exp: 表达式，例如hi-attr:title="myTitle", $exp = 'myTitle'
* $scope: 当前作用域，例如hi-attr:title="myTitle", 可以直接通过$scope.$get('myTitle')获取当前作用域中myTitle值。
* $ctx: 上下文, 当前视图(子视图)实例this值

```
// 通过bg-color指令设置元素背景颜色 <div bg-color="#ff0000"></div>
const bgColor = function ({$el, $exp}) {
	$el.css('background-color', $exp)
};
```

#### 3-2-1. 全局

全局有效，通过Highway.directive指定

```
Highway.directive('bg-color', bgColor);
```

#### 3-2-2. 局部

指定视图中有效，通过$directives指定

```
var app = new Highway({
  $el: $('#app'),
  $directives: {
    'bg-color': bgColor
  }
});
```



## 4. 宏指令

文本元素中属性值替换

```
<span>hi, i am {{name}}, {{old}} ages old</span>

// 无效。宏指令不能有相邻兄弟节点。
<span>hi, i am {{name}}, {{old}} ages old <strong>。</strong></span>
```

> 宏指令不能有相邻兄弟节点，否则无法生效

### 4-1. 内建

#### 4-1-1. 绑定

绑定部分参考第二章节2. 绑定，同。

| 双向绑定-安全  | {{ prop }}   | <span>hi, i am {{name}}</span>   |
| -------- | ------------ | -------------------------------- |
| 双向绑定-非安全 | {{{ prop }}} | <span>hi, i am {{{name}}}</span> |
| 单向绑定-安全  | [[ prop ]]   | <span>hi, i am [[name]]</span>   |
| 单向绑定-非安全 | [[[ prop ]]] | <span>hi, i am [[[name]]]</span> |



### 4-2. 自定义

自定义宏指令为一个工厂函数

#### 4-2-1. 入参

* $el: 当前元素。<span>hi, {{user.name}}</span>中$el值为$(span)。 
* $exp: 表达式。hi, {{ user.name }}中$exp值为'{{user.name}}'
* $update: 更新函数。<span>hi, i am {{name}}, {{old}} ages old</span>中有两个宏指令实例，任意一个值发生变化都需要触发更新。
* $scope: 当前作用域。
* $ctx: 当前上下文。

```
// 定义一个宏指令工厂函数，将数值前添加$符，格式为$100$
const money = function ({$exp, $update, $scope, $ctx}) {
  const money = $exp.replace
};

```

#### 4-2-2. 出参

* $mount: 生命周期函数，挂载时调用
* $unmount: 生命周期函数，销毁时调用
* $iterator: 迭代器工厂函数，返回替换的内容。返回值可为函数或者常量。值为函数时接收一个$text参数，为当前的文本内容；常量时需要返回$value值。

#### 4-2-3. 全局

使用Highway.marco定义，需指定正则表达式和宏指令工厂函数

#### 4-2-4. 局部

指定视图中有效，通过$marcos指定，需指定正则表达式和宏指令工厂函数

#### 4-2-5. 实例

自定义宏指令，将数值转化为百分比格式，指令格式为${prop}$或$[prop]$, 其中指定${prop}$为双向绑定，$[prop]$单向绑定。

```
examples/macros/customized.html

<div id="app">
  <p>two way bind is: ${ratio}$</p>
  <p>one way bind is: $[ratio]$</p>
  <button hi-on:click="change">Change</button>
</div>

// 自定义指令
const percentage = function ({$exp, $update, $scope, $ctx}) {
    const prop = $exp.replace(/[\\${}\[\] ]/g, '');
    const handler = function () {
      return ($scope.$get(prop) - 0) * 100 + '%';
    };

    // 双向绑定
    if (/\$\{[^\\}]+\}\$/.test($exp)) {
      return {
        $mount() {
          $scope.$watch(prop, $update);
        },
        $unmount() {
          $scope.$unwatch(prop, $update);
          pipeline.destroy();
        },
        $iterator($text) {
          return $text.replace($exp, function () {
            return handler();
          });
        }
      }
    } else {
      return {
        $iterator: {
          $value: handler()
        }
      }
    }
  };

  // 全局
  //Highway.macro('\\$\\{[^$]+\\}\\$|\\$\\[[^$]+\\]\\$', percentage)

  const app = new Highway({
    $el: $('#app'),
    $scope: {
      ratio: 0.95
    },
    // 局部
    $macros: {
      '\\$\\{[^$]+\\}\\$|\\$\\[[^$]+\\]\\$': percentage
    },
    change() {
      this.$scope.$set('ratio', '0.90')
    }
  });
```



## 5. 管道

### 5-1. 内建

#### 5-1-1. lowercase

```
<!-- examples/pipes/lowercase.html -->
<p hi-bind="name | lowercase"></p>
<p>{{name | lowercase}}</p>
```

#### 5-1-2. uppercase

```
<!-- examples/pipes/uppercase.html -->
<p hi-bind="name | uppercase"></p>
<p>{{name | uppercase}}</p>
```

#### 5-1-3. number

```
<!-- examples/pipes/number.html -->
<span hi-bind="income | number: '2'"></span> // => 3500.00
<span hi-bind="income | number: fixed"></span> // => 3500.000 when fixed value is 3
```

#### 5-1-4. json

```
<!-- examples/pipes/json.html -->
<p hi-bind="user | json"></p> // => {"name": "highway", "license": "MIT"}
<p>{{user | json}}</p> // => {"name": "highway", "license": "MIT"}
```

#### 5-1-5. date

```
<!-- examples/pipes/date.html -->
<div hi-bind="user.birthday | date: 'yyyy-MM-dd hh:mm:ss'"></div>
<div hi-bind="user.birthday | date: format"></div>
```

#### 5-1-6. limit

```
<!-- examples/pipes/limit.html -->
<ul>
  <li hi-repeat="user in users | limit: 2">id: {{user.id}}, name: {{user.name}}</li>
</ul>
<ul>
  <li hi-repeat="user in users | limit: limit">id: {{user.id}}, name: {{user.name}}</li>
</ul>
```

#### 5-1-7. filter

```
<ul>
  <li hi-repeat="user in users | filter: 'id' = '001' or 'name' *= 'j'">id: {{user.id}}, name: {{user.name}}</li>
</ul>

<ul>
  <li hi-repeat="user in users | filter: 'name' ^= 'a' | filter: 'name' *= 'n' ">id: {{user.id}}, name: {{user.name}}</li>
</ul>

<ul>
  <li hi-repeat="user in users | filter: 'name' *= contains">id: {{user.id}}, name: {{user.name}}</li>
</ul>
```



##### 5-1-7-1. 匹配符

| =    | 相等    |
| ---- | ----- |
| ==   | 严格相等  |
| !=   | 不相等   |
| !==  | 严格不相等 |
| ^=   | 开始于   |
| $=   | 结束于   |
| *=   |       |

##### 5-1-7-1. 连接符

| or   | 或者               |
| ---- | ---------------- |
| and  | 不支持，通过多次filter实现 |

> user in users | filter: 'name' ^= 'a' | filter: 'name' *= 'n'为用户姓名以'a'开始并且（and）包含'n'的用户

#### 5-1-8. sort

```
<ul>
  <li hi-repeat="user in users | sort: 'name' 'asc'">id: {{user.id}}, name: {{user.name}</li>
</ul>
<ul>
  <li hi-repeat="user in users | sort: sortBy ascBy">id: {{user.id}}, name: {{user.name}</li>
</ul>
```

### 5-2. 自定义

自定义管道是一个工厂函数

#### 5-2-1. 入参

* $source：源属性，{{income | number: fixed}}中$source = {prop: 'income', watch: true, secure: true}
  * prop：源字段
  * watch：双向绑定，{{prop}}/{{{prop}}}为true，[[prop]]/[[[prop]]]为false
  * secure: 安全，{{prop}}/[[prop]]为true, {{{prop}}}/[[[prop]]]为false
* $exp：表达式, {{income | number: fixed}}中$exp = 'fixed'
* $pipeline: 管道线，记录当前指令的所有管道实例，执行$pipeline(oriValue)获取管道执行结果值
* $update：更新函数，执行$update更新执行展示
* $scope: 当前作用域
* $ctx: 上下文

#### 5-2-2. 出参

* $mount：生命周期函数，挂载时执行
* $iterator：迭代函数，接收上一个管道的结果值$value，返回处理后的值
* $unmount：生命周期函数，销毁时执行



#### 5-2-3. 全局

使用Highway.pipe定义，需指定宏指令名和宏指令工厂函数



#### 5-2-4. 局部

指定视图中有效，通过$pipes指定，需指定宏指令名和宏指令工厂函数



#### 5-2-5. 实例

自定义管道，将数值转化为百分比格式，调用格式为{{prop | percentage}}， percentage为管道名

```
const lowercase = function () {
  return {
    $iterator($value) {
      if ($value == null) {
        return $value;
      }

      return ($value + '').toLowerCase();
    }
  }
};

export default lowercase;
```



## 6. 组件

### 6-1. 自定义

TODO



### 6-2. 通信

TODO



## 7. 服务

### 7-1. 内建

#### 7-1-1. $scope

参考2-4. 作用域章节

#### 7-1-2. $timeout

```
<!-- examples/services/timeout.html -->

<div>something happend after {{timeout}}s</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    timeout: 3
  },
  $mount() {
    this.$timeout(() => {
      alert('highway');
    }, 3000);
  }
});
```



#### 7-1-2. $interval

```
<!-- examples/services/timeout.html -->

<div>something happend after {{timeout}}s</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    timeout: 3
  },
  $mount() {
    this.$timeout(() => {
      alert('highway');
    }, 3000);
  }
});
```



#### 7-1-3. $http

复用jQuery/Zepto中的ajax方法

* $http：$.ajax
* $get：$.get
* $post：$.post
* $json：$.getJSON
* $jsonp：$.ajaxJSONP
* $settings：$.ajaxSettings
* $settings: jQuery.ajaxSetup /  $.ajaxSettings


```
<!-- examples/services/http.html -->

<ul>
  <li hi-repeat="user in users">id: {{user.id}}, name: {{user.name}}</li>
</ul>

const app = new Highway({
  $el: $('#app'),
  $scope: {},
  $mount() {
    this.$http({
      type: 'get',
      url: './users.json',
      success: (data, status, xhr) => {
        this.$set('users', data.users)
      },
      error: (xhr, errorType, error) => {
        alert('error');
      }
    })
  }
});
```



#### 7.1.4. 事件

参阅6-xxx. 组件件通信



### 7-2. 自定义

自定义服务是一个工厂函数

#### 7-2-1. 入参

* $ctx: 当前上下文



#### 7-2-2. 出参

可选。如返回，可通过this.$servcies[name]引用

* $mount: 生命周期函数，挂载时调用

* $unmount: 生命周期函数，销毁时调用

  ​

#### 7-2-3. 全局

使用Highway.service定义，需指定宏服务名和服务工厂函数



#### 7-2-4. 局部

指定视图中有效，通过$services指定，需指定宏指令名和宏指令工厂函数



#### 7-2-5. 示例

定义一个cookie读写服务

```
<!-- examples/services/customized.html -->

<div id="app">
  <button hi-on:click="clickMe">destroy me</button>
</div>

const cookie = function ({$ctx}) {
  return $ctx.$cookie = {
    $mount() {
      console.log('>>> cookie services mounted')
    },
    $get(key) {
      const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
      const matches = document.cookie.match(reg);
      if(matches) {
        return matches[2]
      }

    },
    $set(key, value) {
      document.cookie = `${key}=${value}`;
    },
    $unmount() {
      console.log('>>> cookie services unmounted')
    },
    destroy() {
      this.$destory();
    }
  }
};

// 全局管道
//Highway.service('$cookie', cookie);

const app = new Highway({

  $el: $('#app'),
  $scope: {
    ratio: 0.95
  },
  // 局部管道
  $services: {
    $cookie: cookie
  },
  $mount() {
    this.$cookie.$set('cookie_0', 'highway');
    this.$cookie.$set('cookie_1', 'hello world');

    // 可通过$service引用
    console.log('cookie_1 value is:' + this.$services['$cookie'].$get('cookie_1'));
  },
  clickMe() {
    this.$destroy();
  }
});
```







 












