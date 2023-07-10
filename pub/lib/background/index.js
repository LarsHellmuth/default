import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SpotLight, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FPS, PERCENT, limit, randomColor } from '../shared/tools';
const body = document.body, renderer = new WebGLRenderer({
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true,
}), canvas = body.insertBefore(renderer.domElement, body.firstElementChild), camera = new PerspectiveCamera(undefined, // fov
undefined, // aspect
undefined, // near
9999), lightSpot = new SpotLight('red', // color
0.2, // intensity
undefined, // distance
undefined, // angle
undefined, // penumbra
undefined), lightPoint = new PointLight('blue', // color
0.2, // intensity
undefined, // distance
undefined), sceneBox = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ wireframe: true })), scene = new Scene()
    .add(sceneBox)
    .add(lightSpot)
    .add(lightPoint), viewPoint = 1100;
renderer.setPixelRatio(devicePixelRatio);
camera.position.set(0, 0, viewPoint);
lightSpot.position.set(-innerWidth, innerHeight, viewPoint);
lightSpot.lookAt(0, 0, 0);
lightPoint.position.set(innerWidth, -innerHeight, viewPoint);
lightPoint.lookAt(0, 0, 0);
let sceneX, sceneY, sceneZ, animationRequest;
const generateObjects = (width, height) => {
    const objects = [], objectsOnX = 0 | PERCENT * width, objectsOnY = 0 | PERCENT * height, objectsMax = objectsOnX * objectsOnY, objectGeometry = new BoxGeometry(0.99 * width / objectsOnX, 0.99 * height / objectsOnY, 99);
    let x = objectsOnX;
    while (--x > 0) {
        let y = objectsOnY;
        while (--y > 0) {
            if (objectsMax < objects.length) {
                const meshId = objects.shift();
                if (meshId === undefined)
                    return;
                const object = scene.getObjectById(meshId);
                if (object === undefined)
                    return;
                scene.remove(object);
                scene.clear();
            }
            const positionX = -0.5 * objectsOnX / PERCENT + x / objectsOnX * width, positionY = -0.5 * objectsOnY / PERCENT + y / objectsOnY * height, positionZ = -sceneZ / 2 + Math.random() * 99, material = new MeshStandardMaterial({
                color: randomColor(),
                roughness: 0.4,
                metalness: 0.8,
            }), mesh = new Mesh(objectGeometry, material);
            mesh.position.set(positionX, positionY, positionZ);
            objects.push(mesh.id);
            scene.add(mesh);
        }
    }
};
const render = () => {
    animationRequest = true;
    if (sceneX !== innerWidth || sceneY !== innerHeight) {
        sceneX = innerWidth;
        sceneY = innerHeight;
        sceneZ = (sceneX + sceneY) / 2;
        /* const start = performance.now() */
        generateObjects(sceneX, sceneY);
        /* console.log(`${performance.now() - start | 0}ms`) */
        sceneBox.scale.set(sceneX, sceneY, sceneZ);
        camera.aspect = sceneX / sceneY;
        camera.updateProjectionMatrix();
        renderer.setSize(sceneX, sceneY, false);
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
export { animate };
/* dev utility */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.addEventListener('change', animate);
