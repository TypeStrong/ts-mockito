import {MethodToStub} from "./MethodToStub";
import {MethodCallToStringConverter} from "./utils/MethodCallToStringConverter";

/**
 * Fluent verificator returned by {@link verify}, used to assert how many times (and in what
 * order) a mocked method was called with the given arguments (or matchers in their place).
 * Every assertion method throws a descriptive `Error`, including the actual recorded calls,
 * when the expectation isn't met.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- T is part of the public generic API shape, kept for consumers who reference it explicitly
export class MethodStubVerificator<T> {
    private methodCallToStringConverter: MethodCallToStringConverter = new MethodCallToStringConverter();

    constructor(private methodToVerify: MethodToStub) {

    }

    /**
     * Asserts the call was made at least once. Equivalent to `.atLeast(1)`.
     */
    public called(): void {
        this.atLeast(1);
    }

    /**
     * Asserts the call was never made. Equivalent to `.times(0)`.
     */
    public never(): void {
        this.times(0);
    }

    /**
     * Asserts the call was made exactly once. Equivalent to `.times(1)`.
     */
    public once(): void {
        this.times(1);
    }

    /**
     * Asserts the call was made exactly twice. Equivalent to `.times(2)`.
     */
    public twice(): void {
        this.times(2);
    }

    /**
     * Asserts the call was made exactly three times. Equivalent to `.times(3)`.
     */
    public thrice(): void {
        this.times(3);
    }

    /**
     * Asserts the call was made exactly `value` times.
     *
     * @param value the exact expected call count
     */
    public times(value: number): void {
        const allMatchingActions = this.methodToVerify.mocker.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value !== allMatchingActions.length) {
            const methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            const msg = `Expected "${methodToVerifyAsString}to be called ${value} time(s). But has been called ${allMatchingActions.length} time(s).`;
            throw new Error(`${msg}
${this.actualCalls()}`);
        }
    }

    /**
     * Asserts the call was made at least `value` times.
     *
     * @param value the minimum expected call count
     */
    public atLeast(value: number): void {
        const allMatchingActions = this.methodToVerify.mocker.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value > allMatchingActions.length) {
            const methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error(`Expected "${methodToVerifyAsString}to be called at least ${value} time(s). But has been called ${allMatchingActions.length} time(s).`);
        }
    }

    /**
     * Asserts the call was made at most `value` times.
     *
     * @param value the maximum expected call count
     */
    public atMost(value: number): void {
        const allMatchingActions = this.methodToVerify.mocker.getAllMatchingActions(this.methodToVerify.name, this.methodToVerify.matchers);
        if (value < allMatchingActions.length) {
            const methodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
            throw new Error(`Expected "${methodToVerifyAsString}to be called at least ${value} time(s). But has been called ${allMatchingActions.length} time(s).`);
        }
    }

    /**
     * Asserts this call was made before the given other mocked call.
     *
     * @param method a call made on a (possibly different) mock, e.g. `mockedBar.getFoo(2)`
     * @example
     * ```
     * foo.getBar(1);
     * bar.getFoo(2);
     *
     * verify(mockedFoo.getBar(1)).calledBefore(mockedBar.getFoo(2)); // passes
     * ```
     */
    public calledBefore(method: any): void {
        const firstMethodAction = this.methodToVerify.mocker.getFirstMatchingAction(this.methodToVerify.name, this.methodToVerify.matchers);
        const secondMethodAction = method.mocker.getFirstMatchingAction(method.name, method.matchers);
        const mainMethodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
        const secondMethodAsString = this.methodCallToStringConverter.convert(method);
        const errorBeginning = `Expected "${mainMethodToVerifyAsString} to be called before ${secondMethodAsString}`;

        if (firstMethodAction && secondMethodAction) {
            if (!firstMethodAction.hasBeenCalledBefore(secondMethodAction)) {
                throw new Error(`${errorBeginning}but has been called after.`);
            }
        } else if (firstMethodAction && !secondMethodAction) {
            throw new Error(`${errorBeginning}but ${secondMethodAsString}has never been called.`);
        } else if (!firstMethodAction && secondMethodAction) {
            throw new Error(`${errorBeginning}but ${mainMethodToVerifyAsString}has never been called.`);
        } else {
            throw new Error(`${errorBeginning}but none of them has been called.`);
        }
    }

    /**
     * Asserts this call was made after the given other mocked call.
     *
     * @param method a call made on a (possibly different) mock, e.g. `mockedFoo.getBar(1)`
     * @example
     * ```
     * foo.getBar(1);
     * bar.getFoo(2);
     *
     * verify(mockedBar.getFoo(2)).calledAfter(mockedFoo.getBar(1)); // passes
     * ```
     */
    public calledAfter(method: any): void {
        const firstMethodAction = this.methodToVerify.mocker.getFirstMatchingAction(this.methodToVerify.name, this.methodToVerify.matchers);
        const secondMethodAction = method.mocker.getFirstMatchingAction(method.name, method.matchers);
        const mainMethodToVerifyAsString = this.methodCallToStringConverter.convert(this.methodToVerify);
        const secondMethodAsString = this.methodCallToStringConverter.convert(method);
        const errorBeginning = `Expected "${mainMethodToVerifyAsString}to be called after ${secondMethodAsString}`;

        if (firstMethodAction && secondMethodAction) {
            if (firstMethodAction.hasBeenCalledBefore(secondMethodAction)) {
                throw new Error(`${errorBeginning}but has been called before.`);
            }
        } else if (firstMethodAction && !secondMethodAction) {
            throw new Error(`${errorBeginning}but ${secondMethodAsString}has never been called.`);
        } else if (!firstMethodAction && secondMethodAction) {
            throw new Error(`${errorBeginning}but ${mainMethodToVerifyAsString}has never been called.`);
        } else {
            throw new Error(`${errorBeginning}but none of them has been called.`);
        }
    }

    private actualCalls() {
        const calls = this.methodToVerify.mocker.getActionsByName(this.methodToVerify.name);
        return `Actual calls:
  ${this.methodCallToStringConverter.convertActualCalls(calls).join("\n  ")}`;
    }
}
