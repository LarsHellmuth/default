import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { FPS, PERCENT, limit, randomColor } from "../shared/tools"


let width = innerWidth,
    height = innerHeight


const

    body = document.body,

    seneBox = new Mesh(
        new BoxGeometry(width, height, 0),
        new MeshBasicMaterial({ wireframe: true })
    ),

    light = new PointLight(
        "white", //color
        1, // intensity
        0, // distance
        2  // decay
    ),

    scene = new Scene()
        .add(seneBox)
        .add(light),

    renderer = new WebGLRenderer({ alpha: true }),
    canvas = body.insertBefore(renderer.domElement, body.firstElementChild),
    camera = new PerspectiveCamera(50),
    controls = new OrbitControls(camera, canvas)


light.position.set(0, 0, 9)

camera.position.set(0, 0, 10)
camera.lookAt(0, 0, 0)

renderer.setSize(width, height, true)
renderer.setPixelRatio(devicePixelRatio)


width = 0, height = 0

let objectsOnX = 0 | PERCENT * width,
    objectsOnY = 0 | PERCENT * height,

    objectsMax = objectsOnX * objectsOnY

const render = (): void => {

    limit(() => {

        if (width !== innerWidth || height !== innerHeight) {

            width = innerWidth, height = innerHeight

            objectsOnX = 0 | PERCENT * width
            objectsOnY = 0 | PERCENT * height

            objectsMax = objectsOnX * objectsOnY

            let x = objectsOnX
            while (x-- > 0) {

                let y = objectsOnY
                while (y-- > 0)

                    addObject(x, y)
            }

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setSize(width, height, true)
        }

        controls.update()

        renderer.render(scene, camera)
        console.log(camera.aspect)

    }, { throttle: FPS })
}


const

    objects: number[] = [],

    addObject = (x: number, y: number): void => {

        const mesh = new Mesh(
            new SphereGeometry(0.4),
            new MeshStandardMaterial({
                /* transparent: true, */
                /* opacity: randomAlpha(), */
                emissive: randomColor(),
                color: "pink",
                roughness: 0.6,
                metalness: 0.2
            })
        )

        mesh.position.set(
            x - objectsOnX / 2 + PERCENT / x,
            y - objectsOnY / 2 + PERCENT / y,
            0 * Math.random()
        )

        if (objects.push(mesh.id) <= objectsMax) {

            scene.add(mesh)

        } else {

            const meshId = objects.shift()
            if (meshId === undefined) return

            const object = scene.getObjectById(meshId)
            if (object === undefined) return

            /* scene.add(mesh) */
            scene.remove(object)
        }
    }


export { render }


addEventListener("resize", () => {
    console.log("children:" + scene.children.length)
    console.log(" objects:" + objects.length)
})