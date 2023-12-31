import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SpotLight, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FPS, PERCENT, limit, randomColor } from '../shared/tools';
const body = document.body, renderer = new WebGLRenderer({
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true,
}), canvas = body.insertBefore(renderer.domElement, body.firstElementChild), camera = new PerspectiveCamera(50, // fov
undefined, // aspect
undefined, // near
undefined), lightPoint = new PointLight('black', // color
undefined, // intensity
undefined, // distance
undefined), lightSpot1 = new SpotLight('red', // color
0.1, // intensity
undefined, // distance
undefined, // angle
undefined, // penumbra
undefined), lightSpot2 = new SpotLight('blue', // color
0.1, // intensity
undefined, // distance
undefined, // angle
undefined, // penumbra
undefined), sceneBox = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ wireframe: true })), scene = new Scene().add(sceneBox)
    .add(lightPoint)
    .add(lightSpot1)
    .add(lightSpot2);
const viewPoint = (innerWidth + innerHeight) / 2;
renderer.setPixelRatio(devicePixelRatio);
lightPoint.position.set(0, 0, -viewPoint);
lightPoint.lookAt(0, 0, 0);
lightSpot1.position.set(-innerWidth, innerHeight, viewPoint);
lightSpot1.lookAt(0, 0, 0);
lightSpot2.position.set(innerWidth, -innerHeight, viewPoint);
lightSpot2.lookAt(0, 0, 0);
camera.position.set(0, 0, viewPoint);
/* scene.fog = new Fog('green', camera.near, camera.far) */
const point = (event) => {
    /* console.log(scene.getObjectById(objects[event.clientX][event.clientY])) */
};
const objects = [];
const generateObjects = (width, height, depth) => {
    const surface = depth * 0.0005, objectsOnX = 0 | PERCENT * width, objectsOnY = 0 | PERCENT * height, objectGeometry = new BoxGeometry(0.99 * width / objectsOnX, 0.99 * height / objectsOnY, surface);
    let x = objectsOnX;
    while (--x > 0) {
        objects[x] = [];
        let y = objectsOnY;
        while (--y > 0) {
            const mesh = new Mesh(objectGeometry.clone(), new MeshStandardMaterial({
                color: randomColor(),
                roughness: 0.4,
                metalness: 0.8,
            }));
            mesh.position.set(-0.5 * width + x / objectsOnX * width, -0.5 * height + y / objectsOnY * height, -Math.random() * surface);
            scene.add(mesh);
            objects[x][y] = mesh.id;
        }
    }
    console.log(objects);
};
let sceneX, sceneY, sceneZ, animationRequest;
const render = () => {
    animationRequest = true;
    if (sceneX !== innerWidth || sceneY !== innerHeight) {
        sceneX = innerWidth;
        sceneY = innerHeight;
        sceneZ = (sceneX + sceneY) / 2;
        sceneBox.scale.set(sceneX, sceneY, sceneZ);
        camera.aspect = sceneX / sceneY;
        camera.updateProjectionMatrix();
        renderer.setSize(sceneX, sceneY);
        /* const start = performance.now() */
        generateObjects(sceneX, sceneY, sceneZ);
        /* console.log(`${performance.now() - start | 0}ms`) */
    }
    controls.update();
    renderer.render(scene, camera);
    animationRequest = false;
};
const animate = () => {
    if (!animationRequest)
        limit(() => requestAnimationFrame(render), { throttle: FPS });
};
animate();
export { animate, point };
/* dev utility */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.addEventListener('change', animate);
