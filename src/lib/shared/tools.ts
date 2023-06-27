// globals
export const

    FPS = 1000 / 60, // 1000ms/60 = 60fps
    PERCENT = 0.01


// performance helper
let debouncing: number,
    throttling: boolean

const limit = (callback: TimerHandler, {

    debounce = 0,
    throttle = 0

}): void => {

    if (throttling) return
    throttling = true

    clearTimeout(debouncing)
    setTimeout(() => {

        debouncing = setTimeout(callback, debounce)
        throttling = false

    }, throttle)
}


// random color generator
const randomColor = (): string => {

    const color = (Math.random() * (256 ** 3) | 0)
        .toString(16)
        .padStart(6, "0")

    return `#${color}`
}


// random alpha generator
const randomAlpha = (min = 0.2, max = 0.8): number => {

    return Math.random() * max + min
}


export { limit, randomAlpha, randomColor }
