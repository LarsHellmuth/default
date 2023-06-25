


/* performance helper */
let throttling: boolean,
    debouncing: number

const limit = (callback: TimerHandler, { throttle = 0, debounce = 0 } = {}) => {

    if (throttling) return
    throttling = true

    clearTimeout(debouncing)
    setTimeout(() => {

        debouncing = setTimeout(callback, debounce)
        throttling = false

    }, throttle)

}



export { limit }
