/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var defaultModel = {
	    hair: "hair_20",
	    hairColor: "#000000",
	    scalpColor: "#4F4F4F",
	    head: "head_01",
	    eye: "yanjing_34",
	    eyebrow: "meimao_07",
	    nose: "bizi_13",
	    glasses: "glass_00",
	    mouth: "zuiba_11",
	    beard: "huzi_00",
	    body: "body_04",
	    bodyType: "sleeve",
	    bodySuit: "",
	    shoes: "#FFFFFF",
	    trousers: "#323242",
	    clothColor: "#FF7095",
	    clothStyle: "yifu_07",
	    skin: "#FFE4C0"
	};

	new Vue({
	    el: "#app",
	    data: {
	        scene: null,
	        camera: null,
	        renderer: null,
	        controls: null,
	        theta: 0,
	        model: {
	            hair: {
	                name: defaultModel.hair,
	                list: {
	                    hairColor: defaultModel.hairColor,
	                    scalpColor: defaultModel.scalpColor
	                },
	                image: {}
	            },
	            head: {
	                name: defaultModel.head,
	                list: {
	                    eye: defaultModel.eye,
	                    eyebrow: defaultModel.eyebrow,
	                    nose: defaultModel.nose,
	                    glasses: defaultModel.glasses,
	                    mouth: defaultModel.mouth,
	                    beard: defaultModel.beard
	                },
	                image: {}
	            },
	            body: {
	                name: defaultModel.body,
	                type: defaultModel.bodyType,
	                suit: defaultModel.bodySuit,
	                list: {
	                    shoes: defaultModel.shoes,
	                    trousers: defaultModel.trousers,
	                    clothColor: defaultModel.clothColor,
	                    clothStyle: defaultModel.clothStyle
	                },
	                image: {}
	            },
	            skin: {
	                color: defaultModel.skin
	            }
	        },
	        parts: ["head", "hair", "haircolor", "eyebrow", "eye", "glasses", "nose", "beard", "mouth", "skin", "body", "clothstyle", "clothcolor", "trousers", "shoes"]
	    },
	    methods: {
	        init: function init() {
	            var _this = this;

	            this.scene = new THREE.Scene();
	            this.scene.fog = new THREE.FogExp2(0xffffff, 0.00005);
	            this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
	            this.camera.position.set(0, 100, 1200);
	            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
	            this.renderer.setSize(window.innerWidth, window.innerHeight);
	            this.renderer.setClearColor(0x777777, 1);
	            this.renderer.gammaInput = true;
	            this.renderer.gammaOutput = true;
	            this.$el.insertBefore(this.renderer.domElement, this.$el.firstChild);

	            this.addLight();
	            this.addSky();
	            this.addFloor();
	            this.addModels();

	            window.addEventListener('resize', function () {
	                _this.camera.aspect = window.innerWidth / window.innerHeight;
	                _this.camera.updateProjectionMatrix();
	                _this.renderer.setSize(window.innerWidth, window.innerHeight);
	            }, false);

	            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	            this.controls.minDistance = 1000;
	            this.controls.maxDistance = 1800;

	            this.animate();
	        },
	        addLight: function addLight() {
	            this.scene.add(new THREE.AmbientLight(0x222222));

	            var dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
	            dirLight1.position.set(0, 0, 1);
	            dirLight1.castShadow = true;
	            dirLight1.shadowDarkness = 0.65;
	            this.scene.add(dirLight1);

	            var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
	            dirLight2.position.set(1, 0, -1);
	            this.scene.add(dirLight2);

	            var dirLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
	            dirLight3.position.set(-1, 0, -1);
	            this.scene.add(dirLight3);
	        },
	        addSky: function addSky() {
	            var gSky = new THREE.BoxGeometry(10000, 10000, 10000);
	            var sky = new THREE.Mesh(gSky, this.createBoxMaterial());
	            sky.name = "sky";
	            sky.position.y += 65;
	            this.scene.add(sky);
	        },
	        addFloor: function addFloor() {
	            var gFloor = new THREE.PlaneBufferGeometry(2048 * 5, 2048 * 5);
	            var floor = new THREE.Mesh(gFloor, this.createFloorMaterial());
	            floor.name = "floor";
	            floor.castShadow = false;
	            floor.receiveShadow = true;
	            floor.position.set(0, -330, 0);
	            floor.rotation.x = -Math.PI / 2;
	            this.scene.add(floor);
	        },
	        addModels: function addModels() {
	            this.modelLoader('hair');
	            this.modelLoader('head');
	            this.modelLoader('body');
	        },
	        modelLoader: function modelLoader(type) {
	            var _this2 = this;

	            var loader = new THREE.ObjectLoader();
	            var url = "/public/img/mengme/models/" + this.model[type].name + ".json";

	            loader.load(url, function (object) {
	                var mesh = object.children[0];
	                mesh.position.set(0, 330, 0);
	                _this2.scene.add(mesh);
	            });
	        },
	        createBoxMaterial: function createBoxMaterial() {
	            var mArray = [];
	            var dirs = ["px", "nx", "py", "ny", "pz", "nz"];
	            for (var i = 0; i < 6; i++) {
	                var tSky = THREE.ImageUtils.loadTexture("/public/img/mengme/sky-midautumn-" + dirs[i] + ".png");
	                tSky.minFilter = THREE.LinearFilter;
	                mArray.push(new THREE.MeshBasicMaterial({
	                    map: tSky,
	                    side: THREE.BackSide,
	                    color: 0xffffff,
	                    specular: 0x111111
	                }));
	            }
	            return new THREE.MeshFaceMaterial(mArray);
	        },
	        createFloorMaterial: function createFloorMaterial() {
	            var tFloor = THREE.ImageUtils.loadTexture("/public/img/mengme/sky-midautumn-ny.png");
	            tFloor.minFilter = THREE.LinearFilter;
	            return new THREE.MeshBasicMaterial({
	                map: tFloor,
	                side: THREE.DoubleSide
	            });
	        },
	        animate: function animate() {
	            requestAnimationFrame(this.animate);
	            this.renderer.render(this.scene, this.camera);
	            this.controls.update();
	        }
	    },
	    mounted: function mounted() {
	        this.init();
	    }
	});

/***/ }
/******/ ]);