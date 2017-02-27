## 1.温故知新

### 1.2 javascript

#### 1.2.1 包装对象

##### 

在原始类型中number,string,boolean这三种原始类型都有对应的包装类型。

下面定义一个基本类型string类型的变量，那么这个string的变量是一个“字符串的基本
对象”
```
    var s1 = "string";
```
那么什么是包装对象呢，如下
```
    var sObj = new String("string");
```
那么这样我们可以看到s1是一个字符串类型，而sObj是一个对象类型。

这里s1是个基本类型，它不是对象不应该有属性也不应该有方法。现在我想去访问这样一个基本类型的字符串它的长度是多少那么我们可能会尝试
```
    s1.length   //6
```
那么这里基本类型为什么会有length属性呢。抱着这个疑问，我们来尝试为s1的属性赋值

```
    s1.a = 1;
    s1.a    //undefined
```

我们发现我们这样的赋值也是成功的也是合法的，那么我们赋值后再输出，会发现值是undefined。为什么会这样呢，实际上这是javascript一个比较隐藏的机制。
```
    s1.length
    console.log(s1.length)   //6
    s1.a = 1;
    console.log(s1.a)  
```
在javascript中当我们把一个字符串尝试以对象方式去使用它的时候，比如说访问length属性或者给它增加一些属性，当你这样做这样的操作的时候javascript会非常机智的把基本类型转换为对应的包装类型对象。所以转换的时候相当于new了一个String对象，然后和原基本类型内容是一样的。

当完成访问后这个临时对象会被销毁掉，所以s1.a赋值为1后再去输出值为undefined。
基本上其它几个基本类型也是同一个道理。
```
    'str' -> String Object
    123   -> Number Object
    true  -> Boolean Object
```

#### 1.2.2 类型检测

##### 

在js中检测类型的方法有很多，如下

```
    typeof
    instanceof
    Object.prototype.toString
    constructor
    duck type
```

###### 1.2.2.1 首先来看看最常见的typeof运算符，typeof会返回一个字符串，它非常适合函数对象和基本类型的判断

```
typeof 100 "number"
typeof true "boolean"
typeof function "function"

typeof(undefined) "undefined"
typeof new Object() "object"
typeof [1, 2] "object"
typeof NaN "number"     //Infinity
typeof null "object"
```
为什么typeof null === "object"?实际上这是历史原因，事实上在标准规范尝试过typeof null的返回结果为null，但是发现修改完之后导致大量的网站都没法访问。

###### 1.2.2.2 typeof适合判断函数对象和基本类型，对于其他类型的对象使用instanceof。

比如判断一个对象是不是数组，我们如果判断typeof会返回一个object，显然不是我们想要的。对于判断对象类型的话是使用的instanceof（它是基于原型链去判断的操作符），它可以用来判断某个构造函数的prototype属性是否存在另外一个要检测对象的原型链上。
```
    typeof [1, 2] == "object" //x
```

instanceof期望左操作数是个对象，如果不是个对象的话直接返回false。它期望右操作数必须是个函数对象或者说函数构造器如果不是的话就会抛出异常。

instanceof大概的原理，就是它会判断左操作数的对象的原型链上是否有右边这个构造函数的prototype属性。

```
    [1, 2] instanceof Array === true
    new Object() instanceof Array === false
```

接下来看看下面这个例子

```
    function Person(){}
    function Student(){}
    Student.prototype = new Person();
    Student.prototype.constructor = Student;

    var oStudent = new Student();
    var oPerson = new Person();

    console.log("oStudent instanceof Student:", oStudent instanceof Student);
    console.log("oPerson instanceof Person:", oPerson instanceof Person);
    
    console.log("oStudent instanceof Person:", oStudent instanceof Person);
    console.log("oPerson instanceof Student:", oPerson instanceof Student);
```

上面我们定义了两个函数对象Person和Student,并将Student的prototype指向new Person的实例对象。

instanceof会判断oStudent.__proto__ 和 Student.prototype是否匹配，oPerson类同，所以两个皆为true。

这里分析一下oStudent instanceof Person为何为true,oPerson instanceof Student为何为false:
所有实例对象都有一个__proto__的内置属性，oStudent的__proto__指向的是创建它的函数对象的原型对象prototype，默认指向Student.prototype。但是当执行Student.prototype = new Person()后，oStudent.__proto__会指向Person.prototype，执行oStudent instanceof Person后会按原型链顺序判断是否匹配，如果匹配返回true。

#### 注意不同window或iframe间的对象类型检测不能使用instanceof

###### 1.2.2.3 除了typeof和instanceof以外呢，我们还可以去调用Object.prototype.toString这样一个方法去判断一些类型。比如下面的判断

```
    Object.prototype.toString.apply([])==="[object Array]"
    Object.prototype.toString.apply(function(){})==="object Function"
    Object.prototype.toString.apply(null)==="[object Null]"
    Object.prototype.toString.apply(undefined)==="[object Undefined]"
```

除此之外还有constructor和duck type。

我们知道任何一个对象都有一个constructor属性，实际上继承自原型，它会指向构造这个对象的构造器或者说构造函数，由于constructor是可以被改写的，所以使用的时候要小心。

那duck type呢，所谓的鸭子类型。比如说我们不知道一个对象是不是数组，那么我们可以判断它的length是不是数字，是不是有join、push等等数组的函数。通过一些特征去判断这个对象是否是属于某些类型。

# 类型检测小结

## typeof
适合基本类型及function检测，遇到null失效

## [[Class]]
通过{}.toString拿到，适合内置对象和基本类型，遇到null和undefined失效(IE678等返回[object Object])。

## instanceof
适合自定义对象，也可以用来检测原生对象，在不同iframe和window间检测时失效。

==========================================================================

## 2.前端的那些事

### gulp的进阶

由于gulp是基于nodejs，所以我觉得有必要来研究一下nodejs
- [Node.js 创建第一个应用](http://www.runoob.com/nodejs/nodejs-http-server.html)
- [Node.js Web 模块](http://www.runoob.com/nodejs/nodejs-web-module.html)

## 3.讨论研究vue过程中遇到的问题及心得
1.


