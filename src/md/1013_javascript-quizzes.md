---
title: JavaScript的一些面试题
date: 2017/08/13
intro: 收集了一些经典的JavaScript基础知识的面试题。
---

# JavaScript的一些面试题

```js
(function () {
    return typeof arguments
})()
```
> 'object'

arguments为函数的参数列表，是一个数组。

---

```js
let f = function g() {
    return 23
}
typeof g()
```
> ReferenceError: g is not defined

---

```js
(function (x) {
    delete x
    return x
})(1)
```
> 1

形参无法删除；当delete一个无法删除的对象时，delete语句返回false。

---

```js
let y = 1,
    x = y = typeof x
x
```
> 'undefined'

---

```js
(function f(f) {
    return typeof f()
})(function () {
    return 1
})
```
> 'number'

先执行传进去的函数。

---

```js
let foo = {
    bar () {
        return this.baz
    },
    baz: 1
}
(function () {
    return typeof arguments[0]()
})(foo.bar)
```
> 'undefined'

---

```js
let foo = {
    bar () {
        return this.baz
    },
    baz: 1
}
typeof (f = foo.bar)()
```
> 'undefined'

---

```js
let f = (function f() {
    return '1'
}, function g() {
    return 2
})()
console.log(typeof f)
```
> 'number'

逗号表达式返回的是最后一个值。

---

```js
let x = 1
if (function f() {}) {
    x += typeof f
}
console.log(x)
```
> '1undefined'

---

```js
let x = [typeof x, typeof y][1]
typeof typeof x
```
> 'string'

typeof x === 'undefined'

---

```js
(function (foo) {
    return typeof foo.bar
})({ foo: { bar: 1 } })
```
> 'undefined'

函数内部，foo = { foo: { bar: 1 } }

---

```js
(function f() {
    function f() {
        return 1
    }

    return f()

    function f() {
        return 2
    }
})()
```
> 2

后声明的函数覆盖了前面声明的函数。

---

```js
function f() {
    return f
}
new f() instanceof f
```
> false

此时new创建的实例为返回的函数而不是函数实例化的对象。
