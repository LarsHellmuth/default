import { BoxGeometry, CircleGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { FPS, PERCENT, limit, randomAlpha, randomColor } from "../shared/tools";
let width = innerWidth, height = innerHeight;
const seneBox = new Mesh(new BoxGeometry(width, height), new MeshBasicMaterial({ wireframe: true })), light = new PointLight(), scene = new Scene().add(light).add(seneBox), fov = undefined, aspect = width / height, camera = new PerspectiveCamera(fov, aspect), renderer = new WebGLRenderer({ alpha: true });
light.position.set(0, 0, 99);
scene.position.set(0, 0, -20);
renderer.setSize(width, height, true);
renderer.setPixelRatio(devicePixelRatio);
export { renderer };
width = 0, height = 0;
let objectsOnX = 0 | PERCENT * width, objectsOnY = 0 | PERCENT * height, objects = objectsOnX * objectsOnY;
const render = () => {
    limit(() => {
        if (width !== innerWidth || height !== innerHeight) {
            width = innerWidth, height = innerHeight;
            objectsOnX = 0 | PERCENT * width;
            objectsOnY = 0 | PERCENT * height;
            objects = objectsOnX * objectsOnY;
            let x = objectsOnX;
            while (x-- > 0) {
                let y = objectsOnY;
                while (y-- > 0)
                    sceneObjectAdd(x, y);
            }
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, true);
        }
        renderer.render(scene, camera);
    }, { throttle: FPS });
};
const sceneObjects = [], sceneObjectAdd = (x, y) => {
    const mesh = new Mesh(new CircleGeometry(0.8), new MeshStandardMaterial({
        opacity: randomAlpha(),
        color: randomColor(),
        transparent: true
    }));
    mesh.position.set(x - objectsOnX / 2 + PERCENT / x, y - objectsOnY / 2 + PERCENT / y, 1 * Math.random());
    if (sceneObjects.push(mesh.id) <= objects) {
        scene.add(mesh);
    }
    else {
        const meshId = sceneObjects.shift();
        if (meshId === undefined)
            return;
        const object = scene.getObjectById(meshId);
        if (object === undefined)
            return;
        scene.add(mesh);
        scene.remove(object);
    }
    /* console.log(sceneObjects.length) */
};
export { render };
