import {
    BoxGeometry,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from "three"

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const

    width = innerWidth,
    height = innerHeight


const

    light = new PointLight(),

    geometry = new BoxGeometry(),

    MaterialA = new MeshPhongMaterial({ emissive: "red" }),
    MaterialB = new MeshPhongMaterial({ wireframe: true }),
    MaterialC = new MeshPhongMaterial({ color: "blue" }),

    MeshA = new Mesh(geometry, MaterialA),
    MeshB = new Mesh(geometry, MaterialB),
    MeshC = new Mesh(geometry, MaterialC),

    scene = new Scene()

scene.add(light)
light.position.set(0, 0, 9)

scene.add(MeshA)
MeshA.position.x = -2

scene.add(MeshB)
MeshB.position.x = 0

scene.add(MeshC)
MeshC.position.x = 2


const

    fov = 20,
    aspect = width / height,
    camera = new PerspectiveCamera(fov, aspect)

camera.position.set(9, 9, 9)


const

    renderer = new WebGLRenderer({ alpha: true })

renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(width, height, true)
renderer.render(scene, camera)



const

    controls = new OrbitControls(camera, renderer.domElement)

controls.update()



export { camera, renderer, scene }
