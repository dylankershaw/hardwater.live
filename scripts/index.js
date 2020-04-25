const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const raycaster = new THREE.Raycaster();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const images = [
  'images/soulseek.jpeg',
  'images/vhf.jpg',
  'images/vhf2.jpg',
  'images/cruise.png',
  'images/onesies.png',
  'images/avocado.png',
];
const geometry = new THREE.CubeGeometry(2, 2, 2);
const textures = images.map((i) => new THREE.TextureLoader().load(i));
const cubeMaterials = textures.map((t) => new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide }));
const cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
const cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

function onDocumentMouseDown(event) {
  const vector = new THREE.Vector3(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  vector.unproject(camera);
  raycaster.set(camera.position, vector.sub(camera.position).normalize());

  const intersects = raycaster.intersectObject(cube);
  if (intersects.length > 0) {
    const index = Math.floor(intersects[0].faceIndex / 2);
    switch (index) {
      case 0:
        window.open('https://www.hardwater.live/pathway', '_blank'); // ss
        break;
      case 1:
        window.open('https://www.hardwater.live/events/vhf-1', '_blank'); // vhf
        break;
      case 2:
        window.open('https://www.hardwater.live/events/vhf-2', '_blank'); // vhf2
        break;
      case 3:
        window.open('https://www.hardwater.live/events/current', '_blank'); // cruise
        break;
      case 4:
        window.open('https://www.hardwater.live/events/woofers-and-onesies', '_blank'); // onesie
        break;
      case 5:
        window.open('https://www.hardwater.live/events/avocado-trance', '_blank'); // avocado
        break;
    }
  }
}

animate();

document.addEventListener('mousedown', onDocumentMouseDown);
