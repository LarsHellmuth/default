import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three"
import { FPS, PERCENT, limit } from "../shared/tools"


let

    width = innerWidth,
    height = innerHeight,

    cubesOnX = 0 | PERCENT * width,
    cubesOnY = 0 | PERCENT * height


const

    seneBox = new Mesh(
        new BoxGeometry(width, height),
        new MeshBasicMaterial({ wireframe: true })),

    light = new PointLight(),
    scene = new Scene().add(light).add(seneBox),

    fov = undefined, aspect = width / height,
    camera = new PerspectiveCamera(fov, aspect),

    renderer = new WebGLRenderer({ alpha: true })

export { renderer }


light.position.set(0, 0, 4)
scene.position.set(0, 0, -20)

renderer.setSize(width, height, true)
renderer.setPixelRatio(devicePixelRatio)


const render = (): void => {

    limit(() => {

        if (width !== innerWidth || height !== innerHeight) {

            cubesOnX = width = innerWidth
            cubesOnY = height = innerHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setSize(width, height, true)
        }

        limit(() => {

            let x = cubesOnX
            while (x-- > 0) {

                let y = cubesOnY
                while (y-- > 0)

                    sceneObjectAdd(x, y)
            }

        }, { debounce: FPS / 0.5 })

        console.log(`rendering...`)
        renderer.render(scene, camera)

    }, { throttle: FPS })

    /* console.log(scene) */
}


const

    sceneObjects: number[] = [],
    sceneObjectsMax = cubesOnX * cubesOnY,

    sceneObjectAdd = (x: number, y: number): void => {

        const mesh = new Mesh(
            new BoxGeometry(0.9, 0.9),
            new MeshStandardMaterial({ /* color: randomColor() */ })
        )

        mesh.position.set(
            x - cubesOnX / 2 + PERCENT / x,
            y - cubesOnY / 2 + PERCENT / y,
            2 * Math.random()
        )

        if (sceneObjects.push(mesh.id) <= sceneObjectsMax) {

            scene.add(mesh)

        } else {

            const meshId: undefined | number = sceneObjects.shift()
            if (meshId === undefined) return

            const object: undefined | Object3D = scene.getObjectById(meshId)
            if (object === undefined) return

            scene.add(mesh)
            scene.remove(object)
        }
    }


export { render }
