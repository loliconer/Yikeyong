---
title: Three.js学习笔记（二）
date: 2016/10/05
intro: 一些基本用法。
---

# Three.js学习笔记（二）

## 一、点与线

**点**

Three.js中使用的是右手坐标系，空间中的点可以用一个向量来表示。

定义方法1：
```js
let point = new THREE.Vector3(x, y, z)
```

定义方法2：
```js
let point = new THREE.Vector3()
point.set(x, y, z)
```

**线**

线由点组成。
```js
let geometry = new THREE.Geometry()
let material = new THREE.LineBasicMaterial({
    vertexColor: THREE.VertexColors
})
let color1 = new THREE.Color(0x444),
    color2 = new THREE.Color(0xf00)
let point1 = new THREE.Vector3(x1, y1, z1),
    point2 = new THREE.Vector3(x2, y2, z2)
geometry.vertices.push(point1)
geometry.vertices.push(point2)
geometry.colors.push(color1, color2)
let line = new THREE.Line(geometry, material, THREE.LinePieces)
scene.add(line)
```

## 二、性能监视器的使用

1. 引入js文件
2. 初始化
```js
let stats = new Stats()
stats.setMode(0) //0:fps mode 1:ms mode
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'
document.body.appendChild(stats.domElement)
```
3. 在animation函数中调用update()

## 三、使用Tween引擎创建动画

1. 引入min.js文件
2. 初始化
```js
new TWEEN.Tween(mesh.position).to({x: -400}, 3000).repeat(Infinity).start()
```
3.  在animation函数中调用update()
