import * as THREE from 'three';

const red = 0xff0000;
const orange = 0xffa500;
const yellow = 0xffff00;
const green = 0x00ff00;
const blue = 0x0000ff;
const purple = 0x4b0082;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10,10,70);
camera.lookAt(2,2,2)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

status( 0, 10, 5, 3, 6, 1 );
status( 1, 8, 1, 2, 5, 1 );
status( 2, 5, 7, 2, 2, 6 );
status( 3, 2, 2, 5, 2, 3 );
status( 4, 1, 1, 1, 1, 1 );

renderer.render( scene, camera );

function status(z, y, s1, s2, s3, s4 ) {
    const opacity = 0.85;
    const dis = 50;

	const geo1 = new THREE.BoxGeometry( s1, y, 0.1 );
    const mat1 = new THREE.MeshBasicMaterial( { color: red, opacity: opacity, transparent: true } );
    const box1 = new THREE.Mesh( geo1, mat1 );
    box1.position.set(s1/2,y/2,z+dis);
    scene.add( box1 );

	const geo2 = new THREE.BoxGeometry( s2, y, 0.1 );
    const mat2 = new THREE.MeshBasicMaterial( { color: blue, opacity: opacity, transparent: true } );
    const box2 = new THREE.Mesh( geo2, mat2 );
    box2.position.set(s1+s2/2,y/2,z+dis);
    scene.add( box2 );

	const geo3 = new THREE.BoxGeometry( s3, y, 0.1 );
    const mat3 = new THREE.MeshBasicMaterial( { color: yellow, opacity: opacity, transparent: true } );
    const box3 = new THREE.Mesh( geo3, mat3 );
    box3.position.set(s1+s2+s3/2,y/2,z+dis);
    scene.add( box3 );

	const geo4 = new THREE.BoxGeometry( s4, y, 0.1 );
    const mat4 = new THREE.MeshBasicMaterial( { color: purple, opacity: opacity, transparent: true } );
    const box4 = new THREE.Mesh( geo4, mat4 );
    box4.position.set(s1+s2+s3+s4/2,y/2,z+dis);
    scene.add( box4 );


}
