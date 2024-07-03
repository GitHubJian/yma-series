const compose = require('./compose');

function isFunction(v) {
    return typeof v === 'function';
}

function isArray(v) {
    return Array.isArray(v);
}

function isArrayLike(v) {
    function isLength(v) {
        let MAX_SAFE_INTEGER = 9007199254740991; // Number.MAX_SAFE_INTEGER
        return typeof v === 'number' && v > -1 && v % 1 == 0 && v < MAX_SAFE_INTEGER;
    }

    return v != null && typeof v !== 'function' && isLength(v.length);
}

function Series(initContext) {
    this.context = initContext;
    this.fns = [];
}

Series.prototype.$chain = function $chain(fn) {
    const that = this;

    if (!(isArray(fn) || isArrayLike(fn))) {
        if (!isFunction(fn)) {
            throw new TypeError('fn must be a function!');
        }

        this.fns.push(fn);
    } else {
        for (let i = 0, len = fn.length; i < len; i++) {
            that.$chain(fn[i]);
        }
    }
};

Series.prototype.tap = function tap() {
    // TODO arguments is Series
    const that = this;

    let rest = Array.prototype.slice.call(arguments);
    if (rest.length > 0) {
        that.$chain(rest);
    }

    return this;
};

Series.prototype.call = function call(callback) {
    const that = this;

    const main = compose(this.fns);
    main(that.context, function () {
        callback(that.context);
    });
};

function createSeries(state = {}) {
    return new Series(state);
}

createSeries.Series = Series;

module.exports = createSeries;
