import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';


//crear la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);




//agregar componentes a la escena
document.body.appendChild(renderer.domElement);






//agregar un modelo de prueba
const cube = new THREE.BoxGeometry(4, 4, 4);
const cubeMat = new THREE.MeshBasicMaterial({color: 'gray'});
const cubeObj = new THREE.Mesh(cube, cubeMat);

//luces
const light = new THREE.DirectionalLight('white', 1.5);
const helper = new THREE.DirectionalLightHelper( light, 3 );
scene.add(light);
scene.add(helper);


//esto debe ser convertido a funcion y delver el modelo

//crear y agregar componentes para la escena
const elevatorUrl = new URL('./assets/models/try.glb', import.meta.url);
const loader = new GLTFLoader();
loader.load(elevatorUrl.href, (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  model.position.set(0, 0,0);
  model.scale.set(2,2,2); 

  console.log(gltf.scene);
});


//auxiliares para vista
const axisHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(30, 10);

//agregar elementeos a la escena
scene.add(axisHelper);
scene.add(gridHelper);
//agregar obj
//scene.add(cubeObj);

//modificar los objetos


//modificar la luz
light.position.set(-10, 10, 10);
light.rotation.set(45, 0, 0);


//setear controles para la escena
const controls = new OrbitControls(camera, renderer.domElement);

//modificar camara
camera.position.set(0, 8, 15);

//iniciar la escena
function animate() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


//FUNCIONES

//cargar e modelo a la escena
async function loadModel(url) {
    // Crea una instancia del FBXLoader
    const loader = new FBXLoader();

    // Carga el modelo con el método loadAsync y espera a que se resuelva
    const fbx = loader.load(url);

    // Agrega el modelo a la escena
    scene.add(fbx);
}
