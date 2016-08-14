"use strict";
import utils from "./utils";

!function () {
    var scene, camera, renderer, controls;
    var currentSelectedDockItem = "";
    var theta = 0;
    var onProgress = function ( xhr ) {
    };
    var onError = function () {
        alert( "加载失败，请刷新页面重新加载。" );
    };
    const TEXTUREWIDTH = 1024, TEXTUREHEIGHT = 1024;
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
    const model = {
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
        },
        getModel ( type ) {
            return this[ type ];
        },
        getTextureList ( type ) {
            return this[ type ].list;
        },
        getModelName ( type ) {
            return this[ type ].name;
        }
    };
    var test = function () {

        this.getValue = function ( region ) {
            switch ( region ) {
                case "hair":
                case "head":
                case "body":
                    return this[ region ].name;
                case "haircolor":
                    return this.hair.list.haircolor.color;
                case "eye":
                case "eyebrow":
                case "glasses":
                case "mouth":
                case "nose":
                case "beard":
                    return this.head.list[ region ];
                case "skin":
                    return this.skin.color;
                case "clothcolor":
                case "trousers":
                case "shoes":
                    return this.body.list[ region ].color;
                case "clothstyle":
                    if ( [ 'sleeve', 'nosleeve' ].indexOf( this.body.type ) == -1 ) {
                        return this.body.suit;
                    } else {
                        return this.body.list.clothstyle;
                    }
                default :
                    break;
            }
        };

        this.setTexture = function ( type ) {
            this.getModel( type ).image = this.drawCanvas( this.getPaintList( type ) );
        };

        this.setTextureList = function ( type, name, value ) {
            if ( name == "skin" ) {
                this.skin.color = value;
                return;
            }

            if ( value[ 0 ] == "#" ) {
                this[ type ].list[ name ].color = value;
                if ( name == "haircolor" ) {
                    this.hair.list.scalpcolor.color = getLightColorOf( value );
                }
            } else {
                if ( type === "body" && [ 'sleeve', 'nosleeve' ].indexOf( this.body.type ) == -1 ) {
                    this.body.suit = value;
                } else {
                    this[ type ].list[ name ] = value;
                }

            }
        };

        this.setMeshName = function ( type, name ) {
            this[ type ].name = name;
        };

        this.update = function ( region, value ) {
            var modelTypes;
            switch ( region ) {
                case "haircolor":
                    modelTypes = [ 'hair' ];
                    break;
                case "eye":
                case "eyebrow":
                case "glasses":
                case "mouth":
                case "nose":
                case "beard":
                    modelTypes = [ 'head' ];
                    break;
                case "clothcolor":
                case "clothstyle":
                case "shoes":
                case "trousers":
                    modelTypes = [ 'body' ];
                    break;
                case "skin":
                    modelTypes = [ 'head', 'body' ];
                    break;
                case "hair":
                case "head":
                case "body":
                    this.setMeshName( region, value );
                    return;
                    break;
                default :
                    break;
            }

            for ( var i = 0; i < modelTypes.length; i++ ) {
                this.setTextureList( modelTypes[ i ], region, value );
                this.setTexture( modelTypes[ i ] );
            }
            return modelTypes;
        };


        this.init = function ( config, callback ) {
            var scope = this;

            scope.setTexture( 'hair' );
            utils.cacheImages( [ config.eye, config.eyebrow, config.nose, config.glasses, config.mouth, config.beard, config.clothstyle ], function () {
                scope.setTexture( 'head' );
                scope.setTexture( 'body' );
                if ( callback ) callback();
            } )
        };
    };

    var sceneController = {
        init () {
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2( 0xffffff, 0.00005 );
            //scene.fog = new THREE.Fog(0xffffff,1000,4000);
            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 20000 );
            camera.position.set( 0, 100, 1200 );

            renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
            //renderer.shadowMapEnabled = true;

            //set renderer's attributes and add it to the document
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor( 0x777777, 1 );
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            document.body.insertBefore( renderer.domElement, document.body.firstChild );

            this.build();

            //window resize
            window.addEventListener( 'resize', onWindowResize, false );

            //mouse control
            controls = new THREE.OrbitControls( camera, renderer.domElement );
            controls.minDistance = 1000;
            controls.maxDistance = 1800;
        },
        build () {
            this.addLight();
            this.addSky();
            this.addFloor();
            this.addModels();
        },
        addLight () {
            scene.add( new THREE.AmbientLight( 0x222222 ) );
            //use spotLight
            //var spotLight = new THREE.SpotLight( 0xffffff, 1 );
            //spotLight.position.set( 500, 2000, 1000 );
            //spotLight.castShadow = true;
            //scene.add( spotLight );

            /*var spotLight = new THREE.SpotLight( 0xffffff, 1 );
             spotLight.position.set( 500, 2000, -1000 );
             spotLight.castShadow = true;
             scene.add( spotLight );*/

            //use directionalLight
            let dirLight1 = new THREE.DirectionalLight( 0xffffff, 0.8 );
            dirLight1.position.set( 0, 0, 1 );
            dirLight1.castShadow = true;
            dirLight1.shadowDarkness = 0.65;
            scene.add( dirLight1 );

            let dirLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
            dirLight2.position.set( 1, 0, -1 );
            scene.add( dirLight2 );

            let dirLight3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
            dirLight3.position.set( -1, 0, -1 );
            scene.add( dirLight3 );
        },
        addSky () {
            let gSky = new THREE.BoxGeometry( 10000, 10000, 10000 );
            let sky = new THREE.Mesh( gSky, this.createBoxMaterial() );
            sky.name = "sky";
            sky.position.y += 65;
            scene.add( sky );
        },
        addFloor () {
            let gFloor = new THREE.PlaneBufferGeometry( 2048 * 5, 2048 * 5 );
            let floor = new THREE.Mesh( gFloor, this.createFloorMaterial() );
            floor.name = "floor";
            floor.castShadow = false;
            floor.receiveShadow = true;
            floor.position.set( 0, -330, 0 );
            floor.rotation.x = -Math.PI / 2;
            scene.add( floor );
        },
        addModels () {
            model.init( modelConfig, function () {
                $( '.progressbar' ).show();
                modelLoader( 'hair' );
                modelLoader( 'head' );
                modelLoader( 'body', function () {
                    hideProgressbar();
                } );
            } );
        },
        updateMeshesTexture: function ( value ) {
            let updateArray = model.update( currentSelectedDockItem, value );
            let mesh = [];
            for ( let i = 0; i < updateArray.length; i++ ) {
                mesh[ i ] = scene.getObjectByProperty( 'name', model.getModelName( updateArray[ i ] ) );
                mesh[ i ].material.map.image.src = model.getModel( updateArray[ i ] ).image;
            }
            setTimeout( function () {
                for ( let i = 0; i < updateArray.length; i++ ) {
                    mesh[ i ].material.map.needsUpdate = true;
                }
            }, 10 );

        },
        replaceMesh ( oldMesh, newMesh ) {
            newMesh.material.map.image.src = model.getModel( currentSelectedDockItem ).image;
            scene.remove( oldMesh );
            if ( scene.getObjectByProperty( 'name', model.getModelName( currentSelectedDockItem ) ) === undefined ) {
                model.setMeshName( currentSelectedDockItem, newMesh.name );

                setTimeout( function () {
                    newMesh.material.map.needsUpdate = true;
                    scene.add( newMesh );
                }, 100 );
            }
        },
        createBoxMaterial () {
            let mArray = [];
            const dirs = [ "px", "nx", "py", "ny", "pz", "nz" ];
            for ( let i = 0; i < 6; i++ ) {
                var tSky = THREE.ImageUtils.loadTexture( "/img/sky-midautumn-" + dirs[ i ] + ".png" );
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
            let tFloor = THREE.ImageUtils.loadTexture( "/img/sky-midautumn-ny.png" );
            tFloor.minFilter = THREE.LinearFilter;
            return new THREE.MeshBasicMaterial( {
                map: tFloor,
                side: THREE.DoubleSide
            } );
        },
        animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            controls.update();
        }
    };

    sceneController.init();

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
}();