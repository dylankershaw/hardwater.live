var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var raycaster = new THREE.Raycaster();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(2, 2, 2);
var cubeMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.95, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.95, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.95, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.95, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.95, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.95, side: THREE.DoubleSide }),
];
var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

function onDocumentMouseDown(event) {
  var vector = new THREE.Vector3(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  vector.unproject(camera);
  raycaster.set(camera.position, vector.sub(camera.position).normalize());

  var intersects = raycaster.intersectObject(cube);
  if (intersects.length > 0) {
    var index = Math.floor(intersects[0].faceIndex / 2);
    switch (index) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        console.log(index);
    }
  }
}

animate();

document.addEventListener('mousedown', onDocumentMouseDown);
