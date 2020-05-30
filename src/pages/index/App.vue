<template>
  <div id="app">
    <yky-nav></yky-nav>

    <div class="container">
      <div class="works">
        <div class="cell"><a class="link" href="/spa/css-filter.html">CSS 滤镜</a></div>
        <div class="cell"><a class="link" href="/spa/beautiful-css-controls.html">漂亮的纯CSS绘制的图形</a></div>
        <div class="cell"><a class="link" href="/spa/css-shapes.html">纯CSS绘制的几何图形</a></div>
        <div class="cell"><a class="link" href="/spa/dockmenu.html">纯CSS仿Mac OS的Dock Menu</a></div>
        <div class="cell"><a class="link" href="/spa/html5-features.html">一些HTML5的新特性</a></div>
        <!-- <div class="cell"><a class="link" href="/spa/500px.html">500px布局</a></div> -->
        <!-- <div class="cell"><a class="link" href="/spa/waterfall.html">瀑布流布局</a></div> -->
        <!-- <div class="cell"><a class="link" href="/spa/pic.html">极品美图展示</a></div> -->
        <div class="cell"><a class="link" href="/spa/webgl-scene.html">WebGL 初始化场景</a></div>
        <!--        <div class="cell"><a class="link" href="/diy/index.html">硬件DIY</a></div>-->
        <div class="cell"><a class="link" href="/spa/whale.html">舞动的鲸鱼</a></div>
        <div class="cell"><a class="link" href="/spa/3dflower.html">3D Flower with canvas</a></div>
      </div>

      <h4 style="text-align: center">作品展示</h4>
      <div class="works">
        <div class="cell"><a class="link" href="/admin/" target="_blank">后台管理系统</a></div>
        <div class="cell"><a class="link" href="/works/beauty.html" target="_blank">美图欣赏</a></div>
        <!--        <div class="cell"><a class="link" href="/blog/index.html" target="_blank">博客</a></div>-->
        <div class="cell"><a class="link" href="/works/rosetta.html" target="_blank">Rosetta 英语学习篇</a></div>
        <div class="cell"><a class="link" href="/works/mengme.html" target="_blank">萌蜜</a></div>
      </div>

      <h4 style="text-align: center">子站点</h4>
      <div class="works works-sub-domain">
        <div class="cell"><a class="link" href="https://moshui.yikeyong.com" target="_blank"><img src="/img/logo-moshui.png" alt="墨水">墨水</a></div>
        <div class="cell"><a class="link" href="https://luowang.yikeyong.com" target="_blank"><img src="/img/logo-luowang.png" alt="罗网">罗网</a></div>
        <div class="cell"><a class="link" href="https://jiedao.yikeyong.com" target="_blank"><img src="/img/logo-jiedao.png" alt="接道">接道</a></div>
        <div class="cell"><a class="link" href="https://sodesine.yikeyong.com" target="_blank"><img src="/img/logo-sodesine.png" alt="搜的是内">搜的是内</a></div>
      </div>

      <h4 style="text-align: center">第三方托管站点</h4>
      <div class="works">
        <div class="cell"><a class="link" href="https://lovue.now.sh" target="_blank">lovue</a></div>
        <div class="cell"><a class="link" href="https://stackedit.now.sh" target="_blank">vue-stackedit</a></div>
      </div>
    </div>

    <yky-footer></yky-footer>
  </div>
</template>

<script>
import './app.less'

export default {
  name: 'App'
}
</script>
