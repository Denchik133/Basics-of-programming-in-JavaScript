const FP = (function () {
    function curry(fn, arity = fn.length) {
        return function curried(...args) {
            if (args.length >= arity) {
                return fn.apply(this, args)
            }
            return function (...next) {
                return curried.apply(this, args.concat(next))
            }
        }
    }
    function compose(...fns) {
        return function (value) {
            return fns.reduceRight((acc, fn) => fn.call(this, acc), value)
        }
    }
    function pipe(...fns) {
        return function (value) {
            return fns.reduce((acc, fn) => fn.call(this, acc), value)
        }
    }
    function partial(fn, ...preset) {
        return function (...later) {
            return fn.apply(this, preset.concat(later))
        }
    }
    function flip(fn) {
        return function (...args) {
            return fn.apply(this, args.reverse())
        }
    }
    function tap(fn) {
        return function (value) {
            fn(value)
            return value
        }
    }
    function memoize(fn) {
        const cache = new Map()
        return function (...args) {
            const key = JSON.stringify(args)
            if (cache.has(key)) {
                return cache.get(key)
            }
            const result = fn.apply(this, args)
            cache.set(key, result)
            return result
        }
    }
    return {
        curry,
        compose,
        pipe,
        partial,
        flip,
        tap,
        memoize
    }
})()

function runDemo() {
    const out = document.getElementById("output")
    let text = ""
    const add = (a, b, c) => a + b + c
    const curriedAdd = FP.curry(add)
    text += "Curry:\n"
    text += curriedAdd(1)(2)(3) + "\n\n"
    const multiply = (x) => x * 2
    const square = (x) => x * x
    const pipeline = FP.pipe(
        multiply,
        FP.tap(x => console.log("After multiply:", x)),
        square
    )
    text += "Pipe:\n"
    text += pipeline(3) + "\n\n"
    const sum = (a, b) => a + b
    const add10 = FP.partial(sum, 10)
    text += "Partial:\n"
    text += add10(5) + "\n\n"
    const divide = (a, b) => a / b
    const flippedDivide = FP.flip(divide)
    text += "Flip:\n"
    text += flippedDivide(2, 10) + "\n\n"
    const slowFib = FP.memoize(function fib(n) {
        if (n <= 1) return n
        return fib(n - 1) + fib(n - 2)
    })
    text += "Memoize (fib 10):\n"
    text += slowFib(10) + "\n\n"
    text += "Compare:\n"
    text += "FP toolkit ~ Ramda/Lodash (curry, pipe, compose)\n"
    out.textContent = text
}