### NodeList的forEach方法的兼容性处理

我们经常需要遍历`document.querySelectorAll`返回的结果，最理想的情况是直接使用forEach方法遍历，但是该结果是一个NodeList对象，而目前支持NodeList对象的forEach方法的浏览器只有：Chrome51+, Firefox50+, Safari10+，IE和Edge浏览器都不支持。对于这些浏览器，我们需要做一些兼容性处理，具体的方法有以下几种：

```js
const elems = document.querySelectorAll('selector')
```

```js
[...elems].forEach(elem => {
  console.log(elem)
})
```

```js
for (let elem of elems) {
  console.log(elem)
}
```

```js
const elemsArr = Array.from(elems)
elemsArr.forEach(elem => {
  console.log(elem)
})
```

```js
if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}
elems.forEach(elem => {
  console.log(elem)
})
```

类似地，childNodes也是NodeList对象，同样可以用上面的方法处理。