import {animate} from "../background/index"


addEventListener("resize", animate)


//  check if device is mobile or dektop

//  "navigator.userAgentData.mobile" is the prefered way to check for mobile
//  devices but due to the experimental state of the feture regex is used to
//  check the userAgent

const html = document.documentElement;
/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i
    .test(navigator.userAgent)
    ? html.setAttribute("device", "mobile")
    : html.setAttribute("device", "desktop")