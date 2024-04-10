// 先防抖，后触发
// export const debounce = (func, wait) => {
//     let timer
//     return (...args) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             func.apply(this, args)
//         }, wait)
//     }
// }

// 先触发，后防抖
export const debounce = (func, wait) => {
    let timer = null
    let canCall = true

    return (...args) => {
        if (canCall) {
            canCall = false
            func.apply(this, args)
        } else {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            canCall = true
        }, wait)
    }
}

const useDebounce = (fn, wait) => {
    return debounce(fn, wait)
}

export default useDebounce