// global constants
export const

    FPS = 1000 / 60, // 1000ms/60 = 60fps
    PERCENT = 0.01


// performance helper
let throttling: boolean, debouncing: number
const limit = (callback: TimerHandler, { throttle = 0, debounce = 0 } = {}) => {

    if (throttling) return
    throttling = true

    clearTimeout(debouncing)
    setTimeout(() => {

        debouncing = setTimeout(callback, debounce)
        throttling = false

    }, throttle)

}


// random color generator
const randomColor = () => {

    const hex = (Math.random() * (256 ** 3) | 0)
        .toString(16)
        .padStart(6, "0")

    return `#${hex}`

}


export { limit, randomColor }
