import { camera, renderer, scene } from "../background/index"
import { limit } from "./tools"



export const

    root = window,

    html = document.documentElement,
    body = document.body,
    main = body.querySelector("main"),
    header = body.querySelector("header"),
    footer = body.querySelector("footer"),

    canvas = body.insertBefore(renderer.domElement, body.firstElementChild)


let

    width = innerWidth,
    height = innerHeight;


/* mobile / dektop detection */
/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i
    .test(navigator.userAgent)
    ? html.setAttribute('device', 'mobile')
    : html.setAttribute('device', 'desktop')


addEventListener("wheel", event => {

    limit(() => {

        if (event.deltaX > 0) camera.position.x += 1
        if (event.deltaX < 0) camera.position.x -= 1
        if (event.deltaY > 0) camera.position.y += 1
        if (event.deltaY < 0) camera.position.y -= 1
        if (event.deltaZ > 0) camera.position.z += 1
        if (event.deltaZ < 0) camera.position.z -= 1

    }, { throttle: 40 })

    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
})


addEventListener("resize", () => {

    limit(() => {

        if (width !== innerWidth || height !== innerHeight) {

            width = innerWidth
            height = innerHeight

            renderer.setSize(width, height, true)
        }

    }, { debounce: 200 })

})


addEventListener("beforeunload", () => {

    sessionStorage.data = JSON.stringify({})

})
