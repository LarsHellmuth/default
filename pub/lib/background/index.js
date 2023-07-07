import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FPS, PERCENT, limit, randomColor } from "../shared/tools";
let sceneX, sceneY, sceneZ, animationRequest;
const body = document.body, renderer = new WebGLRenderer({
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true,
}), canvas = body.insertBefore(renderer.domElement, body.firstElementChild), camera = new PerspectiveCamera(undefined, // fov
undefined, // aspect
undefined, // near
9999), 
/* lightSpot = new SpotLight(
      undefined, //color
      undefined, // intensity
      undefined, // distance
      undefined, // angle
      undefined, // penumbra
      undefined, // decay
  ), */
lightPoint = new PointLight(undefined, //color
0.5, // intensity
undefined, // distance
undefined), sceneBox = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ wireframe: true })), scene = new Scene()
    .add(sceneBox)
    /* .add(lightSpot) */
    .add(lightPoint), viewPoint = 2000;
renderer.setPixelRatio(devicePixelRatio);
/* lightSpot.position.set(0, 0, viewPoint) */
lightPoint.position.set(0, 0, viewPoint);
camera.position.set(0, 0, viewPoint);
/* scene.fog = new Fog("#85de6f", camera.near, camera.far) */
/* scene.background = new Color("#85de6f") */
const generateObjects = (width, height) => {
    const objects = [], objectsOnX = 0 | PERCENT * width, objectsOnY = 0 | PERCENT * height, objectGeometry = new BoxGeometry(width / objectsOnX, height / objectsOnY, 1);
    let x = objectsOnX;
    while (x-- > 0) {
        let y = objectsOnY;
        while (y-- > 0) {
            /* if (objects.length <= objectsMax) {

                const meshId = objects.shift()
                if (meshId === undefined) return

                const object = scene.getObjectById(meshId)
                if (object === undefined) return

                scene.remove(object)
            } */
            const positionX = x / PERCENT - width / 2 /* + PERCENT / x */, positionY = y / PERCENT - height / 2 /*  + PERCENT / y */, positionZ = 0 + sceneZ / 2 ?? sceneZ * Math.random() - sceneZ / 2, material = new MeshStandardMaterial({
                color: randomColor(),
                roughness: 0.4,
                metalness: 0.6,
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
        sceneY = innerHeight,
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
controls.addEventListener("change", animate);
