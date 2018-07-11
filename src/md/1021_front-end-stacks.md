---
title: 前端开发技术栈
date: 2018/07/11
intro: 前端开发领域涉及的技术知识列表。
---

<style>
  .blog ul > li {
    list-style-type: none;
    background: url(data:image/gif;base64,R0lGODlhDQAFAKIAAKOjo6GhoampqYSEhJWVlZ2dnZmZmXx8fCH5BAAAAAAALAAAAAANAAUAAAMVKLfcB6PIScsZJuttLvlgSByK4wQJADs=) no-repeat 0 8px;
    padding-left: 20px;
    line-height: 1.5;
  }
  .disnone {
    display: none;
  }
  .blog h3 {
    margin-bottom: 10px;
    cursor: pointer;
    -webkit-user-select: none;
  }
</style>

# 前端开发技术栈

- ### Browser
  1. Internet Explorer
  2. Chrome
  3. Firefox
  4. Safari
  5. Opera
  6. Edge
  7. Netscape
- ### Protocol
  1. HTTP/1.1
    1. URI
    2. Session
    3. Authentication
    4. Request
    5. Response
  2. HTTP/2
    1. Compression
    2. Minification
    3. Server Push
  3. WebSocket
- ### Language
  1. HTML
    1. DOM
    2. Element
    3. Attribute
  2. CSS
    1. Selector
    2. Priority
    3. Specificity
    4. Box Model
  3. JavaScript
    1. Prototype
    2. Scope
    3. Closure
    4. JSON
    5. AJAX
- ### Rendering Engine
  1. Trident
  2. Blink
  3. Gecko
  4. Webkit
  5. EdgeHTML
- ### JavaScript Engine
  1. Chakra
  2. V8
  3. SpiderMonkey
  4. Nitro
- ### Runtime
  1. Cookie
  2. Local Cache
  3. Session Storage
  4. Components
  5. Resources
- ### Editors
  1. Sublime Text
  2. WebStorm
  3. Atom
  4. Emacs
  5. Visual Studio Code
- ### Build Tasks
  1. Minifications
  2. Compilation
  3. Concatenation
  4. Uglification
  5. Image Optimization
  6. Unit Testing
- ### Build Tools
  1. Grunt
  2. Gulp
  3. NPM
  4. Broccoli
  5. Yeoman
- ### Quality
  1. ESLint
- ### Modular
  1. ES6 Module
  2. CommonJS
  3. AMD
  4. UMD
- ### Framework
  1. Angular
  2. React
  3. Vue
  4. Riot
  5. Ember
- ### Data Visualization
  1. D3
  2. Echarts
  3. HighCharts
  4. Vis.js
  5. Flot
- ### WebGL
  1. Three.js
  2. Babylon.js
  3. Pixi.js
- ### CSS3 Animation
  1. Animate.css
  2. bounce.js
  3. Effect.css
  4. move.js
- ### Desktop
  1. Electron
  2. NW.js
- ### Mobile
  1. React Native
  2. Ionic
  3. Weex


<script>
  document.querySelectorAll('h3').forEach(elem => {
    elem.addEventListener('click', () => {
      elem.nextElementSibling.classList.toggle('disnone')
    })
  })
</script>