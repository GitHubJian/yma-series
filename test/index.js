const createSeries = require('../src');

createSeries({
    data: 0,
})
    .tap(
        function (ctx, next) {
            ctx.data += 1;
            next();
        },
        function (ctx, next) {
            ctx.data += 1;
            next();
        },
        function (ctx, next) {
            ctx.data += 1;
            next();
        },
    )
    .call(function (ctx) {
        console.log(ctx);
    });
