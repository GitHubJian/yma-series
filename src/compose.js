function compose(callbacks) {
    if (!Array.isArray(callbacks)) {
        throw new TypeError('Callbacks stack must be an array!');
    }

    for (let i = 0; i < callbacks.length; i++) {
        const fn = callbacks[i];

        if (typeof fn !== 'function') {
            throw new TypeError('Callbacks must be composed of functions!');
        }
    }

    return function (context, next) {
        let index = -1;

        function dispatch(i) {
            if (i <= index) {
                throw new Error('next() called multiple times');
            }

            index = i;
            let fn = callbacks[i];
            if (i === callbacks.length) {
                fn = next;
            }

            // TODO fn not found, error
            fn(context, dispatch.bind(null, i + 1));
        }

        return dispatch(0);
    };
}

module.exports = compose;
