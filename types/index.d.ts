type TContext = Record<string, any>;
type TNext = () => void;
type TFn = (context: TContext, next: TNext) => void;

class Series {
    private context: TContext;
    private fns: Array<TFn>;
    tap: (
        rest:
            | TFn
            | Array<TFn>
            | {
                  [key: number]: TFn;
                  length: number;
              }
    ) => this | ((...rest: Array<TFn>) => this);
    call: (context: TContext) => void;
}

export default function createSeries(initContext: TContext): Series;
