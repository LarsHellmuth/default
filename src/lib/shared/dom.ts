import { render } from "../background/index"


addEventListener("resize", render)


// test for mobile or dektop
const html = document.documentElement;
/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i
    .test(navigator.userAgent)
    ? html.setAttribute('device', 'mobile')
    : html.setAttribute('device', 'desktop')


render()