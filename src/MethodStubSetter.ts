import {MethodToStub} from "./MethodToStub";
import {CallFunctionMethodStub} from "./stub/CallFunctionMethodStub";
import {RejectPromiseMethodStub} from "./stub/RejectPromiseMethodStub";
import {ResolvePromiseMethodStub} from "./stub/ResolvePromiseMethodStub";
import {ReturnValueMethodStub} from "./stub/ReturnValueMethodStub";
import {ThrowErrorMethodStub} from "./stub/ThrowErrorMethodStub";

/**
 * Fluent builder returned by {@link when}, used to configure the behavior of a stubbed mock
 * method call (or getter). Each `then*` call adds one more behavior to a queue; when the mocked
 * method is called more times than behaviors were queued, the last one repeats indefinitely.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- RejectType is part of the public generic API shape, kept for consumers who reference it explicitly
export class MethodStubSetter<T, ResolveType = void, RejectType = Error> {
    private static globalGroupIndex: number = 0;
    private groupIndex: number;

    constructor(private methodToStub: MethodToStub) {
        this.groupIndex = ++MethodStubSetter.globalGroupIndex;
    }

    /**
     * Makes the stubbed call return the given value(s). Passing multiple values queues one
     * behavior per call, e.g. `.thenReturn('one', 'two')` returns `'one'` on the first matching
     * call and `'two'` on every call after that.
     *
     * @param rest the value(s) to return
     */
    public thenReturn(...rest: T[]): this {
        this.convertToPropertyIfIsNotAFunction();
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new ReturnValueMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    /**
     * Makes the stubbed call throw the given error(s) instead of returning a value.
     *
     * @param rest the error(s) to throw
     */
    public thenThrow(...rest: Error[]): this {
        this.convertToPropertyIfIsNotAFunction();
        rest.forEach(error => {
            this.methodToStub.methodStubCollection.add(new ThrowErrorMethodStub(this.groupIndex, this.methodToStub.matchers, error));
        });
        return this;
    }

    /**
     * Makes the stubbed call invoke the given function (with the real call's arguments) and
     * return its result, replacing the real implementation entirely.
     *
     * @param func the replacement implementation
     */
    public thenCall(func: (...args: any[]) => any): this {
        this.convertToPropertyIfIsNotAFunction();
        this.methodToStub.methodStubCollection.add(new CallFunctionMethodStub(this.groupIndex, this.methodToStub.matchers, func));
        return this;
    }

    /**
     * Makes the stubbed call return a `Promise` that resolves with the given value(s). Only
     * valid on calls whose real return type is a `Promise`. If no values are given, resolves
     * with `undefined`.
     *
     * @param rest the value(s) to resolve with
     */
    public thenResolve(...rest: (ResolveType | undefined)[]): this {
        this.convertToPropertyIfIsNotAFunction();
        // Resolves undefined if no resolve values are given.
        if (rest.length === 0) {
            rest.push(undefined);
        }
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new ResolvePromiseMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    /**
     * Makes the stubbed call return a `Promise` that rejects with the given error(s). Only
     * valid on calls whose real return type is a `Promise`. If no errors are given, rejects
     * with a generic error naming the stubbed method.
     *
     * @param rest the error(s) to reject with
     */
    public thenReject(...rest: Error[]): this {
        this.convertToPropertyIfIsNotAFunction();
        // Resolves undefined if no resolve values are given.
        if (rest.length === 0) {
            rest.push(new Error(`mocked '${this.methodToStub.name}' rejected`));
        }
        rest.forEach(value => {
            this.methodToStub.methodStubCollection.add(new RejectPromiseMethodStub(this.groupIndex, this.methodToStub.matchers, value));
        });
        return this;
    }

    private thenDoNothing(...rest: T[]): this {
        this.convertToPropertyIfIsNotAFunction();
        return this;
    }

    private convertToPropertyIfIsNotAFunction(): void {
        if (!this.methodToStub.methodStubCollection) {
            const info = (this.methodToStub as any)("__tsMockitoGetInfo");
            delete info.mocker.mock[info.key];
            delete info.mocker.instance[info.key];

            info.mocker.createPropertyStub(info.key);
            info.mocker.createInstancePropertyDescriptorListener(info.key, {}, undefined);
            info.mocker.createInstanceActionListener(info.key, undefined);
            this.methodToStub = info.mocker.mock[info.key];
        }
    }
}
