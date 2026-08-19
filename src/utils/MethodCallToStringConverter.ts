import {Matcher} from "../matcher/type/Matcher";
import {MethodAction} from "../MethodAction";
import {MethodToStub} from "../MethodToStub";
import safeJsonStringify from "safe-json-stringify";

export class MethodCallToStringConverter {
    public convert(method: MethodToStub): string {
        const stringifiedMatchers = method.matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
        return `${method.name}(${stringifiedMatchers})" `;
    }

    public convertMatchers(methodName: string, matchers: Matcher[]): string {
        const stringifiedMatchers = matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
        return `${methodName}(${stringifiedMatchers})`;
    }

    public convertActualCalls(calls: MethodAction[]): string[] {
        return calls.map(call => {
            const methodName = call.methodName;
            const args = call.args.map(arg => this.stringifyArg(arg));
            return `${methodName}(${args.join(', ')})`;
        });
    }

    private stringifyArg(arg: any): string {
        if (arg === null) {
            return "null";
        }
        if (arg === undefined) {
            return "undefined";
        }
        return this.objectIsStringable(arg) ? arg.toString() : safeJsonStringify(arg);
    }

    private objectIsStringable(arg) {
        return typeof arg !== 'object' || Object.prototype.hasOwnProperty.call(arg, 'toString');
    }
}
