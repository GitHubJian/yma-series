# Yma Chain

链式调用一系列需要执行的 Callback 的函数

## Usage

```js
const createSeries = require('yma-series');

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
        }
    )
    .call(function (ctx) {
        console.log(ctx);
    });
```
