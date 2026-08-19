import {describe, it} from "node:test";
import {expect} from "expect";
import {instance, mock, spy} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

class Base {
    public baseMethod(): string {
        return "base";
    }
}

class Derived extends Base {
    public derivedMethod(): string {
        return "derived";
    }
}

describe("instanceof", () => {
    it("mocked instance is instanceof the mocked class", () => {
        const mockedFoo = mock(Foo);
        const foo = instance(mockedFoo);

        expect(foo instanceof Foo).toBe(true);
    });

    it("mocked instance is instanceof every class in its inheritance chain", () => {
        const mockedDerived = mock(Derived);
        const derived = instance(mockedDerived);

        expect(derived instanceof Derived).toBe(true);
        expect(derived instanceof Base).toBe(true);
    });

    it("mocked instance is not instanceof an unrelated class", () => {
        const mockedFoo = mock(Foo);
        const foo = instance(mockedFoo);

        expect(foo instanceof Derived).toBe(false);
    });

    it("unstubbed methods still return the default stub value rather than the real implementation", () => {
        const mockedDerived = mock(Derived);
        const derived = instance(mockedDerived);

        expect(derived.baseMethod()).toBe(null);
    });

    it("a spied instance is instanceof its class", () => {
        const spiedDerived = spy(new Derived());
        const derived = instance(spiedDerived);

        expect(derived instanceof Derived).toBe(true);
        expect(derived instanceof Base).toBe(true);
    });
});
