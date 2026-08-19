import {
    ArgCaptor,
    ArgCaptor1,
    ArgCaptor10,
    ArgCaptor2,
    ArgCaptor3,
    ArgCaptor4,
    ArgCaptor5,
    ArgCaptor6,
    ArgCaptor7,
    ArgCaptor8,
    ArgCaptor9,
} from "./capture/ArgCaptor";
import {AnyFunctionMatcher} from "./matcher/type/AnyFunctionMatcher";
import {AnyNumberMatcher} from "./matcher/type/AnyNumberMatcher";
import {AnyOfClassMatcher} from "./matcher/type/AnyOfClassMatcher";
import {AnyStringMatcher} from "./matcher/type/AnyStringMatcher";
import {AnythingMatcher} from "./matcher/type/AnythingMatcher";
import {BetweenMatcher} from "./matcher/type/BetweenMatcher";
import {DeepEqualMatcher} from "./matcher/type/DeepEqualMatcher";
import {Matcher} from "./matcher/type/Matcher";
import {MatchingStringMatcher} from "./matcher/type/MatchingStringMatcher";
import {NotNullMatcher} from "./matcher/type/NotNullMatcher";
import {ObjectContainingMatcher} from "./matcher/type/ObjectContainingMatcher";
import {StrictEqualMatcher} from "./matcher/type/StrictEqualMatcher";
import {MethodStubSetter} from "./MethodStubSetter";
import {MethodStubVerificator} from "./MethodStubVerificator";
import {MethodToStub} from "./MethodToStub";
import {Mocker} from "./Mock";
import {Spy} from "./Spy";

/**
 * Wraps a real object so its methods call through to the real implementation by default,
 * while individual methods can still be stubbed with {@link when}.
 *
 * @param instanceToSpy the real object instance to spy on
 * @returns the spied mock; pass it to {@link instance} to get an object backed by the real one
 * @example
 * ```
 * const foo = new Foo();
 * const spiedFoo = spy(foo);
 * when(spiedFoo.getBar(3)).thenReturn('one');
 * console.log(foo.getBar(3)); // 'one'
 * console.log(foo.getBaz()); // calls the real method
 * ```
 */
export function spy<T>(instanceToSpy: T): T {
    return new Spy(instanceToSpy).getMock();
}

/**
 * Creates a mock of the given class, abstract class, or generic class. Every method returns
 * `null`/`undefined` until stubbed with {@link when}.
 *
 * @param clazz the class to mock
 * @returns the mock; use it with {@link when}, {@link verify} and {@link capture}, and pass it
 * to {@link instance} to get an object usable in the code under test
 * @example
 * ```
 * const mockedFoo = mock(Foo);
 * when(mockedFoo.getBar(3)).thenReturn('three');
 * const foo = instance(mockedFoo);
 * console.log(foo.getBar(3)); // 'three'
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- accepts abstract class constructors too, which aren't valid `new (...) => T` types
export function mock<T>(clazz: (new(...args: any[]) => T) | (Function & { prototype: T }) ): T;
/**
 * Creates a mock of an interface (or other type with no runtime representation). The generic
 * type parameter must be supplied explicitly since there's no class to infer it from.
 *
 * @returns the mock; use it with {@link when}, {@link verify} and {@link capture}, and pass it
 * to {@link instance} to get an object usable in the code under test
 * @example
 * ```
 * const mockedFoo = mock<FooInterface>();
 * const foo = instance(mockedFoo);
 * ```
 */
export function mock<T>(clazz?: any): T;
export function mock<T>(clazz?: any): T {
    return new Mocker(clazz).getMock();
}

/**
 * Starts a verification of how many times (and in what order) a mocked method was called with
 * the given arguments, or matchers in their place.
 *
 * @param method a call made on a mock, e.g. `mockedFoo.getBar(3)`
 * @returns a {@link MethodStubVerificator} with `.once()`, `.times(n)`, `.calledBefore()`, etc.
 * @example
 * ```
 * verify(mockedFoo.getBar(3)).once();
 * verify(mockedFoo.getBar(anything())).called();
 * ```
 */
export function verify<T>(method: T): MethodStubVerificator<T> {
    return new MethodStubVerificator(method as any);
}

/**
 * Starts stubbing a mocked async method call, allowing `.thenResolve()`/`.thenReject()` in
 * addition to the regular stubbing behaviors.
 *
 * @param method a call made on a mock that returns a `Promise`
 * @returns a {@link MethodStubSetter}
 */
export function when<T>(method: Promise<T>): MethodStubSetter<Promise<T>, T, Error>;
/**
 * Starts stubbing a mocked method call (or getter access) with a specific behavior.
 *
 * @param method a call made on a mock, e.g. `mockedFoo.getBar(3)`, or a getter access, e.g.
 * `mockedFoo.sampleGetter`
 * @returns a {@link MethodStubSetter} with `.thenReturn()`, `.thenThrow()`, `.thenCall()`, etc.
 * @example
 * ```
 * when(mockedFoo.getBar(3)).thenReturn('three');
 * ```
 */
export function when<T>(method: T): MethodStubSetter<T>;
export function when(method: any): any {
    return new MethodStubSetter(method);
}

/**
 * Gets the actual instance to use in the code under test, from a value created by {@link mock}
 * or {@link spy}.
 *
 * @param mockedValue result of {@link mock} or {@link spy}
 * @returns the instance object
 * @example
 * ```
 * const mockedFoo = mock(Foo);
 * const foo = instance(mockedFoo);
 * foo.getBar(3); // calls through to the mock
 * ```
 */
export function instance<T>(mockedValue: T): T {
    return (mockedValue as any).__tsmockitoInstance as T;
}

/**
 * Captures the arguments of previous calls to a mocked method, so they can be inspected
 * individually. Overloaded for up to 10 arguments; each overload types the tuple returned by
 * the captor to match that arity.
 *
 * @param method the mocked method itself, not a call to it, e.g. `mockedFoo.sumTwoNumbers`
 * @returns a captor with `.first()`, `.second()`, `.third()`, `.beforeLast()`, `.last()` and
 * `.byCallIndex(n)`, each returning the tuple of arguments passed on that call
 * @example
 * ```
 * foo.sumTwoNumbers(1, 2);
 * const [first, second] = capture(mockedFoo.sumTwoNumbers).last();
 * ```
 */
export function capture<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(method: (a: T0, b: T1, c: T2, d: T3, e: T4, f: T5, g: T6, h: T7, i: T8, j: T9) => any): ArgCaptor10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>;
export function capture<T0, T1, T2, T3, T4, T5, T6, T7, T8>(method: (a: T0, b: T1, c: T2, d: T3, e: T4, f: T5, g: T6, h: T7, i: T8) => any): ArgCaptor9<T0, T1, T2, T3, T4, T5, T6, T7, T8>;
export function capture<T0, T1, T2, T3, T4, T5, T6, T7>(method: (a: T0, b: T1, c: T2, d: T3, e: T4, f: T5, g: T6, h: T7) => any): ArgCaptor8<T0, T1, T2, T3, T4, T5, T6, T7>;
export function capture<T0, T1, T2, T3, T4, T5, T6>(method: (a: T0, b: T1, c: T2, d: T3, e: T4, f: T5, g: T6) => any): ArgCaptor7<T0, T1, T2, T3, T4, T5, T6>;
export function capture<T0, T1, T2, T3, T4, T5>(method: (a: T0, b: T1, c: T2, d: T3, e: T4, f: T5) => any): ArgCaptor6<T0, T1, T2, T3, T4, T5>;
export function capture<T0, T1, T2, T3, T4>(method: (a: T0, b: T1, c: T2, d: T3, e: T4) => any): ArgCaptor5<T0, T1, T2, T3, T4>;
export function capture<T0, T1, T2, T3>(method: (a: T0, b: T1, c: T2, d: T3) => any): ArgCaptor4<T0, T1, T2, T3>;
export function capture<T0, T1, T2>(method: (a: T0, b: T1, c: T2) => any): ArgCaptor3<T0, T1, T2>;
export function capture<T0, T1>(method: (a: T0, b: T1) => any): ArgCaptor2<T0, T1>;
export function capture<T0>(method: (a: T0) => any): ArgCaptor1<T0>;
export function capture(method: (...args: any[]) => any): ArgCaptor {
    const methodStub: MethodToStub | unknown = method();
    if (methodStub instanceof MethodToStub) {
        const actions = methodStub.mocker.getActionsByName(methodStub.name);
        return new ArgCaptor(actions);
    } else {
        throw Error("Cannot capture from not mocked object.");
    }
}

/**
 * Resets one or more mocks entirely: removes every stubbed behavior and recorded call, as if
 * the mock had just been created.
 *
 * @param mockedValues one or more values created by {@link mock}
 * @example
 * ```
 * reset(mockedFoo);
 * verify(mockedFoo.getBar(1)).never();  // recorded calls are gone
 * console.log(foo.getBar(1));           // null - stubs are gone too
 * ```
 */
export function reset<T>(...mockedValues: T[]): void {
    mockedValues.forEach(mockedValue => (mockedValue as any).__tsmockitoMocker.reset());
}

/**
 * Resets the recorded call history of one or more mocks, without removing previously configured
 * stubs from {@link when}.
 *
 * @param mockedValues one or more values created by {@link mock}
 * @example
 * ```
 * resetCalls(mockedFoo);
 * verify(mockedFoo.getBar(1)).never(); // recorded calls are gone, stubs are untouched
 * ```
 */
export function resetCalls<T>(...mockedValues: T[]): void {
    mockedValues.forEach(mockedValue => (mockedValue as any).__tsmockitoMocker.resetCalls());
}

/**
 * Argument matcher: matches any value that is an `instanceof` the given class.
 *
 * @param expectedClass the class the actual argument must be an instance of
 */
export function anyOfClass<T>(expectedClass: new (...args: any[]) => T): T & Matcher<T> {
    return new AnyOfClassMatcher(expectedClass) as unknown as T & Matcher<T>;
}

/**
 * Argument matcher: matches any function.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- matches any function shape, which is what the matcher checks for
export function anyFunction<T extends Function = Function>(): T & Matcher<T> {
    return new AnyFunctionMatcher<T>() as unknown as T & Matcher<T>;
}

/**
 * Argument matcher: matches any number.
 */
export function anyNumber(): number & Matcher<number> {
    return new AnyNumberMatcher() as unknown as number & Matcher<number>;
}

/**
 * Argument matcher: matches any string.
 */
export function anyString(): string & Matcher<string> {
    return new AnyStringMatcher() as unknown as string & Matcher<string>;
}

/**
 * Argument matcher: matches any value, including `null` and `undefined`.
 */
export function anything<T = unknown>(): T & Matcher<T> {
    return new AnythingMatcher() as unknown as T & Matcher<T>;
}

/**
 * Argument matcher: matches any number between `min` and `max`, inclusive.
 *
 * @param min the inclusive lower bound
 * @param max the inclusive upper bound
 * @throws {Error} if `min` is greater than `max`
 */
export function between(min: number, max: number): number & Matcher<number> {
    return new BetweenMatcher(min, max) as unknown as number & Matcher<number>;
}

/**
 * Argument matcher: matches a value deeply equal to `expectedValue` (recursive/structural
 * comparison), rather than requiring strict `===` equality.
 *
 * @param expectedValue the value the actual argument must deeply equal
 */
export function deepEqual<T>(expectedValue: T): T {
    return new DeepEqualMatcher<T>(expectedValue) as any;
}

/**
 * Argument matcher: matches any value except `null`.
 */
export function notNull<T = unknown>(): T & Matcher<T> {
    return new NotNullMatcher() as unknown as T & Matcher<T>;
}

/**
 * Argument matcher: matches a value strictly equal (`===`) to `expectedValue`. This is the
 * matcher implicitly used for any plain, non-matcher value passed directly to a mocked method.
 *
 * @param expectedValue the value the actual argument must strictly equal
 */
export function strictEqual<T>(expectedValue: T): T & Matcher<T> {
    return new StrictEqualMatcher<T>(expectedValue) as unknown as T & Matcher<T>;
}

/**
 * Argument matcher: matches a string against the given regular expression (or string pattern).
 *
 * @param expectedValue the pattern the actual argument must match
 */
export function match(expectedValue: RegExp | string): string & Matcher<string> {
    return new MatchingStringMatcher(expectedValue) as unknown as string & Matcher<string>;
}

/**
 * Argument matcher: matches any object that contains at least the given properties — a partial
 * match, unlike {@link deepEqual} which requires full equality.
 *
 * @param expectedValue the properties the actual argument must contain
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- narrowing to `object` would reject primitives consumers could previously pass, a public API break
export function objectContaining<T extends Object>(expectedValue: T): any {
    return new ObjectContainingMatcher(expectedValue) as any;
}

// Export default object with all members (ember-browserify doesn't support named exports).
export default {
    spy,
    mock,
    verify,
    when,
    instance,
    capture,
    reset,
    resetCalls,
    anyOfClass,
    anyFunction,
    anyNumber,
    anyString,
    anything,
    between,
    deepEqual,
    notNull,
    strictEqual,
    match,
    objectContaining,
};
