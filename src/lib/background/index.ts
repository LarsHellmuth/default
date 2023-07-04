import {BoxGeometry, Color, ConeGeometry, Fog, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Scene, SphereGeometry, SpotLight, WebGLRenderer} from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {FPS, PERCENT, limit, randomColor} from "../shared/tools"


const body = document.body,

      renderer = new WebGLRenderer({
          preserveDrawingBuffer : true,
          antialias             : true,
          alpha                 : true,
      }),

      canvas = body.insertBefore<HTMLCanvasElement>(
          renderer.domElement,
          body.firstElementChild,
      ),

      camera = new PerspectiveCamera(
          undefined, // fov
          undefined, // aspect
          undefined, // near
          9999, // far
      ),

      lightSpot = new SpotLight(
          undefined, //color
          undefined, // intensity
          undefined, // distance
          undefined, // angle
          undefined, // penumbra
          undefined, // decay
      ),

      lightPoint = new PointLight(
          undefined, //color
          0.5, // intensity
          undefined, // distance
          undefined, // decay
      ),

      sceneX = innerWidth,
      sceneY = innerHeight,
      sceneZ = (innerWidth + innerHeight) / 2,
      sceneBox = new Mesh(
          new BoxGeometry(sceneX, sceneY, sceneZ),
          new MeshBasicMaterial({wireframe: true}),
      ),

      scene = new Scene()
          .add(sceneBox)
          .add(lightSpot)
          .add(lightPoint),

      viewPoint = sceneZ * 10

renderer.setPixelRatio(devicePixelRatio)

lightSpot.position.set(0, 0, viewPoint)
/* lightPoint.position.set(0, 0, -viewPoint) */

camera.position.set(0, 0, viewPoint / 5)

/* scene.fog = new Fog("#85de6f", camera.near, camera.far) */
/* scene.background = new Color("#85de6f") */

const geometry = new BoxGeometry(2, 2, 9),

      objects:number[] = []

const generateObjects = (width:number, height:number):void => {

    const objectsOnX = 0 | PERCENT * width,
          objectsOnY = 0 | PERCENT * height,

          objectsMax = objectsOnX * objectsOnY

    let x = objectsOnX
    while (x-- > 0) {

        let y = objectsOnY
        while (y-- > 0) {

            /* if (objects.length <= objectsMax) {

                const meshId = objects.shift()
                if (meshId === undefined) return

                const object = scene.getObjectById(meshId)
                if (object === undefined) return

                scene.remove(object)
            } */


            const positionX = x / PERCENT - width / 2 /* + PERCENT / x */,
                  positionY = y / PERCENT - height / 2 /* + PERCENT / y */,
                  positionZ = sceneZ * Math.random() - sceneZ / 2,

                  material = new MeshStandardMaterial({
                      color     : randomColor(),
                      roughness : 0.4,
                      metalness : 0.6,
                  }),

                  mesh = new Mesh(geometry, material)

            mesh.position.set(positionX, positionY, positionZ)
            objects.push(mesh.id)

            scene.add(mesh)
        }
    }
}


let animationRequest:boolean,

    width:number,
    height:number

const render = ():void => limit(() =>{

    animationRequest = true

    if (innerWidth !== width || innerHeight !== height) {

        width = innerWidth
        height = innerHeight


        const start = performance.now()
        generateObjects(width, height)
        const stop = performance.now()
        console.log(`${ (PERCENT * width) * (height * PERCENT) | 0} objects created in ${stop - start | 0}ms`)


        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height, false)
    }

    controls.update()
    renderer.render(scene, camera)

    animationRequest = false

}, {throttle: FPS})


export const animate = ():void => {

    if (!animationRequest) requestAnimationFrame(render)

}; animate()


/* dev utility */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.addEventListener("change", animate)
