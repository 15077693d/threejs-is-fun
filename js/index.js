// Option 1: Import the entire three.js core library.
import * as THREE from "../node_modules/three/build/three.module.js"
import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const controls = new OrbitControls( camera, renderer.domElement );

var mtlLoader = new MTLLoader()
console.log(mtlLoader)
mtlLoader.setPath('../asset/')
mtlLoader.load("r2-d2.mtl", function(material){
    material.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(material);
    objLoader.setPath("../asset/")
    objLoader.load("r2-d2.obj", function(object){
        scene.add(object);
        object.position.y -=60;
    })
})

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xfffffff,wireframe:true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();
