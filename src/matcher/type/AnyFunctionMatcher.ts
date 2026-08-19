import _ from "lodash";
import {Matcher} from "./Matcher";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- matches any function shape, which is what the matcher checks for
export class AnyFunctionMatcher<T extends Function = Function> extends Matcher<T> {
    constructor() {
        super();
    }

    public match(value: T): boolean {
        return _.isFunction(value);
    }

    public toString(): string {
        return "anyFunction()";
    }
}
