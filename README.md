[TOC]


# 0. 前言



Highway是一个验证型MVVM框架，用于验证MVVM架构的内部原理。Highway的核心源码非常精简，并且做了详尽的注释解读，前期您可以通过阅读源码了解其中的实现原理。但请不要随意用于您的生产环境，因为它并没有被系统地验证过，除非您对Highway已非常了解。后续虾哥会推出相关教程，解读MVVM框架的实现细节，尽情期待。:-)


# 1. 快速开始


1. 获取Highway

   git clone https://github.com/fish-in-water/highway.git

2. 获取Highway/dest/highway.js文件

3. 获取jQuery或Zepto

4. 新建html文件，复制以下内容，注意文件引用，并使用Chrome打开


   ```
   <!-- examples/quick-start.html -->

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
       }
     });
   </script>
   </body>
   </html>
   ```




# 2. 视图


通过new Highway可创建视图实例

```
const app = new Highway({
    $el: $('#app'),
    $scope: {
      name: 'hello world'
    }
  });
```



## 2.1 属性/方法


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



## 2.2 绑定


### 2-2-1. 双向绑定


#### 2-2-1-1. 安全


采用{{ property }}或者不指定{{ }}

```
<!-- examples/views/data-bind.html -->

// html
<p>{{msg}}</p> // '&lt;script&gt;alert(1)'

// js
const app = new Highway({
  $el: $('#app'),
  $scope: {
    msg: '<script>alert(1)'
  }
});
```



#### 2-2-1-2. 非安全


采用{{{ property }}}

```
<!-- examples/views/data-bind.html -->

<p>{{{msg}}}</p> // '<script>alert(1)'
```



### 2-2-2. 单向绑定


模板引擎，编译时根据$scope初始值确定视图，编译完成后无法通过$scope更新，以便节约内存，提高性能



#### 2-2-2-1. 安全


采用[[ property ]]

```
<!-- examples/views/data-bind.html -->

<p>[[msg]]</p> // '&lt;script&gt;alert(1)'
```



#### 2-2-2-1. 非安全


采用[[[ property ]]]

```
<!-- examples/views/data-bind.html -->

<p>[[[msg]]]</p> // '<script>alert(1)'
```



## 2.4 作用域


使用$scope作为MVVM框架中的Model

```
<!-- examples/views/scope.html -->

<div id="app">
  <input type="text" hi-value="name"/>
  <p>{{name}}</p>
</div>  

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'highway'
  }
});
```



### 2-4-1. $get


使用$scope.$get(prop)方法获取属性值，缩写为$get

```
<!-- examples/views/get.html -->

<div id="app">
  <input type="text" hi-value="user.name"/>
  <button hi-on:click="showMe">showMe</button>
</div>  

const app = new Highway({
  $el: $('#app'),
  $scope: {
    user: {
      name: 'highway'
    }
  },
  showMe() {
    // equal to this.$scope.$get
    alert(this.$get('user.name'));
  }
});
```

> 如是嵌套属性，可通过属性分割符"."获取，例如this.$scope.$get('user.name')，$set类同
>
> 如是数组属性，可通过[int]数组下标获取，例如this.$scope.$get('students[2].name')，$set类同



### 2-4-2. $set

使用$scope.$set(prop, value)方法获取属性值，缩写为$get

```
<!-- examples/views/set.html -->

<div id="app">
  <input type="text" hi-value="user.name"/>
  <button hi-on:click="changeMe">changeMe</button>
</div>  

const app = new Highway({
  $el: $('#app'),
  $scope: {
    user: {
      name: 'highway'
    }
  },
  changeMe() {
    // equal to this.$scope.$set
    this.$set('user.name', 'xiage');
  }
});
```



### 2-4-3. $watch

使用$scope.$watch(prop, handler)监控属性变化，缩写为$watch，返回unwather句柄，调用可解除监听

```
<!-- examples/views/watch.html -->

<div id="app">
  <input type="text" hi-value="name"/>
  <p>{{name}}</p>
  <p>{{logs}}</p>
</div>  

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'highway'
  },
  $mount() {
    const unwatcher = this.$watch('name', (newVal, oldVal) => {
      this.$set('logs', `value changed, newVal is: ${newVal}, oldVal is: ${oldVal}`);
    });

    // remove wather
    //unwatcher();
  }
});
```



### 2-4-4. $unwatch

使用$scope.$unwatch(prop, [handler])监控属性变化，可缩写为$unwatch，如handler不指定，则移除prop上所有的监听器

```
<!-- examples/views/unwatch.html -->

<div id="app">
  <input type="text" hi-value="name"/>
  <p>{{name}}</p>
  <p>{{logs}}</p>
  <button hi-on:click="unwatch">unwatch</button>
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'highway'
  },
  $mount() {
    this.$watch('name', (newVal, oldVal) => {
      this.$set('logs', `value changed, newVal is: ${newVal}, oldVal is: ${oldVal}`);
    });
  },
  unwatch() {
    this.$unwatch('name');
  }
});
```



### 2-4-5. 常量

单引号或双引号标记的值为常量，并不会从$scope值取值

```
<!-- examples/views/const.html -->

<div id="app">
  <input type="text" hi-value="user.name"/>
  <p>{{user.name}}</p>
  <p>{{'user.name'}}</p>
  <p>{{"user.name"}}</p>
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    user: {
      name: 'highway'
    }
  }
});
```



## 2-5. 类定义

可通过Highway.extend抽取为自定义类

```
<!-- examples/views/klass.html -->

<div id="app-0"></div>
<div id="app-1"></div>

<script id="t-app" type="text/template">
  <p>i am {{name}}</p>
</script>

const App = Highway.extend({
  $template: $('#t-app').html(),
  $scope: {
    name: 'highway'
  }
});

const app0 = new App({
  $el: $('#app-0')
});

const app1 = new App({
  $el: $('#app-1')
});
```



# 3. 指令

## 3-1. 内建

### 3-1-1. hi-bind

元素innerHTML绑定

```
<!-- examples/directives/bind.html -->

<div id="app">
  <input type="text" hi-value="user.name"/>
  <div hi-bind="user.name">{{user.name}}</div>
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    user: {
      name: 'highway'
    }
  }
});
```



### 3-1-2. hi-value

表单组件的值绑定

1. text

   ````
   <!-- examples/directives/value.html -->

   <input type="text" hi-value="user.name">
   ````

2. password

   ```
   <!-- examples/directives/value.html -->

   <input type="password" hi-value="user.password">
   ```

3. number

   ```
   <!-- examples/directives/value.html -->

   <input type="number" hi-value="user.income">
   ```

4. tel

   ```
   <!-- examples/directives/value.html -->

   <input type="tel" hi-value="user.amount">
   ```

5. textarea

   ```
   <!-- examples/directives/value.html -->

   <textarea hi-value="user.description"></textarea>
   ```

6. select

   ```
   <!-- examples/directives/value.html -->

   <select hi-value="user.city">
     <option value="shanghai">shanghai</option>
     <option value="guangzhou">guangzhou</option>
     <option value="shenzhen">shenzhen</option>
   </select>
   ```

7. radio

   ```
   <!-- examples/directives/value.html -->

   <input name="sex" type="radio" value="male" hi-value="user.sex"> male
   <input name="sex" type="radio" value="female" hi-value="user.sex"> female
   ```

8. checkbox

   ```
   <!-- examples/directives/value.html -->

   <input name="hobbies" type="checkbox" value="sports" hi-value="user.hobbies"> sports
   <input name="hobbies" type="checkbox" value="games" hi-value="user.hobbies"> games
   <input name="hobbies" type="checkbox" value="reading" hi-value="user.hobbies"> reading
   ```

   > checkbox的绑定值是一个数组，如上，选中sports, games, 得到hobbies值为['sports', 'games']



### 3-1-3. hi-on

事件绑定, 格式hi-on:event="handler"，支持所有的DOM事件

触发时handler获得

* $el: 触发元素
* $ev: window.event事件

```
<!-- examples/directives/on.html -->

<div id="app">
  <button id="btn" hi-on:click="clickMe">clickMe</button>
</div>

const app = new Highway({
  $el: $('#app'),
  clickMe($el, $ev) {
    console.log(`element id is ${$el.attr('id')}, event type is ${$ev.type}`)
  }
});
```



### 3-1-4. hi-show

显示绑定，显示元素当属性值为true

```
<!-- examples/directives/show.html -->

<div id="app">
  <div hi-show="see">you can see me</div>
  <input name="show" type="radio" value="1" hi-value="see" checked> show
  <input name="show" type="radio" value="0" hi-value="see"> hide
</div>
```

> false、'false’、''、'0'、null、undefined、0均被判断为boolean false



### 3-1-5. hi-hide

隐藏绑定，显示元素当属性值为true

```
<!-- examples/directives/hide.html -->

<div id="app">
  <div hi-hide="see">you can see me</div>
  <input name="show" type="radio" value="1" hi-value="see" checked> hide
  <input name="show" type="radio" value="0" hi-value="see" > show
</div>
```

> false、'false’、''、'0'、null、undefined、0均被判断为boolean false



### 3-1-6. hi-if

插入元素当属性值为true，如为false将被移除

```
<!-- examples/directives/if.html -->

<div id="app">
  <div hi-if="ifMe">
    <p>you can see me</p>
    <my-component></my-component>
  </div>
  <input name="if" type="radio" value="true" hi-value="ifMe" checked> render
  <input name="if" type="radio" value="false" hi-value="ifMe"> destroy
</div>

<script id="template" type="text/template">
  <div>i am {{name}}</div>
</script>

const myComponent = Highway.extend({
  $template: $('#template').html(),
  $scope: {
    name: 'myComponent'
  },
  $mount() {
    console.log('>>>::myComponent rendered');
  },
  $unmount() {
    console.log('>>>::myComponent destroyed');
  }
});

const app = new Highway({
  $el: $('#app'),
  $components: {
    'my-component': myComponent
  }
});
```

>false、'false’、''、'0'、null、undefined、0均被判断为boolean false
>
>hi-if会触发局部编译/销毁过程，同时移除元素
>
>hi-show/hi-hide仅会隐藏元素，并不会移除



### 3-1-7. hi-repeat

重复绑定

```
<!-- examples/directives/repeat.html -->

<div id="app">
  <ul>
    <li hi-repeat="user in data.users" hi-data:id="{{user.id}}">
      <p>{{user.name}}</p>
    </li>
  </ul>
  <button hi-on:click="change">change</button>
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    data: {
      users: [
        {
          'id': '001',
          'name': 'jackey'
        },
        {
          'id': '002',
          'name': 'suse'
        },
        {
          'id': '003',
          'name': 'ann'
        },
      ]
    }
  },
  change() {
    this.$set('data.users[2].name', 'highway');
  }
});
```

> repeat指令会触发局部编译，同时临时伸展作用域



### 3-1-8. hi-src

元素src绑定

```
<!-- examples/directives/src.html -->

<div id="app">
  <img hi-src="imageUrl" width="100%"/>
</div>
```



### 3-1-9. hi-href

元素href绑定

```
<!-- examples/directives/href.html -->

<div id="app">
  <a hi-href="link">click me</a>
</div>
```



### 3-1-10. hi-data

元素data属性绑定, hi-data:dataProp="prop"

```
<!-- examples/directives/data.html -->

<div id="app">
  <button hi-on:click="clickMe" hi-data:name="name">clickMe</button>
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: "highway"
  },
  clickMe($el) {
    alert($el.data('name'));
  }
});
```



### 3-1-11. hi-enable

元素enable绑定

```
<!-- examples/directives/enable.html -->

<div id="app">
  <button hi-enable="enable" hi-on:click="clickMe">button</button>
  <input name="enable" type="radio" value="1" hi-value="enable" > enable
  <input name="enable" type="radio" value="0" hi-value="enable"> disable
</div>

const app = new Highway({
  $el: $('#app'),
  clickMe() {
    alert(1)
  }
});
```



### 3-1-12. hi-disable

元素disable绑定

```
<!-- examples/directives/disable.html -->

<div id="app">
  <button hi-enable="disable" hi-on:click="clickMe">button</button>
  <input name="disable" type="radio" value="1" hi-value="disable" checked> disable
  <input name="disable" type="radio" value="0" hi-value="disable"> enable
</div>

const app = new Highway({
  $el: $('#app'),
  clickMe() {
    alert(1)
  }
});
```



### 3-1-13. hi-readonly

```
<!-- examples/directives/readonly.html -->

<div id="app">
  <p>{{name}}</p>
  <input type="text" hi-readonly="readonly" hi-value="name"/>
  <input name="readonly" type="radio" value="1" hi-value="readonly" checked> readonly
  <input name="readonly" type="radio" value="0" hi-value="readonly" > editable
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'highway'
  }
});
```



### 3-1-14. hi-attr

元素属性值绑定。hi-attr:domAttr="prop"，任意绑定指定DOM属性值。

````
<!-- examples/directives/attr.html -->

<div id="app">
  <img hi-attr:src="imageUrl" hi-attr:width="width" />
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    width: '50%',
    imageUrl: './dog.jpeg'
  }
});
````



### 3-1-15. hi-css

元素css值绑定。hi-css:css="prop"。

```
<!-- examples/directives/css.html -->

<div id="app">
  <div hi-css:background-color="{{bgColor}}">div</div>
</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    bgColor: 'red'
  }
});
```



### 3-1-16. hi-class

元素样式值绑定。hi-class:unique="obj[prop]"，遇多个中间以；分割

##### 3-1-16-1. 直接量

###### 3-1-16-1-1. 单个

```
<div hi-class="direct.bgColor">direct-0</div>
<div hi-class="direct.fontSize">direct-1</div>
```



##### 3-1-16-1-2. 组合

中间以","号分隔，如使用多个hi-class指令，需指定uniqueid，例如hi-class:bgColor="direct.bgColor", uniqueid="bgColor"

```
<div hi-class:bgColor="direct.bgColor", hi-class:fontSize="direct.fontSize">direct-2</div>
<div hi-class="direct.bgColor, direct.fontSize">direct-3</div>
```



#### 3-1-16-2. 映射

##### 3-1-16-2-1. 单个

```
<div hi-class="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];">mapping-0</div>
<div hi-class="{'fs20': 'fs-20', 'fs40': 'fs-40'}[mapping.fontSize]">mapping-1</div>
```



##### 3-1-16-2-2. 组合

中间以","号分隔，如使用多个hi-class指令，需指定uniqueid。

```
<div hi-class:bgColor="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];" hi-class:bgColor="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];">mapping-2</div>

<div hi-class="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];{'fs20': 'fs-20', 'fs40': 'fs-40'}[mapping.fontSize]">mapping-3</div>

```



#### 3-1-16-3. 示例

```
<!-- examples/directives/class.html -->

<style type="text/css">
  .bg-red {
    background-color: red;
  }

  .bg-green {
    background-color: green;
  }

  .fs-20 {
    font-size: 20px;
  }

  .fs-40 {
    font-size: 40px;
  }
</style>

<div id="app">
  <p>>>> direct - single</p>
  <div hi-class="direct.bgColor">direct-0</div>
  <div hi-class="direct.fontSize">direct-1</div>

  <p>>>> direct - combi</p>
  <div hi-class:bgColor="direct.bgColor", hi-class:fontSize="direct.fontSize">direct-2</div>
  <div hi-class="direct.bgColor, direct.fontSize">direct-3</div>
  <hr>

  <p>>>> mapping - single</p>
  <div hi-class="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];">mapping-0</div>
  <div hi-class="{'fs20': 'fs-20', 'fs40': 'fs-40'}[mapping.fontSize]">mapping-1</div>

  <p>>>> mapping - combi</p>
  <div hi-class:bgColor="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];" hi-class:bgColor="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];">mapping-2</div>
  <div hi-class="{'red': 'bg-red', 'green': 'bg-green'}[mapping.bgColor];{'fs20': 'fs-20', 'fs40': 'fs-40'}[mapping.fontSize]">mapping-3</div>

</div>

const app = new Highway({
  $el: $('#app'),
  $scope: {
    mapping: {
      bgColor: 'red',
      fontSize: 'fs40'
    },
    direct: {
      bgColor: 'bg-red',
      fontSize: 'fs-20'
    }
  }
});
```



## 3-2. 自定义

自定义指令为一个工厂函数

### 3-2-1. 入参

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



### 3-2-2. 出参

* $mount：生命周期函数，挂载时调用。
* $unmount：生命周期函数，卸载时调用



### 3-2-3. 全局

全局有效，通过Highway.directive指定

```
Highway.directive('bg-color', bgColor);
```



### 3-2-4. 局部

指定视图中有效，通过View.$directives指定



### 3-2-5. 示例

自定义指令，指令格式为hi-bgcolor="color"

```
<!-- examples/directives/customized.html -->

<div id="app">
  <div hi-bgcolor="#ff0000">highway</div>
</div>

const bgColor = function ({$el, $exp}) { //$ctx, $el, $arg, $exp
  $el.css('background-color', $exp);
};

//Highway.directive('hi-bgcolor', bgColor);

const app = new Highway({
  $el: $('#app'),
  $directives: {
    'hi-bgcolor': bgColor
  }
});

```



### 3-2-3. 指令模式

Highway中预置了指令模式，快速构建您的自定义指令，可通过Highway.directive.pattern指定

接收4个参数，依次为

* $exp：表达式
* $scope：作用域
* $ctx：上下文
* $updater：更新函数

```
<!-- examples/directives/pattern.html -->

<div id="app">
  <div hi-bgcolor="bgColor">highway</div>
</div>

const bgColor = function ({$el, $exp, $scope, $ctx}) { //$ctx, $el, $arg, $exp
  return Highway.directive.pattern($exp, $scope, $ctx, function ({newVal, secure}) {
    newVal = secure ? Highway.utils.secureHtml(newVal) : newVal;
    $el.css('background-color', newVal);
  });
};

//Highway.directive('hi-bgcolor', bgColor);

const app = new Highway({
  $el: $('#app'),
  $scope: {
    bgColor: 'red'
  },
  $directives: {
    'hi-bgcolor': bgColor
  }
});
```



# 4. 宏指令

文本元素中属性值替换

```
<span>hi, i am {{name}}, {{old}} ages old</span>

// 无效。宏指令不能有相邻兄弟节点。
<span>hi, i am {{name}}, {{old}} ages old <strong>。</strong></span>
```

> 宏指令不能有相邻兄弟节点，否则无法生效

## 4-1. 内建

### 4-1-1. 绑定

绑定部分参考第二章节2. 绑定，同。

| 双向绑定-安全  | {{ prop }}   | <span>hi, i am {{name}}</span>   |
| -------- | ------------ | -------------------------------- |
| 双向绑定-非安全 | {{{ prop }}} | <span>hi, i am {{{name}}}</span> |
| 单向绑定-安全  | [[ prop ]]   | <span>hi, i am [[name]]</span>   |
| 单向绑定-非安全 | [[[ prop ]]] | <span>hi, i am [[[name]]]</span> |



## 4-2. 自定义

自定义宏指令为一个工厂函数

### 4-2-1. 入参

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

### 4-2-2. 出参

* $mount: 生命周期函数，挂载时调用
* $unmount: 生命周期函数，销毁时调用
* $iterator: 迭代器工厂函数，返回替换的内容。返回值可为函数或者常量。值为函数时接收一个$text参数，为当前的文本内容；常量时需要返回$value值。

### 4-2-3. 全局

使用Highway.marco定义，需指定正则表达式和宏指令工厂函数

### 4-2-4. 局部

指定视图中有效，通过$marcos指定，需指定正则表达式和宏指令工厂函数

### 4-2-5. 实例

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



# 5. 管道

## 5-1. 内建

### 5-1-1. lowercase

```
<!-- examples/pipes/lowercase.html -->
<p hi-bind="name | lowercase"></p>
<p>{{name | lowercase}}</p>
```

### 5-1-2. uppercase

```
<!-- examples/pipes/uppercase.html -->
<p hi-bind="name | uppercase"></p>
<p>{{name | uppercase}}</p>
```

### 5-1-3. number

```
<!-- examples/pipes/number.html -->
<span hi-bind="income | number: '2'"></span> // => 3500.00
<span hi-bind="income | number: fixed"></span> // => 3500.000 when fixed value is 3
```

### 5-1-4. json

```
<!-- examples/pipes/json.html -->
<p hi-bind="user | json"></p> // => {"name": "highway", "license": "MIT"}
<p>{{user | json}}</p> // => {"name": "highway", "license": "MIT"}
```

### 5-1-5. date

```
<!-- examples/pipes/date.html -->
<div hi-bind="user.birthday | date: 'yyyy-MM-dd hh:mm:ss'"></div>
<div hi-bind="user.birthday | date: format"></div>
```

### 5-1-6. limit

```
<!-- examples/pipes/limit.html -->
<ul>
  <li hi-repeat="user in users | limit: 2">id: {{user.id}}, name: {{user.name}}</li>
</ul>
<ul>
  <li hi-repeat="user in users | limit: limit">id: {{user.id}}, name: {{user.name}}</li>
</ul>
```

### 5-1-7. filter

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



#### 5-1-7-1. 匹配符

| =    | 相等    |
| ---- | ----- |
| ==   | 严格相等  |
| !=   | 不相等   |
| !==  | 严格不相等 |
| ^=   | 开始于   |
| $=   | 结束于   |
| *=   |       |

#### 5-1-7-1. 连接符

| or   | 或者               |
| ---- | ---------------- |
| and  | 不支持，通过多次filter实现 |

> user in users | filter: 'name' ^= 'a' | filter: 'name' *= 'n'为用户姓名以'a'开始并且（and）包含'n'的用户

### 5-1-8. sort

```
<ul>
  <li hi-repeat="user in users | sort: 'name' 'asc'">id: {{user.id}}, name: {{user.name}</li>
</ul>
<ul>
  <li hi-repeat="user in users | sort: sortBy ascBy">id: {{user.id}}, name: {{user.name}</li>
</ul>
```

## 5-2. 自定义

自定义管道是一个工厂函数

### 5-2-1. 入参

* $source：源属性，{{income | number: fixed}}中$source = {prop: 'income', watch: true, secure: true}
  * prop：源字段
  * watch：双向绑定，{{prop}}/{{{prop}}}为true，[[prop]]/[[[prop]]]为false
  * secure: 安全，{{prop}}/[[prop]]为true, {{{prop}}}/[[[prop]]]为false
* $exp：表达式, {{income | number: fixed}}中$exp = 'fixed'
* $pipeline: 管道线，记录当前指令的所有管道实例，执行$pipeline(oriValue)获取管道执行结果值
* $update：更新函数，执行$update更新执行展示
* $scope: 当前作用域
* $ctx: 上下文

### 5-2-2. 出参

* $mount：生命周期函数，挂载时执行
* $iterator：迭代函数，接收上一个管道的结果值$value，返回处理后的值
* $unmount：生命周期函数，销毁时执行



### 5-2-3. 全局

使用Highway.pipe定义，需指定宏指令名和宏指令工厂函数



### 5-2-4. 局部

指定视图中有效，通过$pipes指定，需指定宏指令名和宏指令工厂函数



### 5-2-5. 实例

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



# 6. 组件

## 6-1. 自定义

通过Highway.extend抽取为类，需指定标签名



### 6-1-1. 全局

通过Highway.component指定



### 6-1-2. 局部

通过View.$components指定



### 6-1-3. 示例

```
<!-- examples/components/customized.html -->

<div id="app">
  <p>i am {{name}}</p>
  <my-component hi-ref="component" class="component"></my-component>
</div>

<script id="t-my-component" type="text/template">
  <p>i am {{name}}</p>
</script>

const myComponent = Highway.extend({
  $template: $('#t-my-component').html(),
  $scope: {
    name: 'component'
  }
});

// 全局
//Highway.component('my-component', myComponent);

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'app'
  },
  // 局部
  $components: {
    'my-component': myComponent
  }
});
```



## 6-2. 引用

### 6-2-1. 子视图

父视图通过$refs['name']获取子视图上下文，子视图需指定hi-ref指令

```
<!-- examples/components/ref.html -->

<div id="app">
  <p>i am {{name}}</p>
  <my-component hi-ref="component" class="component"></my-component>
  <button hi-on:click="getComponentName">getComponentName</button>
  <button hi-on:click="triggerComponentHandler">triggerComponentHandler</button>
</div>

<script id="t-my-component" type="text/template">
  <p>i am {{name}}, my parent is {{$parent.name}}</p>
</script>

const myComponent = Highway.extend({
  $template: $('#t-my-component').html(),
  $scope: {
    name: 'component'
  },
  introduce() {
    alert('hi, i am component');
  }
});

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'app'
  },
  $components: {
    'my-component': myComponent
  },
  getComponentName() {
    const $component = this.$components.$refs['component'];

    alert($component.$get('name'));
  },
  triggerComponentHandler() {
    const $component = this.$components.$refs['component'];
    $component.introduce();
  }
});
```



### 6-2-2. 父视图

子视图通过$parent获得父视图上下文

```
<!-- examples/components/parent.html -->

<div id="app">
  <p>i am {{name}}</p>
  <my-component class="component"></my-component>
</div>

<script id="t-my-component" type="text/template">
  <p>i am {{name}}, my parent is {{$parent.name}}</p>
  <button hi-on:click="getParentName">getParentName</button>
  <button hi-on:click="triggerParentHandler">triggerParentHandler</button>
</script>

const myComponent = Highway.extend({
  $template: $('#t-my-component').html(),
  $scope: {
    name: 'component'
  },
  getParentName() {
    alert(this.$parent.$get('name'));
  },
  triggerParentHandler() {
    this.$parent.introduce();
  }
});

const app = new Highway({
  $el: $('#app'),
  $scope: {
    name: 'app'
  },
  $components: {
    'my-component': myComponent
  },
  introduce() {
    alert('hi, i am app');
  }
});
```



## 6-3. 通信

### 6-3-1. $on

监听事件，需指定事件名与处理函数，返回停止监听

```
<!-- examples/components/event.html -->

this.$on('app:event', this.eventHandler.bind(this));

// stop listening if stopper is called
//stopper()
```



### 6-3-2. $off

关闭监听，需指定事件名与处理函数，如处理函数不指定，关闭在该事件上的所有处理器

```
<!-- examples/components/event.html -->

this.$off('app:event');
```



### 6-3-2. $broadcast


广播事件，向子视图发送通知消息

```
<!-- examples/components/event.html -->

this.$broadcast('app:event', 'this is event from app');
```



### 6-3-3. $emit

冒泡事件，向父视图发送通知消息

```
<!-- examples/components/event.html -->

this.$emit('component:event', 'this is event from component');
```



### 6-3-4. $fire

触发自身事件，并不会触发$broadcast、$emit

```
<!-- examples/components/event.html -->

this.$fire('component:self', 'this is event from self');
```



### 6-3-5. $listenTo

监听指定对象事件，指定对象通过$fire触发事件

```
<!-- examples/components/listen.html -->

const $component = this.$components.$refs['component'];
const stopper = this.$listenTo($component, 'component:event', this.eventHandler.bind(this));

// stop listening if stopper is called
//stopper()      
```



### 6-3-6. $listenToOnce

监听一次指定对象事件，指定对象通过$fire触发事件

```
<!-- examples/components/listen.html -->

const stopper = this.$listenToOnce($component, 'component:event', this.eventHandler.bind(this));

// stop listening if stopper is called
//stopper()
```



### 6-3-7. $stopListening

取消监听指定对象事件

```
<!-- examples/components/listen.html -->

const $component = this.$components.$refs['component'];
this.$stopListening($component, 'component:event');
```



## 6-4. 作用域链

视图与子视图作用域(不同于上下文)相互隔离，可通过$parent中获取作用域

```
<!-- examples/components/scope.html -->

<div id="app">
  <p>i am {{name}}</p>
  <my-component class="component"></my-component>
</div>

<script id="t-my-component" type="text/template">
  <p>i am {{name}}, my parent is {{$parent.name}}</p>
</script>
```

name属性值只会从当前上下文作用域获取值，如遇空值并不会自动向父组件寻找，如需向上寻找添加$parent前缀。

参考如下name取值

| view- child | view-parent | <p>hi, i am {{name}}, my parent is {{$parent.name}}</p> |
| ----------- | ----------- | ---------------------------------------- |
| ' child'    | 'parent'    | <p>hi, i am child, my parent is parent</p> |
| undefined   | 'parent'    | <p>hi, i am , my parent is parent</p>    |
| 'child'     | undefined   | <p>hi, i am child, my parent is</p>      |
| undefined   | undefined   | <p>hi, i am , my parent is </p>          |

> repeat指令会产生临时作用域



# 7. 服务

## 7-1. 内建

### 7-1-1. $scope

参考2-4. 作用域章节

### 7-1-2. $timeout

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



### 7-1-2. $interval

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



### 7-1-3. $http

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



### 7.1.4. $event

参阅6-3. 通信



## 7-2. 自定义

自定义服务是一个工厂函数

### 7-2-1. 入参

* $ctx: 当前上下文



### 7-2-2. 出参

可选。如返回，可通过this.$servcies[name]引用

* $mount: 生命周期函数，挂载时调用

* $unmount: 生命周期函数，销毁时调用

  ​

### 7-2-3. 全局

使用Highway.service定义，需指定宏服务名和服务工厂函数



### 7-2-4. 局部

指定视图中有效，通过$services指定，需指定宏指令名和宏指令工厂函数



### 7-2-5. 示例

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



# 8. 工具

Highway内置工具函数，可通过Highway.utils引用

## 8-1. unique 

获取唯一标识

```
<!-- examples/tools/unique.html -->

const id0 = Highway.utils.unique();
const id1 = Highway.utils.unique('c');
alert(`${id0}, ${id1}`);
```



## 8-2. assign

拓展对象

```
<!-- examples/tools/assign.html -->

const obj0 = {
  a: 'a',
  b: 'b'
};
const obj1 = {
  a: 'aa',
  c: 'c'
};

const obj2 = Highway.utils.assign({}, obj0, obj1);
alert(JSON.stringify(obj2));
```



## 8-3. include

返回数组中指定数据下标，如未找到，返回 -1

```
<!-- examples/tools/include.html -->

const arr = [1, 2, 3, 4];
const idx0 = Highway.utils.include(arr, 5);
const idx1 = Highway.utils.include(arr, 2);
alert(`${idx0},${idx1}`);
```



## 8-4. isPlainObject

是否为原生Object对象

```
<!-- examples/tools/isPlainObject.html -->

alert(Highway.utils.isPlainObject({a: 'a'})); // true
alert(Highway.utils.isPlainObject([0, 1])); // false
```



## 8-5. isDate

是否为日期

```
<!-- examples/tools/isDate.html -->

alert(Highway.utils.isDate({})); // false
alert(Highway.utils.isDate(new Date)); // true
```



## 8-6. isObject

是否为对象

```
<!-- examples/tools/isObject.html -->

alert(Highway.utils.isObject({})); // true
alert(Highway.utils.isObject(new Date)); // true
alert(Highway.utils.isObject(function () {})); // true
alert(Highway.utils.isObject(1)); // false
```



## 8-7. isNumeric

是否为数字

```
<!-- examples/tools/isNumeric.html -->

alert(Highway.utils.isNumeric(1)); // true
alert(Highway.utils.isDate({})); // false
```



## 8-8. isTrue

是否为boolean true

```
<!-- examples/tools/isTrue.html -->

alert(Highway.utils.isTrue(true)); // true
alert(Highway.utils.isTrue('false')); // false
alert(Highway.utils.isTrue('1')); // true
```

> false、'false’、''、'0'、null、undefined、0均被判断为boolean false，其他均被判断为true



## 8-9. MapList

映射列表

* add(key, value)
* find(key, value)
* remove(key, value)
* clear()
* keys()
* values()

```
<!-- examples/tools/MapList.html -->

const mapList = new Highway.utils.MapList;
mapList.add('a', '0');
mapList.add('a', '1');
mapList.add('a', '2');
console.dir(mapList.find('a')); // ['0', '1', '2']

mapList.remove('a', '1');
console.dir(mapList.find('a')); // ['0', '2']

mapList.add('b', '2');
console.dir(mapList.keys()); // ['a', 'b']

console.dir(mapList.values()); // ['0', '2', '2']

mapList.clear();
```



## 8-10. secureHtml

安全HTML编码

````
<!-- examples/tools/secureHtml.html -->

console.log(Highway.utils.secureHtml('<script>alert(1)')); // &lt;script&gt;alert(1)
````



## 8-10.  secureUri

安全URI编码

```
<!-- examples/tools/secureUri.html -->

// http://uri?q=11&amp;&lt;script&gt;alert(1)
console.log(Highway.utils.secureHtml('http://uri?q=11&<script>alert(1)')); 
```



## 8-11. getAttrs

获取DOM元素所有属性

```
<div id="attr" directive-0:attr="exp" style="backgrond-color:red;"></div>

//{"id":"attr","directive-0:attr":"exp","style":"backgrond-color:red;"}
console.dir(Highway.utils.getAttrs($('#attr')));
```






