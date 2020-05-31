// 一、实现单例模式（不透明单例）
/*********     1： 静态变量存储   ****** **/
/*
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

var a = Singleton.getInstance("seve1");
var b = Singleton.getInstance("seve2");
console.log(a === b); // true
*/

/**********        2： 闭包引用   **********/

/*
var Singleton = function (name) {
  this.name = name;
};
Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

var a = Singleton.getInstance("seve1");
var b = Singleton.getInstance("seve2");
console.log(a === b);
*/

// 二、透明的单例模式

/******            不符合 单一职责原则 */
/*
var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };
  CreateDiv.prototype.init = function () {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();

var a = new CreateDiv("sven1");
var b = new CreateDiv("seve2");
*/

//三、 用代理实现单例模式

/**** 
var CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

// 引入代理类
var ProxySingletonCreateDiv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();

var a = new CreateDiv("seve1");
var b = new CreateDiv("seve2");
*/

// javaScript中的单例模式

/********             降低全局变量带来的命名污染     */

/*  例如全局变量 var a= {}

1.使用命名空间 等价于 es6的模块化
    var namespace1 = {
        a:function(){
            console.log(1)
        },
        b:function(){
            console.log(2)
        }
    }

// 2.动态创建命名空间

/*
var MyApp = {};
MyApp.namespace = function (name) {
  var parts = name.split(".");
  var current = MyApp;
  for (var i in parts) {
    // 这一段有点难懂
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
};
// MyApp.namespace("event");
MyApp.namespace("dom.style");

console.log(MyApp);
// 上述代码等价于

var MyApp = {
  event: {},
  dom: {
    style: {},
  },
};

// 3.使用闭包封装私有变量：将变量封装在闭包内部，只暴露一些接口与外部通信
var user = function () {
  var __name = "zora",
    __age = 18;
  return {
    getUserInfo: function () {
      return __name + "-" + __age;
    },
  };
};
*/

// 四、惰性单例： 指在需要的时候才创建对象实例
// 缺点： 重复创建div

/*var createLoginLayer = function () {
  var div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

document.getElementById("loginBtn").onclick = function () {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = "block";
};
*/

// 缺点：违反了单一职责原则

/*var createLoginLayer = (function () {
  var div;
  return function () {
    if (!div) {
      div = document.createElement("div");
      div.innerHTML = "我是登录浮窗";
      div.style.display = "none";
      document.body.appendChild(div);
    }
    return div;
  };
})();
document.getElementById("loginBtn").onclick = function () {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = "block";
};
*/

// 五、通用的惰性单例
// 将不变的部分隔离 管理单例
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

var createLoginLayer = function () {
  var div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById("loginBtn").onclick = function () {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = "block";
};
