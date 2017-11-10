# Web-linker技术点

* CSS3：linear-gradient，IE10+
* CSS3：transform，IE9+
* CSS3：box-shadow，IE9+，IE9对于设置了collapse的table元素使用投影无效。
* 图片垂直居中显示：img标签自带一个空行
  ```less
  div {
    height: 200px;
    overflow: hidden;
    text-align: center;
    font-size: 0;
    line-height: 200px;
    img {
      vertical-align: middle;
    }
  }
  ```

* JavaScript：语句优先级，function和let定义优先执行，不管语句在哪里定义。
  ```js
  //1.
  console.log(tmp)   //error
  
  //2.
  console.log(tmp)   //undefined
  let tmp
  
  //3.
  console.log(tmp);   //undefined
  if (0) {
      let tmp
  }
  
  //4.
  console.log(tmp)   //undefined
  let tmp = 1    //=== let tmp; tmp = 1;
  
  //5.
  console.log(tmp)   //function tmp(){}
  function tmp() {}
  ```
* float元素撑开父容器的高度：父容器设置：overflow:hidden;
* CSS：inline：多个inline属性的元素会尽量在同一行显示；block：具有该属性的元素可以定义大小。
* 命名代码块
* JavaScript的new：new操作只是创建了一个空对象，但是默认执行了构造函数；没有直接分配内存，而是动态分配的；只支持不带构造函数的继承。
* SEO：关键词：名词，有热度的名词，即有人搜索的词。title里放关键词；description包含对当前页面的描述，以及关键词；keywords可有可无。
* 使用JSONP跨域访问。
* Chrome和FF上闭包的生存周期在所有接口都被释放掉时结束，IE上闭包的内存无法被释放。将变量设置为null可释放闭包的的内存。
* placeholder：IE10+
* 表达式执行效率比较：
> parseInt(3.14) < 3.14 | 0  
(3.14).toString() < 3.14 + ""  
"3.14".valueOf() > "3.14" * 1 //FF相反  
new Object < {}  
new Array == [] //Chrome后者效率略高
* prototype与this的关系
* JavaScript使用的是64位的IEEE754浮点数，0.1+0.2!=0.3; 0.2+0.3==0.5;
* DOMContentLoaded，IE9+
* 鼠标滚轮事件的浏览器兼容性
* Recalculate，Layout，Paint渲染事件。  
Layout：计算元素的布局，即在文档中的位置和大小。  
Recalculate Style：计算元素的样式。  
Paint：绘制，任何界面上的显示变化都会触发Paint事件。
* 往元素中添加文本的几种方法：
  ```js
  element.innerHTML = 'text' //IE8+
  element.textContent = 'text' //IE9+
  element.innerText = 'text' //IE8+,FF45+
  document.createTextNode( 'text' ) //效率最高，全兼容
  document.createTextNode('').data = 'text'
  ```
* 触屏设备的touch事件：
  ```js
  elem.ontouchstart = function(e) {
      console.log(e.touches)
  }
  elem.ontouchend = function(e) {}
  window.ontouchmove = function(e) {}
  ```
* beforeunload事件：关闭页面时触发的事件，函数的返回值作为显示的内容，但是Firefox不显示。
* undefined：声明变量后没有初始化的值，是一个全局变量，且无法被用户修改。
> null == undefined  
null !== undefined  
undefined + 2 == NaN  
undefined + 'text' == 'undefinedtext'
* 正则表达式使用多个预查代替“与”运算
> /(?=._?次)(?=._?碳)(?=._?酸)(?=._?钴)/
* CSS3：text-shadow，IE10+
* BASE64：把数字转换成64进制，包括a-z、A-Z、0-9、+、/。BASE64图片就是把图片数据转换成BASE64的格式，总位数是4的倍数，因为64^4=256^3，不足位数补“=”，然后前面加上前缀：data:image/png;base,。适用于小图片，减少HTTP请求。
* 代理IP与真实IP：真实IP》代理IP》服务器，REMOTE_ADDR：发起HTTP请求的IP，无法伪造，无代理时就是真实IP，使用代理时就是代理IP；HTTP_X_FORWARDED_FOR：代理前的IP，可以伪造，无代理时为空，使用代理时就是真实IP。
* webkit原生不支持mouseenter和mouseleave事件。
* 动态页使用LastModified缓存：如果动态页的数据和程序文件都不变的话，返回304。
* 短连接，一般在一次HTTP请求中，服务器端会在所有的代码执行完才返回数据并断开连接，如果有长时间处理的任务，并且该任务不影响返回的数据时，可以在该任务之前就返回数据给客户端并断开连接，之后再处理该任务。
* arguments：Function实例的属性，保存函数在运行期间的一些参数，这些参数在arguments中以拟数组的形式存储，即提供了length属性，但是没有数组的方法，但是可以用数组方法主动调用它，也可以当成数组作为apply的参数使用。arguments.callee指向函数本身，由于某些引擎对arguments的处理非常复杂，在需要高效的代码中尽量避免使用arguments。
* caller：Function实例的对象，指函数被调用期间的调用者，没被调用时为null。
* delete：删除对象的属性，返回是否删除成功。直接用let声明的变量无法删除，部分对象自带的属性无法删除，比如length。
* 强类型数组：Int8Array、Uint8Array、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array。
  ```js
  let a = new Uint8Array( 3 ) //3个元素的数组，初始值为0
  let b = new Uint8Array( [1,2,3] )
  let buf = new ArrayBuffer( 4 ) //4个字节的内存空间
  let c = new Uint16Array( buf ) //数组有2个元素
  ```
* btoa和atob，Base64的编解码，IE10+
* postMessage跨域通信
* FileReader，IE10+，IE10、IE11不支持readAsBinaryString
* querySelector与querySelectorAll：前者返回一个元素，后者返回一个列表，IE8+
* function的语法问题
  ```js
  let a = function b() {} //error, b is not defined
  (function() {}) //warning
  function() {} //warning
  ```
* CSS：text-overflow:ellipsis; 溢出文本显示省略号
* 严格模式：必须是代码的第一个语句。
    1. 变量必须声明才能使用
    2. 不允许在普通代码块中声明函数
    3. 闭包内的this不指向Global对象
    4. 对象属性和函数形参不能重复
    5. eval拥有类似闭包的作用域
    6. callee和caller属性无法使用
    7. with语句无法使用
    8. 八进制数字无法使用
    9. 普通模式下的一些无效操作变成错误，比如delete不能删除的属性
    
  ```js
  "use strict"; //全局严格模式
  function f(){ "use strict"; } //局部严格模式
  ; "use strict"; //无效
  ```
* 时间格式：
  ```js
  new Date( '2016-1-1 00:00:00' ) //仅Chrome支持
  new Date( '2016/1/1 00:00:00' )
  new Date( 'Jan 1 2013 00:00:00' )
  new Date( '2013 Jan 1 00:00:00' )
  new Date( '2013(年) Jan(月) 1(日) 00:00:00 (时间)' ) //Chrome下，00与时间之间必须有空格
  new Date( '2013 Jan 1 00:00:00 GMT' )
  new Date( '2013/1/1 00:00:00 UTC' )
  ```
* 避免使用多端口同时做HTTP服务器
* 客户端操作SessinID实现用户切换
* CSS：radial-gradient，IE10+
* HTML5的manifest缓存
* 交错格式保存的图片加载时会从模糊到清晰加载
* indexedDB
* 把canvas数据下载到本地，IE不支持
  ```js
  a.download = 'test.png' //仅Chrome支持设置文件名
  a.href = canvas.toDataURL().replace('png','octet-stream')
  ```
* 使用document.styleSheets操作样式表
* 函数的bind方法
* JavaScript直接操作表格
> createCaption, createTFoot, createTHead, deleteCaption, deleteRow, deleteTFoot, deleteTHead, tHead, tBodies, tFoot, rows
* 重写prototype与修改prototype，前者会导致在该操作之前实例化的对象无法使用新的属性，后者可以访问。
