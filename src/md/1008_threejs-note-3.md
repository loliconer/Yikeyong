---
title: Three.js学习笔记（三）
date: 2016/10/05
intro: 三大基本要素的分类。
---

# Three.js学习笔记（三）

## 一、Camera分类

1. 正交投影Camera
```js
OrthographicCamera(left, right, top, bottom, near, far)
```

2. 透视投影Camera
```js
PerspectiveCamera(fov, width/height, near, far)
```

3. 混合Camera
```js
CombinedCamera(width, height, fov, near, far, orthoNear, orthoFar)
```
同时初始化正交投影Camera和透视投影Camera，默认为透视投影Camera。

4. CameraHelper
```js
Camerahelper(camera)
```

## 二、Light分类

1. Light
```js
Light(hex)
```

2. Ambient
```js
AmbientLight(hex)
```

3. Point
```js
PointLight(hex, intensity, distance)
````
intensity：光强，默认为1。 distance：光从intensity衰减到0的距离。

4. Spot
```js
SpotLight(hex, intensity, distance, angle, exponent)
```
angle：弧度为单位。 exponent：衰减参数，越大衰减越快。

5. Directional
```js
DirectionalLight(hex, intensity)
```
光的方向为光的位置指向原点。

6. Hemisphere
```js
Hemisphere(skyColorHex, groundColorHex, intensity)
```

7. Area
```js
AreaLight(hex, intensity)
```
只用于deferredrenderer。

## 三、Geometry分类

1. Geometry
```js
Geometry()
```

2. Cylinder
```js
CylinderGeometry(radiusTop=20, radiusBottom=20, height=100, radiusSegments=8, heightSegments=1, openEnded=false)
```

3. Sphere
```js
SphereGeometry(radius=50, widthSegments=8, heightSegments=6, phiStart=0, phiLength=2*PI, thetaStart=0, thetaLength=PI)
```

4. Box
```js
BoxGeometry(width, height, depth, widthSegmens=1, heightSegments=1, depthSegments=1)
```

5. Circle
```js
CircleGeometry(radius=50, segments=8, thetaStart=0, thetaLength=2*PI) //Cube renamed to Box
```

6. Extrude
```js
ExtrudeGeometry(shapes, options)
```
shapes: shape or an array of shapes options: object, parameters: curveSegments, steps, amount, bevelEnabled, bevelThickness, bevelSize, bevelSegments, extrudePath, frames, material, extrudeMaterial, uvGenerator

7. Icosahedron
```js
IcosahedronGeometry(radius=1, detail=0)
```
detail：大于1时，该几何体趋向于球体。

8. Lathe
```js
LatheGeometry(points, segments=12, phiStart=0, phiLength=2*PI)
```

9. Octahedron
```js
OctahedronGeometry(radius=1, detail=0)
```

10. Plane
```js
PlaneGeometry(width, height, widthSegments=1, heightSegments=1)
```

11. Ring
```js
RingGeometry(innerRadius=0, outerRadius=50, thetaSegments=8, phiSegments=8, thetaStart=0, thetaLength=2*PI)
```
 二维圆环，innerRadius为0时无效，所以必须给一个大于0的值。

12. Tetrahedron
```js
TetrahedronGeometry(radius=1, detail=0)
```

13. Text
```js
TextGeometry(text, parameters)
```
parameters: size, height=50, curveSegments, font, weight, style, bevelEnabled=false, bevelThickness=10, bevelSize=8

14. Torus
```js
TorusGeometry(radius=100, tube=40, radialSegments=8, tubularSegments=6, arc=2*PI)
```

15. TorusKnot
```js
TorusKnotGeometry(radius=100, tube=40, radialSegments=8, tubularSegments=6, p=2, q=3, heightScale=1)
```
p、q：互质的整数

## 四、Material分类

1. Material
```js
Material()
```

2. LineBasic
```js
LineBasicMaterial(parameters)
```
parameters: color=0xffffff, linewidth=1, linecap=’round’, linejoin=’round’, vertexColors=THREE.NoColors, fog=false

3. LineDashed
```js
LineDashedMaterial(parameters)
```
parameters: color=0xffffff, linewidth=1, scale=1, dashSize=3, gapSize=1, vertexColors=THREE.NoColors, fog=false

4. MeshBasic
```js
MeshBasicMaterial(parameters)
```
parameters: color=0xffffff, wireframe=false, wireframeLinewidth=1, wireframeLineCap=’round’, wireframeLinejoin=’round’, shading=THREE.SmoothShading, vertexColors=THREE.NoColors, fog=true, lightMap=null, specularMap=null, alphaMap=null, envMap=null, skinning=false, morphTargets=false

  不受光照影响，用来显示固定的颜色或wireframe。

5. MeshNormal
```js
MeshNormalMaterial(parameters)
```
parameters: morphTargets=false, shading=THREE.SmoothShading, wireframe=false, wireframeLinewidth-1

6. MeshDepth
```js
MeshDepthMaterial(parameters)
```
parameters: wireframe=false, wireframeLinewidth=1

  不会被照亮，只显示灰色。

7. MeshLambert
```js
MeshLambertMaterial(parameters)
```
受光照影响，但没有光泽。

8. MeshPhong
```js
MeshPhongMaterial(parameters)
```
受光照影响，可以有光泽。

9. MeshFace
```js
MeshFaceMaterial(materials)
```
用于将多个材质映射到多个表面。

10. PointCloud
```js
PointCloudMaterial(parameters)
```
粒子系统使用的默认Material。

  parameters: color=0xffffff, map=null, size=1.0, sizeAttenuation, vertexColors=false, fog=true

11. Shader
```js
ShaderMaterial(parameters)
```
