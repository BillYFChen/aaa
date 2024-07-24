import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Typeface from '/fonts/rounded_mplus_1c_medium_regular.json'; // FontのJSONデータ
import delta from './img/delta.jpg'

// Creating the Loading
// console.log(THREE.REVISION);
// function sleep(waitMsec) {
// 	var startMsec = new Date();
// 	while (new Date() - startMsec < waitMsec);
// };
// const progressBar = document.getElementById('progress-bar');
// THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
// 	console.log( 'Started loading file: ' + url.substring(0,70) + '...\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
// };
// THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
// 	console.log( 'Loading file: ' + url.substring(0,70) + '...\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
// 	progressBar.value = ( itemsLoaded / itemsTotal ) * 100;
// 	console.log( progressBar.value + '%');
// 	sleep(100);
// };
// THREE.DefaultLoadingManager.onLoad = function ( ) {
// 	console.log( 'Loading Complete!');
// };

// Creating the Render
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight ); // 描画サイズ
renderer.setPixelRatio( window.devicePixelRatio ); // ピクセル比
renderer.setClearColor( 0x505050, 1.0 ); // 背景色
// renderer.useLegacyLights = true; // 非常重要！
document.body.appendChild( renderer.domElement ); // レンダラーを配置

// Creating the Scene
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(delta);
scene.backgroundBlurriness = 1.0;
scene.backgroundIntensity = 0.1;

// Creating the Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 ); // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
camera.position.set( -50, 100, 300 ); // カメラ位置
// camera.position.set( 500, 500, 500 ); // カメラ位置
// camera.up.set( 0, 0, 0) ; // カメラの上方向ベクトルの設定
camera.lookAt( 0, 0, 0 ); // カメラ視点

// Creating the Control
const ocontrols = new OrbitControls( camera, renderer.domElement );

// Creating the Helper
// const axis = new THREE.AxesHelper( 200 ); // 軸オブジェクトを生成
// axis.visible = false;
// scene.add( axis ); // シーンにオブジェクトを追加
// const gridHelper = new THREE.GridHelper( 500,20 );
// // gridHelper.rotation.x = 0.5*Math.PI;
// gridHelper.position.set( 0, -100, 0 );
// scene.add( gridHelper );

const groundGeometry = new THREE.PlaneGeometry( 500, 500, 32, 32 );
groundGeometry.rotateX( -Math.PI/2 );
console.log(groundGeometry);
const groundMaterial = new THREE.MeshBasicMaterial({
	color: 0xaaaaaa,
	side: THREE.DoubleSide,
	// transparent: true,
	opacity: 0
});
const groundMesh= new THREE.Mesh( groundGeometry, groundMaterial );
groundMesh.position.set( 0, -100, 0 );
scene.add( groundMesh );

//Creating the Light
const ambient = new THREE.AmbientLight( 0xffffff, 1 ); //環境光 (色, 光の強さ)
scene.add( ambient );

const spotLight = new THREE.SpotLight( 0xffffff, 100000, 1000, 0.5, 0.5 ); //スポットライト (色, 光の強さ, 距離, 照射角, 輪郭)
spotLight.position.set( 0, 300, 300 );
scene.add( spotLight );
const sLightHelper = new THREE.SpotLightHelper( spotLight );
sLightHelper.visible = false;
scene.add( sLightHelper );

// Creating the Label
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

// Creating the Object
function cube( l, w, h, x, y, z, color ) {
  const cube = new THREE.Mesh(
	new THREE.BoxGeometry( l, w, h ),
	new THREE.MeshStandardMaterial({ color: color })
  );
  cube.position.set( x, y, z );

  const mouseDiv = document.createElement("div");
  mouseDiv.className = "label";
  mouseDiv.textContent = "("+x + "," + y + "," + z + ")";
  mouseDiv.style.marginTop = "-0em";
  mouseDiv.style.fontSize = "10px";
  mouseDiv.style.background = 'purple';
  mouseDiv.style.color = 'white';
  const label = new CSS2DObject( mouseDiv );
  label.position.set( x, y, z );
  label.element.draggable = true;
  return [cube, label];
}
const [cube1, label1] = cube( 10, 10, 10, 0, 0, 0, 0xff0000);
const [cube2, label2] = cube( 10, 10, 10, 10, 20, 30, 0x00ff00);
const [cube3, label3] = cube( 10, 10, 10, 20, 40, 60, 0x0000ff);

// Creating the Class
const fontLoader = new FontLoader();
const Ffont  = fontLoader.parse(Typeface);
class ObjectText{
  constructor(string) {
    this.string = string;
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: false,
    });
  }
  CreatObject( x, y, z, d ){
    const TEXT = this.string;
    const shapes = Ffont.generateShapes( TEXT, d );//文字サイズ
    const TextGeometry = new THREE.ShapeGeometry( shapes, d );
    TextGeometry.computeBoundingBox();
    const Geotext = new THREE.Mesh( TextGeometry, this.material );
    Geotext.position.set( x, y, z );
	return Geotext;
  }
}
const myObject = new ObjectText("あああああ");
const myObject1 = myObject.CreatObject( 30, 60, 90, 10);
console.log( myObject1 );

// Creating the Group
const cubegroup = new THREE.Group();
cubegroup.add( cube1, cube2, cube3, label1, label2, label3, myObject1 );
scene.add( cubegroup );
console.log( cubegroup );

// Creating the Event
// window.addEventListener( 'mousedown', onMousedown );
// function onMousedown( event ) {
//   const [intersections, x, y] = interacter (event);
//   console.log(intersections, 'x:'+x, 'y:'+y);
//   if (intersections.length > 0) {
//     const selectedObject = intersections[0].object;
//     selectedObject.material.color = new THREE.Color(Math.random() * 0xffffff);
//     console.log('object selected',selectedObject.parent.children[1]);
//   };
// };

// Creating the Drag
// let objects = [cube1, cube2, cube3, cubegroup];
// const dcontrols = new DragControls( objects, camera, renderer.domElement );
// // dcontrols.deactivate();
// // dcontrols.activate();
// dcontrols.addEventListener( 'dragstart', function() { ocontrols.enabled = false; });
// dcontrols.addEventListener( 'dragend', function() { ocontrols.enabled = true; });
// dcontrols.addEventListener( 'hoveron', function(event){ event.object.scale.set(3,3,3); event.object.material.wireframe = true; });
// dcontrols.addEventListener( 'hoveroff', function(event){ event.object.scale.set(1,1,1); event.object.material.wireframe = false; });

const raycaster = new THREE.Raycaster();
function interacter (event){
  const coords = {
    x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
  };
  raycaster.setFromCamera( coords, camera );
  let intersections = raycaster.intersectObjects( scene.children, true );
  return [intersections, coords.x, coords.y];
};

// Creating the GUI
const gui = new dat.GUI();
const options = {
	textx: 0,
	cube1x: 0,
	cube2x: 0,
	cube3x: 0,
	groupx: 0,
};
gui.add( options, 'textx', -100, 100 ).onChange( function( e ){
    myObject1.position.x = e;
});
gui.add( options, 'cube1x', -100, 100 ).onChange( function( e ){
    cube1.position.x = e;
});
gui.add( options, 'cube2x', -100, 100 ).onChange( function( e ){
    cube2.position.x = e;
});
gui.add( options, 'cube3x', -100, 100 ).onChange( function( e ){
    cube3.position.x = e;
});
gui.add( options, 'groupx', -100, 500 ).onChange( function( e ){
    cubegroup.position.x = e;
});

// Creating the Animate
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	ocontrols.update();
	sLightHelper.update();
  labelRenderer.render( scene, camera );
  label1.position.x = cube1.position.x;
  label1.position.y = cube1.position.y;
  label1.position.z = cube1.position.z;
  label1.element.textContent="("+cube1.position.x.toFixed(0) + "," + cube1.position.y.toFixed(0) + "," + cube1.position.z.toFixed(0) + ")";
  label2.position.x = cube2.position.x;
  label2.position.y = cube2.position.y;
  label2.position.z = cube2.position.z;
  label2.element.textContent="("+cube2.position.x.toFixed(0) + "," + cube2.position.y.toFixed(0) + "," + cube2.position.z.toFixed(0) + ")";
  label3.position.x = cube3.position.x;
  label3.position.y = cube3.position.y;
  label3.position.z = cube3.position.z;
  label3.element.textContent="("+cube3.position.x.toFixed(0) + "," + cube3.position.y.toFixed(0) + "," + cube3.position.z.toFixed(0) + ")";

}
animate();

// Creatning the Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
});
