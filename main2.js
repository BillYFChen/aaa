import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10,10,25);
camera.lookAt(2,2,2)

// Creating the Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); // 描画サイズ
renderer.setPixelRatio( window.devicePixelRatio ); // ピクセル比
renderer.setClearColor( 0xFFFFFF, 1.0 ); // 背景色
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement ); // レンダラーを配置

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// const [value_a0, value_a1, value_a2, value_a3, value_a4, text_a0] = status( 0, 10, 0, 5, 3, 6, 1, "Saul" );
// const [value_b0, value_b1, value_b2, value_b3, value_b4, text_b0] = status( 1, 8, 0, 1, 2, 5, 1, "Saul" );
// const [value_c0, value_c1, value_c2, value_c3, value_c4, text_c0] = status( 2, 5, 3, 7, 2, 2, 6, "Saul" );
// const [value_d0, value_d1, value_d2, value_d3, value_d4, text_d0] = status( 3, 2, 2, 2, 5, 2, 3, "Saul" );
// const [value_e0, value_e1, value_e2, value_e3, value_e4, text_e0] = status( 4, 1, 5, 1, 1, 1, 1, "Saul" );
const [value_a0, value_a1, value_a2, value_a3, value_a4] = status( 0, 10, 0, 5, 3, 6, 1, "Saul" );
const [value_b0, value_b1, value_b2, value_b3, value_b4] = status( 1, 8, 0, 1, 2, 5, 1, "Andy" );
const [value_c0, value_c1, value_c2, value_c3, value_c4] = status( 2, 5, 3, 7, 2, 2, 6, "Saul" );
const [value_d0, value_d1, value_d2, value_d3, value_d4] = status( 3, 2, 2, 2, 5, 2, 3, "Iwama" );
const [value_e0, value_e1, value_e2, value_e3, value_e4] = status( 4, 1, 5, 1, 1, 1, 1, "Watanabe" );
// console.log(text_a0);

// Creating the Text
function texts(texts, t0, t1, t2){
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/rounded_mplus_1c_medium_regular.json', function (font) {
    const textGeometry = new TextGeometry(texts, {font: font, size: 0.5, depth: 0.01, });
    textGeometry.computeBoundingBox();
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
    const textMesh = new THREE.Mesh( textGeometry, textMaterial );
    textMesh.castShadow = true
    textMesh.position.set( t0, t1, t2 )
    scene.add( textMesh );

    // const group = new THREE.Group();
    // group.add( textMesh )
    // scene.add( group );
    // console.log( group );
    // return group;

});
};

renderer.render( scene, camera );

function status( z, y, s0, s1, s2, s3, s4, owner ) {
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
    box1.position.set(s0+s1/2,0,z*dis);
    scene.add( box1 );

	const geo2 = new THREE.BoxGeometry( s2, height, thick );
    const mat2 = new THREE.MeshBasicMaterial( { color: 0xE389B9, opacity: opacity, transparent: true } );
    const box2 = new THREE.Mesh( geo2, mat2 );
    box2.position.set(s0+s1+s2/2,0,z*dis);
    scene.add( box2 );

	const geo3 = new THREE.BoxGeometry( s3, height, thick );
    const mat3 = new THREE.MeshBasicMaterial( { color: 0x746AB0, opacity: opacity, transparent: true } );
    const box3 = new THREE.Mesh( geo3, mat3 );
    box3.position.set(s0+s1+s2+s3/2,0,z*dis);
    scene.add( box3 );

	const geo4 = new THREE.BoxGeometry( s4, height, thick );
    const mat4 = new THREE.MeshBasicMaterial( { color: 0x288BA8, opacity: opacity, transparent: true } );
    const box4 = new THREE.Mesh( geo4, mat4 );
    box4.position.set(s0+s1+s2+s3+s4/2,0,z*dis);
    scene.add( box4 );

    // const txt = texts( owner, 0.5 + s0 + s1 + s2 + s3 + s4, z*dis );
    // const txt1 = 
    texts( owner, 0.5 + s0 + s1 + s2 + s3 + s4, 0, z*dis, 0 );
    texts( "$"+y.toString()+"M", -2, y, z*dis, 0 );

    return [box0, box1, box2, box3, box4];
};

const gridHelper = new THREE.GridHelper( 50,20,0xCCCCCC,0xCCCCCC );
gridHelper.position.x = 10;
gridHelper.position.z = 1.25;
scene.add( gridHelper );

// Creating the Animation
function animate() {
    value_a0.scale.x = options.scalex;
    value_b0.scale.x = options.scalex;
    value_c0.scale.x = options.scalex;
    value_d0.scale.x = options.scalex;
    value_e0.scale.x = options.scalex;
    value_a0.position.x = -options.scalex/2;
    value_b0.position.x = -options.scalex/2;
    value_c0.position.x = -options.scalex/2;
    value_d0.position.x = -options.scalex/2;
    value_e0.position.x = -options.scalex/2;
    value_a0.scale.z = options.scaley;
    value_a1.scale.z = options.scaley;
    value_a2.scale.z = options.scaley;
    value_a3.scale.z = options.scaley;
    value_a4.scale.z = options.scaley;
    value_b0.scale.z = options.scaley;
    value_b1.scale.z = options.scaley;
    value_b2.scale.z = options.scaley;
    value_b3.scale.z = options.scaley;
    value_b4.scale.z = options.scaley;
    value_c0.scale.z = options.scaley;
    value_c1.scale.z = options.scaley;
    value_c2.scale.z = options.scaley;
    value_c3.scale.z = options.scaley;
    value_c4.scale.z = options.scaley;
    value_d0.scale.z = options.scaley;
    value_d1.scale.z = options.scaley;
    value_d2.scale.z = options.scaley;
    value_d3.scale.z = options.scaley;
    value_d4.scale.z = options.scaley;
    value_e0.scale.z = options.scaley;
    value_e1.scale.z = options.scaley;
    value_e2.scale.z = options.scaley;
    value_e3.scale.z = options.scaley;
    value_e4.scale.z = options.scaley;
    value_b0.position.z = 1*2.5*options.scaled;
    value_b1.position.z = 1*2.5*options.scaled;
    value_b2.position.z = 1*2.5*options.scaled;
    value_b3.position.z = 1*2.5*options.scaled;
    value_b4.position.z = 1*2.5*options.scaled;
    value_c0.position.z = 2*2.5*options.scaled;
    value_c1.position.z = 2*2.5*options.scaled;
    value_c2.position.z = 2*2.5*options.scaled;
    value_c3.position.z = 2*2.5*options.scaled;
    value_c4.position.z = 2*2.5*options.scaled;
    value_d0.position.z = 3*2.5*options.scaled;
    value_d1.position.z = 3*2.5*options.scaled;
    value_d2.position.z = 3*2.5*options.scaled;
    value_d3.position.z = 3*2.5*options.scaled;
    value_d4.position.z = 3*2.5*options.scaled;
    value_e0.position.z = 4*2.5*options.scaled;
    value_e1.position.z = 4*2.5*options.scaled;
    value_e2.position.z = 4*2.5*options.scaled;
    value_e3.position.z = 4*2.5*options.scaled;
    value_e4.position.z = 4*2.5*options.scaled;
    // text_a0.position.z = 4*2.5*options.scaled;
    // text_b0.position.z = 4*2.5*options.scaled;
    // text_c0.position.z = 4*2.5*options.scaled;
    // text_d0.position.z = 4*2.5*options.scaled;
    // text_e0.position.z = 4*2.5*options.scaled;

 	renderer.render( scene, camera ); // 画面に表示
}

// Creating the GUI
const gui = new dat.GUI();
const options = {
    scalex: 1,
    scaley: 1,
    scaled: 1,
};
gui.add( options, 'scalex', 0.01, 2.0 );
gui.add( options, 'scaley', 0.01, 2.0 );
gui.add( options, 'scaled', 0.01, 2.0 );


