const defaultModel = {
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

new Vue( {
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
        parts: [ "head", "hair", "haircolor", "eyebrow", "eye", "glasses", "nose", "beard",
            "mouth", "skin", "body", "clothstyle", "clothcolor", "trousers", "shoes" ]
    },
    methods: {
        init () {
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2( 0xffffff, 0.00005 );
            this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 20000 );
            this.camera.position.set( 0, 100, 1200 );
            this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.setClearColor( 0x777777, 1 );
            this.renderer.gammaInput = true;
            this.renderer.gammaOutput = true;
            this.$el.insertBefore( this.renderer.domElement, this.$el.firstChild );

            this.addLight();
            this.addSky();
            this.addFloor();
            this.addModels();

            window.addEventListener( 'resize', () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
            }, false );

            this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
            this.controls.minDistance = 1000;
            this.controls.maxDistance = 1800;

            this.animate();
        },
        addLight () {
            this.scene.add( new THREE.AmbientLight( 0x222222 ) );

            let dirLight1 = new THREE.DirectionalLight( 0xffffff, 0.8 );
            dirLight1.position.set( 0, 0, 1 );
            dirLight1.castShadow = true;
            dirLight1.shadowDarkness = 0.65;
            this.scene.add( dirLight1 );

            let dirLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
            dirLight2.position.set( 1, 0, -1 );
            this.scene.add( dirLight2 );

            let dirLight3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
            dirLight3.position.set( -1, 0, -1 );
            this.scene.add( dirLight3 );
        },
        addSky () {
            let gSky = new THREE.BoxGeometry( 10000, 10000, 10000 );
            let sky = new THREE.Mesh( gSky, this.createBoxMaterial() );
            sky.name = "sky";
            sky.position.y += 65;
            this.scene.add( sky );
        },
        addFloor () {
            let gFloor = new THREE.PlaneBufferGeometry( 2048 * 5, 2048 * 5 );
            let floor = new THREE.Mesh( gFloor, this.createFloorMaterial() );
            floor.name = "floor";
            floor.castShadow = false;
            floor.receiveShadow = true;
            floor.position.set( 0, -330, 0 );
            floor.rotation.x = -Math.PI / 2;
            this.scene.add( floor );
        },
        addModels () {
            this.modelLoader( 'hair' );
            this.modelLoader( 'head' );
            this.modelLoader( 'body' );
        },
        modelLoader ( type ) {
            const loader = new THREE.ObjectLoader();
            let url = `/public/img/mengme/models/${this.model[ type ].name}.json`;

            loader.load( url, object => {
                let mesh = object.children[ 0 ];
                mesh.position.set( 0, 330, 0 );
                this.scene.add( mesh );
            } );
        },
        createBoxMaterial () {
            let mArray = [];
            const dirs = [ "px", "nx", "py", "ny", "pz", "nz" ];
            for ( let i = 0; i < 6; i++ ) {
                let tSky = THREE.ImageUtils.loadTexture( "/public/img/mengme/sky-midautumn-" + dirs[ i ] + ".png" );
                tSky.minFilter = THREE.LinearFilter;
                mArray.push( new THREE.MeshBasicMaterial( {
                    map: tSky,
                    side: THREE.BackSide,
                    color: 0xffffff,
                    specular: 0x111111
                } ) );
            }
            return new THREE.MeshFaceMaterial( mArray );
        },
        createFloorMaterial () {
            let tFloor = THREE.ImageUtils.loadTexture( "/public/img/mengme/sky-midautumn-ny.png" );
            tFloor.minFilter = THREE.LinearFilter;
            return new THREE.MeshBasicMaterial( {
                map: tFloor,
                side: THREE.DoubleSide
            } );
        },
        animate() {
            requestAnimationFrame( this.animate );
            this.renderer.render( this.scene, this.camera );
            this.controls.update();
        }
    },
    mounted () {
        this.init();
    }
} );