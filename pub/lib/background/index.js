import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FPS, PERCENT, limit, randomColor } from "../shared/tools";
const body = document.body, renderer = new WebGLRenderer({
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true
}), canvas = body.insertBefore(renderer.domElement, body.firstElementChild), camera = new PerspectiveCamera(undefined, // fov
undefined, // aspect
undefined, // near
undefined // far
), light = new PointLight(undefined, //color
undefined, // intensity
undefined, // distance
undefined // decay
), seneBox = new Mesh(new BoxGeometry(innerWidth, innerHeight, 0), new MeshBasicMaterial({ wireframe: true })), scene = new Scene()
    .add(seneBox)
    .add(light), controls = new OrbitControls(camera, canvas);
renderer.setPixelRatio(devicePixelRatio);
camera.position.set(0, 0, (camera.fov * (innerHeight / innerWidth)) * 0.8);
camera.lookAt(0, 0, 0);
light.position.z = 9;
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();
let width, height, objectsOnX, objectsOnY, objectsMax;
const render = () => {
    limit(() => {
        if (innerWidth !== width || innerHeight !== height) {
            width = innerWidth;
            height = innerHeight;
            objectsOnX = 0 | PERCENT * width;
            objectsOnY = 0 | PERCENT * height;
            objectsMax = objectsOnX * objectsOnY;
            let x = objectsOnX;
            while (x-- > 0) {
                let y = objectsOnY;
                while (y-- > 0)
                    addObject(x, y);
            }
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        }
        renderer.render(scene, camera);
    }, { throttle: FPS });
};
const objects = [], addObject = (x, y) => {
    const mesh = new Mesh(new SphereGeometry(0.4), new MeshStandardMaterial({
        /* transparent: true, */
        /* opacity: randomAlpha(), */
        emissive: randomColor(),
        color: "salmon",
        roughness: 0.8,
        metalness: 0.2
    }));
    mesh.position.set(x - objectsOnX / 2 + PERCENT / x, y - objectsOnY / 2 + PERCENT / y, 9 * Math.random());
    if (objects.push(mesh.id) <= objectsMax) {
        scene.add(mesh);
    }
    else {
        const meshId = objects.shift();
        if (meshId === undefined)
            return;
        const object = scene.getObjectById(meshId);
        if (object === undefined)
            return;
        scene.add(mesh);
        scene.remove(object);
    }
};
export { render };
controls.addEventListener('change', render);
addEventListener("resize", () => {
    console.log("children:" + scene.children.length);
    console.log(" objects:" + objects.length);
});
