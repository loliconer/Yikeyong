### Three.js学习笔记（一）

#### 一、概念单词

* Scene
* Camera
* Renderer：渲染引擎有WebGL，调用显卡的GPU，使用硬件加速，渲染速度最快；Canvas，浏览器支持程度最好，主流浏览器均支持，尤其是IE、Opera只支持Canvas；SVG。
* Material
* Geometry
* Mesh
* Shader
* Light

#### 二、基础框架

##### Scene

所有的对象都需要加到场景中，如Camera，Mesh，Light等。

```js
let scene = new THREE.Scene()
```

##### Camera

```js
//PerspectiveCamera
let camera = new THREE.PerspectiveCamera(angle, width/height, near, far)
```

##### Renderer

```js
//WebGLRenderer
let renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)
```

##### Material

```js
//MeshBasicMaterial
let material = new THREE.MeshBashMaterial({
    color: 0x0f0
})
```

##### Geometry

```js
//CubeGeometry
let geometry = new THREE.CubeGeometry(x, y, z, [segmentsX], [segmentsY], [segmentsZ], [materials], [sides])
```

##### Mesh

```js
let mesh = new THREE.Mesh(geometry, material)
```

##### Light

```js
//DirectionalLight
let light= new THREE.DirectionalLight(color, intensity)
light.position.set(x, y, z)
```

##### 渲染

```js
renderer.render(scene, camera, [renderTarget], [forceClear])
```

renderTarget：渲染的目标，默认是渲染到前面定义的render中。 forceClear：每次绘制之前都将画布的内容清除，即使autoClear设置为false，也会清除。

##### 完整的代码如下：

```js
let scene, camera, renderer
let geometry, material, mesh
init()
animate()
function init() {
  //初始化场景
  scene = new THREE.Scene()
  //初始化相机
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 )
  camera.position.z = 0.5
  //初始化几何体
  geometry = new THREE.CubeGeometry(1, 1, 1)
  //初始化材质
  material = new THREE.MeshBasicMaterial({
  color: 0x0f0
  })
  //初始化网格体
  mesh = new THREE.Mesh(geometry, material)
  //初始化光源
  let light = new THREE.DirectionalLight(0xffffff, 1) //平行光源
  light.position.set(200, 200, 1000)
  //初始化渲染器
  renderer = new THREE.WebGLRenderer( { antialias: false } )
  renderer.setSize(window.innerWidth, window.innerHeight)
  //所有对象添加到场景中
  //添加网格体
  scene.add(mesh)
  //添加光源
  scene.add(light)
  //将渲染器添加到网页中
  document.body.appendChild(renderer.domElement)
}
function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02
  //渲染场景
  renderer.render(scene, camera)
}
```
