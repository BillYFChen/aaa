import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const red = 0xff0000;
const orange = 0xffa500;
const yellow = 0xffff00;
const green = 0x00ff00;
const blue = 0x0000ff;
const purple = 0x4b0082;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10,10,25);
camera.lookAt(2,2,2)

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// Creating the Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); // 描画サイズ
renderer.setPixelRatio( window.devicePixelRatio ); // ピクセル比
// renderer.setClearColor( 0x000000, 1.0 ); // 背景色
renderer.setClearColor( 0xFFFFFF, 1.0 ); // 背景色
renderer.setAnimationLoop( animate );
// renderer.shadowMap.enabled = true;
// renderer.antialias = true;
// renderer.alpha = true;
document.body.appendChild( renderer.domElement ); // レンダラーを配置


const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

status( 0, 10, 5, 3, 6, 1 );
status( 1, 8, 1, 2, 5, 1 );
status( 2, 5, 7, 2, 2, 6 );
status( 3, 2, 2, 5, 2, 3 );
status( 4, 1, 1, 1, 1, 1 );

renderer.render( scene, camera );

function status(z, y, s1, s2, s3, s4 ) {
    const opacity = 0.9;
    const dis = 2.5;
    const thick = 1;
    const height = 0.1;

    const geo0 = new THREE.BoxGeometry( thick, y, thick );
    const mat0 = new THREE.MeshBasicMaterial( { color: 0xFFCE30, opacity: opacity, transparent: true } );
    const box0 = new THREE.Mesh( geo0, mat0 );
    box0.position.set(-thick/2,y/2,z*dis);
    scene.add( box0 );

	const geo1 = new THREE.BoxGeometry( s1, height, thick );
    const mat1 = new THREE.MeshBasicMaterial( { color: 0xE83845, opacity: opacity, transparent: true } );
    const box1 = new THREE.Mesh( geo1, mat1 );
    box1.position.set(s1/2,0,z*dis);
    scene.add( box1 );

	const geo2 = new THREE.BoxGeometry( s2, height, thick );
    const mat2 = new THREE.MeshBasicMaterial( { color: 0xE389B9, opacity: opacity, transparent: true } );
    const box2 = new THREE.Mesh( geo2, mat2 );
    box2.position.set(s1+s2/2,0,z*dis);
    scene.add( box2 );

	const geo3 = new THREE.BoxGeometry( s3, height, thick );
    const mat3 = new THREE.MeshBasicMaterial( { color: 0x746AB0, opacity: opacity, transparent: true } );
    const box3 = new THREE.Mesh( geo3, mat3 );
    box3.position.set(s1+s2+s3/2,0,z*dis);
    scene.add( box3 );

	const geo4 = new THREE.BoxGeometry( s4, height, thick );
    const mat4 = new THREE.MeshBasicMaterial( { color: 0x288BA8, opacity: opacity, transparent: true } );
    const box4 = new THREE.Mesh( geo4, mat4 );
    box4.position.set(s1+s2+s3+s4/2,0,z*dis);
    scene.add( box4 );


}

// function status(z, y, s1, s2, s3, s4 ) {
//     const opacity = 0.9;
//     const dis = 5;
//     const thick = 1;

// 	const geo1 = new THREE.BoxGeometry( s1, y, thick );
//     const mat1 = new THREE.MeshBasicMaterial( { color: 0x248F24, opacity: opacity, transparent: true } );
//     const box1 = new THREE.Mesh( geo1, mat1 );
//     box1.position.set(s1/2,y/2,z*dis);
//     scene.add( box1 );

// 	const geo2 = new THREE.BoxGeometry( s2, y, thick );
//     const mat2 = new THREE.MeshBasicMaterial( { color: 0xFFA200, opacity: opacity, transparent: true } );
//     const box2 = new THREE.Mesh( geo2, mat2 );
//     box2.position.set(s1+s2/2,y/2,z*dis);
//     scene.add( box2 );

// 	const geo3 = new THREE.BoxGeometry( s3, y, thick );
//     const mat3 = new THREE.MeshBasicMaterial( { color: 0xFF1919, opacity: opacity, transparent: true } );
//     const box3 = new THREE.Mesh( geo3, mat3 );
//     box3.position.set(s1+s2+s3/2,y/2,z*dis);
//     scene.add( box3 );

// 	const geo4 = new THREE.BoxGeometry( s4, y, thick );
//     const mat4 = new THREE.MeshBasicMaterial( { color: 0xE680E6, opacity: opacity, transparent: true } );
//     const box4 = new THREE.Mesh( geo4, mat4 );
//     box4.position.set(s1+s2+s3+s4/2,y/2,z*dis);
//     scene.add( box4 );


// }



// import * as THREE from 'three';
// import * as dat from 'dat.gui';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// // Creating the Scene
// const scene = new THREE.Scene();

// // Creating the Camera
// const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 ); // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
// // const camera = new THREE.OrthographicCamera( window.innerWidth / - 100, window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / - 100, 1, 1000 ); // left, right, top, bottom, near, far
// camera.position.set( 5, 5, 5 ); // カメラ位置
// camera.up.set( 0, 0, 1) ; // カメラの上方向ベクトルの設定
// camera.lookAt( 0, 0, 0 ); // カメラ視点

// // Creating the Render
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight ); // 描画サイズ
// renderer.setPixelRatio( window.devicePixelRatio ); // ピクセル比
// renderer.setClearColor( 0x000000, 1.0 ); // 背景色
// renderer.setAnimationLoop( animate );
// // renderer.shadowMap.enabled = true;
// // renderer.antialias = true;
// // renderer.alpha = true;
// document.body.appendChild( renderer.domElement ); // レンダラーを配置

// // Creating the Control
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.update();

// // Creating Light

// // Creating the Object
// const axis = new THREE.AxesHelper( 5 ); // 軸オブジェクトを生成
// scene.add( axis ); // シーンにオブジェクトを追加

// const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
// const material = new THREE.MeshBasicMaterial( { color: 0xffea00 } ); // 立方体のマテリアルを作成
// // const material = new THREE.MeshNormalMaterial(); // 立方体のマテリアルを作成
// // const material = new THREE.MeshStandardMaterial( { color: 0xeeeeee } ); // 立方体のマテリアルを作成
// // const material = new THREE.MeshLambertMaterial( { color: 0xeeeeee } ); // 立方体のマテリアルを作成
// // const material = new THREE.MeshPhongMaterial( { color: 0xeeeeee } ); // 立方体のマテリアルを作成
// const cube = new THREE.Mesh( geometry, material ); // ジオメトリとマテリアルからメッシュを作成
// scene.add( cube ); // メッシュをシーンに追加

// const planeGeometry = new THREE.PlaneGeometry( 5,5 );
// const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// // plane.receiveShadow = true;
// // plane.castShadow = true;
// scene.add( plane );

const gridHelper = new THREE.GridHelper( 50,20,0xCCCCCC,0xCCCCCC );
// gridHelper.rotation.x = 0.5*Math.PI;
gridHelper.position.x = 10;
gridHelper.position.z = 1.25;
scene.add( gridHelper );

// Creating the Animation
let step_angle = 0;
let step_speed = 0;
function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

    // step_angle += options.angle;
	// cube.rotation.z = step_angle/1000;

    // step_speed += options.speed;
	// cube.position.set( 0, 0, Math.sin( step_speed/1000 ) );

	renderer.render( scene, camera ); // 画面に表示

}

// // Creating the GUI
// const gui = new dat.GUI();

// const options = {
//     Color: '#ffea00',
//     wireframe: false,
//     speed: 1,
//     angle: 1,
// };

// gui.addColor( options, 'Color' ).onChange( function( e ){
//     cube.material.color.set(e);
// });

// gui.add( options, 'wireframe' ).onChange( function( e ){
//     cube.material.wireframe = e;
// });

// gui.add( options, 'speed', 0, 100 );
// gui.add( options, 'angle', 0, 100 );

// function printlog() {

// 	console.log( window.innerWidth, window.innerHeight, window.devicePixelRatio );

// }