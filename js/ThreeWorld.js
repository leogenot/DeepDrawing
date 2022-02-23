function ThreeWorld(obj) {
  destroyAllThreeScene()
  obj = obj || {};
  var container = obj.container || document.querySelector('body'),
    w = container.clientWidth,
    h = container.clientHeight,
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, w / h, 0.001, 10000),
    controls = new THREE.TrackballControls(camera, container),
    renderConfig = { antialias: true, alpha: true },
    renderer
  //controls.target = new THREE.Vector3(0, 0, 0.75);
  renderer = new THREE.WebGLRenderer(renderConfig);
  camera.position.set(0, 0, -150);
  controls.target.set(0, 0, 0);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.noPan = true;

  controls.keys = ['KeyA', 'KeyS', 'KeyD'];
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);
  renderer.domElement.id = 'three_canvas';

  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  })

  function render() {

    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  function destroyAllThreeScene() {
    renderer = null;
    scene = null;
    projector = null;
    camera = null;
    controls = null;

  }



  this.camera = camera;
  this.controls = controls;
  this.renderer = renderer;
  this.scene = scene;
  this.render = render;
}