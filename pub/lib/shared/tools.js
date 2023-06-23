/* performance helper */
let throttling, debouncing;
const limit = (callback, { throttle = 0, debounce = 0 } = {}) => {
    if (throttling)
        return;
    throttling = true;
    clearTimeout(debouncing);
    setTimeout(() => {
        debouncing = setTimeout(callback, debounce);
        throttling = false;
    }, throttle);
};
export { limit };
