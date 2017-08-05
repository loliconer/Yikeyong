### Three.js学习笔记（四）

#### 一、Collada模型文件

后缀：dae，使用ColladaLoader.js

```js
let loader = new THREE.ColladaLoader()
loader.options.convertUpAxis = true
loader.load( 'name.dae', collada =>  {
    dae = collada.scene
    dae.traverse( child =>  {
        if( child instanceof THREE.SkinnedMesh ) {
            let animation = new THREE.Animation(child, child.geometry.animation)
            animation.play()
        }
    })
    dae.scale.x = dae.scale.y = dae.scale.z = 0.002
    dae.updateMatrix()
    init()
    animate()
})
function init() {
    let loader = new THREE.JSONLoader()
    loader.load('name.js', (geometry, materials) => {
        //
    })
    scene.add(dae)
}
```

#### 二、DDS文件

Direct Draw Surface，用photoshop打开

#### 三、MTL文件

材质库文件，使用DDSLoader.js, MTLLoader.js, OBJMTLLoader.js

```js
THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
let loader = new THREE.OBJMTLLoader()
loader.load('name.obj', 'name.mtl', object =>{
    scene.add(object)
}, onProgress, onError)
```

#### 四、OBJ文件

3D模型文件，不包含动画、材质、贴图、粒子、动力学信息，使用OBJLoader.js

```js
let manager = new THREE.LoadingManager()
manager.onProgress = function() {}

let loader = new THREE.ImageLoader(manager)
loader.load('name.jpg', image =>{
    texture.image = image
    texture.needsUpdate = true
})
loader = new THREE.OBJLoader(manager)
loader.load('name.obj', object => {
    object.traverse(child => {
        if(child instanceof THREE.Mesh){
            child.material.map = texture
        }
    })
    scene.add(object)
}, onProgress, onError)
```

#### 五、PLY文件

3D Mesh模型数据文件，使用PLYLoader.js

```js
let loader = new THREE.PLYLoader()
loader.addEventListener('load', event => {
    let geometry = event.content
    //
})
loader.load('name.ply')
```

#### 六、STL文件

3D模型文件，使用STLLoader.js

```js
let loader = new THREE.STLLoader()
loader.addEventListener('load', event => {
    let geometry = event.content
    //
})
loader.load('name.stl')
```

#### 七、VRML文件

使用VRMLLoader.js

```js
let loader = new THREE.VRMLLoader()
loader.addEventListener('load', event => {
    scene.add(event.content)
})
loader.load('name.wrl')
```

#### 八、VTK文件

使用VTLLoader.js

```js
let loader = new THREE.VTKLoader()
loader.load('name.vtk', geometry => {})
```

#### 九、UTF8

使用UTF8Loader.js, MTLLoader.js, DDSLoader.js

```js
THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
let loader = new THREE.UTF8Loader()
loader.load('utf8/name.js', object => {})
```

#### 十、PDB文件

使用PDBLoader.js, CSS2DRenderer.js

```js
let loader = new THREE.PDBLoader()
loader.load('name.pdb')
```

#### 十一、CTM文件

使用lzma.js, ctm.js, CTMLoader.js

#### 十二、AWD文件

使用AWDLoader.js

```js
let loader = new THREE.AWDLoader()
loader.materialFactory = createMaterial
loader.load('name.awd', _trunk => {
    trunk = _trunk
    init()
})
function createMaterial(name) {
    return null
}
function init() {
    scene.add(trunk)
}
```
