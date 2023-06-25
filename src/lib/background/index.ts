import { BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three"
import { limit } from "../shared/tools"



let

    width = innerWidth,
    height = innerHeight


const

    light = new PointLight(),
    scene = new Scene().add(light)

light.position.set(0, 0, -69)


const

    fov = undefined,
    aspect = width / height,
    camera = new PerspectiveCamera(fov, aspect)


const

    renderer = new WebGLRenderer({ alpha: true })

renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(width, height, true)



export { camera, light, renderer, scene }



/* updates canvas */
const render = () => {

    limit(() => {

        if (width !== innerWidth || height !== innerHeight) {

            width = innerWidth
            height = innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setSize(width, height, true)
        }

        /* controls.update() */
        renderer.render(scene, camera)

        console.log(`rendering...`)

    }, { throttle: 1 / 60 })

}

const addObj = (x: number, y: number) => {

    const mesh = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshStandardMaterial({
            color: "grey",
            emissive: `#${(Math.random() * (256 ** 3) | 0).toString(16).padStart(6, "0")}`
        })
    )

    mesh.position.set(
        x - (width * 0.05),
        y - (height * 0.05),
        Math.ceil(Math.random() * 5) - 90)

    scene.add(mesh)

}



export { addObj, render }



/* const

    controls = new OrbitControls(camera, renderer.domElement)

controls.enablePan = false
controls.enableDamping = true
controls.target.set(0, 0, 0)
controls.addEventListener('change', render)
controls.update() */
