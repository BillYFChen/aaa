
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EnvironmentNode } from 'three/examples/jsm/nodes/Nodes.js';
console.log(THREE.REVISION);

// Creating the Render
const renderer = new THREE.WebGLRenderer({ antialias: true});
// const renderer = new THREE.WebGLRenderer();
// renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize( window.innerWidth, window.innerHeight ); // 描画サイズ
renderer.setPixelRatio( window.devicePixelRatio ); // ピクセル比
renderer.setClearColor( 0x505050, 1.0 ); // 背景色
renderer.useLegacyLights = true; // 非常重要！
document.body.appendChild( renderer.domElement ); // レンダラーを配置

// Creating the Scene
const scene = new THREE.Scene();

// Creating the Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 ); // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
camera.position.set( 500, 500, 500 ); // カメラ位置
// camera.position.set( 500, 500, 500 ); // カメラ位置
// camera.up.set( 0, 0, 0) ; // カメラの上方向ベクトルの設定
// camera.lookAt( 0, 0, 0 ); // カメラ視点

// Creating the Control
const controls = new OrbitControls( camera, renderer.domElement );

// Creating Helper
const axis = new THREE.AxesHelper( 200 ); // 軸オブジェクトを生成
scene.add( axis ); // シーンにオブジェクトを追加

const gridHelper = new THREE.GridHelper( 500,20 );
// gridHelper.rotation.x = 0.5*Math.PI;
scene.add( gridHelper );

const groundGeometry = new THREE.PlaneGeometry( 500, 500, 32, 32 );
groundGeometry.rotateX( -Math.PI/2 );
const groundMaterial = new THREE.MeshBasicMaterial({
	color: 0xff00ff,
	side: THREE.DoubleSide,
	transparent: true,
	opacity: 0.1
});
const groundMesh= new THREE.Mesh( groundGeometry, groundMaterial );
scene.add( groundMesh );

//Creating Light
const ambient = new THREE.AmbientLight( 0xffffff, 1 ); //環境光 (色, 光の強さ)
scene.add( ambient );

const spotLight = new THREE.SpotLight( 0xffffff, 100000, 1000, 0.5, 0.5 ); //スポットライト (色, 光の強さ, 距離, 照射角, 輪郭)
spotLight.position.set( 0, 300, 300 );
scene.add( spotLight );
const sLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( sLightHelper );

// Create Importing
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

var url = new URL( './cad/ecm-e3h-fx1308rse_asm.gltf', import.meta.url );
url = "" + url;
loader.load(
	url,
	function ( gltf ) {
		const model = gltf.scene;
		const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
		model.traverse(function(node) {
			if (node.isMesh) {
				node.material = material;
				}
			});
		model.position.set( 0, 0, 0 );
		scene.add( model );
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);

var url = new URL( './cad/rSTS-16A_STS16002SR00035_20210719.gltf', import.meta.url );
url = "" + url;
loader.load(
	url,
	function ( gltf ) {
		const model = gltf.scene;
		model.position.set( 0, 0, -100 );
		scene.add( model );
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);

// Create Animate
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	sLightHelper.update();
}
animate();

// Creating the GUI
const gui = new dat.GUI();
const options = {
    Color: '#ffffff',
    Intensity: 10,
	Angle: 0.5,
	Rotate: 0,
	Environment: 1,
};
gui.addColor( options, 'Color' ).onChange( function( e ){
    spotLight.color.set(e);
});
gui.add( options, 'Intensity', 0, 100 ).onChange( function( e ){
    spotLight.intensity = e*100000;
});
gui.add( options, 'Angle', 0, 1 ).onChange( function( e ){
    spotLight.angle = e;
});
gui.add( options, 'Rotate', -10, 10 ).onChange( function( e ){
    spotLight.target.position.set(0,e*10,0);
});
gui.add( options, 'Environment', -1, 10 ).onChange( function( e ){
    ambient.intensity = e;
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
