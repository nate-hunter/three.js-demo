import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg',)
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// camera.position.setX(-3);

renderer.render(scene, camera);

// ++++ Display an object to the screen ++++

// const geometry = new THREE.IcosahedronGeometry(10);
// const geometry = new THREE.TetrahedronGeometry(10);
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xf99595, wireframe: true });
const material = new THREE.MeshStandardMaterial({ color: 0xf99595 });  // Needs lighting
const geoShape = new THREE.Mesh(geometry, material);

scene.add(geoShape);

// ++++ Lighting ++++
const pointLight = new THREE.PointLight(0x6A5ACD);
pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// const ambientLight = new THREE.AmbientLight(0x6A5ACD);
const ambientLight = new THREE.AmbientLight(0xffffff);
// const ambientLight = new THREE.AmbientLight(0xFFF0F5);
scene.add(pointLight, ambientLight);

// ++++ Helpers ++++
// const lighthelper = new THREE.PointLightHelper(pointLight);
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(lighthelper, gridhelper);  // Displays where the light is pointed and where the grid is divided

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFB3FF })
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(700).fill().forEach(addStar);

const bgTexture = new THREE.TextureLoader().load('./images/hi-mtn-01.jpg');
scene.background = bgTexture;

// ++++ Texture ++++
const imgTexture = new THREE.TextureLoader().load('./images/lighthouse-01.jpg');
const litehouse = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: imgTexture }));
scene.add(litehouse);

litehouse.position.z = -5;
litehouse.position.x = 2;

// ++++ Scroll Animation ++++
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    litehouse.rotation.y += 0.01;
    litehouse.rotation.z += 0.01;

    camera.position.z = t * 0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
    requestAnimationFrame(animate);

    geoShape.rotation.x += 0.01;
    geoShape.rotation.y += 0.005;
    geoShape.rotation.z += 0.01;

    litehouse.rotation.x += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

animate();

