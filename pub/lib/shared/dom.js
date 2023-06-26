import { render, renderer } from "../background/index";
const root = window, html = document.documentElement, body = document.body, canvas = body.insertBefore(renderer.domElement, body.firstElementChild);
export { canvas, root };
addEventListener("resize", render);
// test for mobile or dektop
/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i
    .test(navigator.userAgent)
    ? html.setAttribute('device', 'mobile')
    : html.setAttribute('device', 'desktop');
render();
