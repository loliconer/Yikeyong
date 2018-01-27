# IntersectionObserver在Edge15中无法观察空元素

在了解到IntersectionObserver这个新特性后，觉得挺有意思的，便决定应用到本站。这个API的[兼容性](https://caniuse.com/#search=IntersectionObserver)不是很好，目前知道的可以应用的地方主要有两个：一个是替代传统的图片懒加载，不仅性能有了很大的提升，代码也优雅了很多；另一个就是滚动到窗口底部时加载更多数据。

我在[博客首页](/blog)实现了第二种效果，Chrome和Firefox都没有问题，但是在Edge15上测试时发现没有任何效果，代码也不报错，就是没有发fetch请求数据，感觉很奇怪。先看代码：
```html
<div class="container">
  <div class="block-posts" id="posts"></div>
  <div class="observer-target"></div>
</div>
```
```js
  let offset = 0, hasMore = true
  const limit = 10

  const observer = new IntersectionObserver((records, _observer) => {
    records.forEach(record => {
      if (record.intersectionRatio > 0 && hasMore) {
        //utils.fetch是我自己封装了原生的fetch方法，方便使用
        utils.fetch(`/api/blogs?limit=${limit}&offset=${offset}`)
          .then(body => {
            if (body.length < limit) {
              hasMore = false
            }

            posts.innerHTML += body
            offset += body.length
          })
      }
    })
  })

  observer.observe(document.querySelector('.observer-target'))
```

在Edge上调试之后发现IntersectionObserver中的回调函数没有执行，不知为何，百思不得其解。

接着尝试运行以下代码：
```js
  const observer = new IntersectionObserver((records, _observer) => {
    records.forEach(record => {
      console.log(record)
    })
  })

  observer.observe(document.body)
```

没问题，有打印结果。看来问题出现在`document.querySelector('.observer-target')`这个元素上，也就是说，能观察body元素，但是观察不了这个元素，这是为什么呢？

对比后发现两个元素的主要区别就是observer-target没有任何内容，是一个空元素，会不会是这个原因呢？难道Edge无法观察空元素？想一想是挺有这个可能性的，空元素在页面上不占据任何空间，都不知道元素在哪，自然就可能无法检测到它是否进入视野。那么就给它加点东西吧：
```html
<div class="container">
  <div class="block-posts" id="posts"></div>
  <div class="observer-target">test</div>
</div>
```

OK，完美运行。看来确实如我所想，但是observer-target元素的作用就是一个占位符，这样写就会干涉到页面的内容了，再改：
```html
<style>
  .observer-target {
    width: 1px;
    height: 1px;
  }
</style>
<div class="container">
  <div class="block-posts" id="posts"></div>
  <div class="observer-target"></div>
</div>
```

既然无法观察到空元素，那我就让元素有1px的大小，运行后一切正常。

至此，问题得到了解决。至于Chrome和Firefox为什么能够观察到空元素，或许是因为毕竟有一个div在那，它们能够检测到div的存在和位置。对于Edge来说，这或许是个bug，或许它的本意就是这样。