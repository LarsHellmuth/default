import { addObj, render, renderer } from "../background/index";
const root = window, html = document.documentElement, body = document.body, main = body.querySelector("main"), header = body.querySelector("header"), footer = body.querySelector("footer"), canvas = body.insertBefore(renderer.domElement, body.firstElementChild), canvasWidth = canvas.offsetWidth, canvasHeight = canvas.offsetHeight;
export { footer, header, main, root };
addEventListener("load", () => {
    /* mobile / dektop detection */
    /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i
        .test(navigator.userAgent)
        ? html.setAttribute('device', 'mobile')
        : html.setAttribute('device', 'desktop');
    let x = canvasWidth * 0.1 | 0;
    while (x-- > 0) {
        let y = canvasHeight * 0.1 | 0;
        while (y-- > 0)
            addObj(x, y);
    }
    render();
});
/* addEventListener("wheel", event => {

    limit(() => {

        if (event.deltaX > 0) camera.position.x += 8
        if (event.deltaX < 0) camera.position.x -= 8
        if (event.deltaY > 0) camera.position.y += 4
        if (event.deltaY < 0) camera.position.y -= 4
        if (event.deltaZ > 0) camera.position.z += 2
        if (event.deltaZ < 0) camera.position.z -= 2

        if (event.deltaX > 0) light.position.x += 1
        if (event.deltaX < 0) light.position.x -= 1
        if (event.deltaY > 0) light.position.y += 1
        if (event.deltaY < 0) light.position.y -= 1
        if (event.deltaZ > 0) light.position.z += 1
        if (event.deltaZ < 0) light.position.z -= 1

        render()

    }, { throttle: 0 })

}) */
