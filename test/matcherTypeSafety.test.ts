import {describe, it} from "node:test";
import {expect} from "expect";
import {anyNumber, anyString, instance, mock, when} from "../src/ts-mockito";
import {Matcher} from "../src/matcher/type/Matcher";
import {Foo} from "./utils/Foo";

describe("matcher factory return types", () => {
    it("are still usable as a Matcher instance", () => {
        const asMatcher: Matcher = anyNumber();

        expect(asMatcher.match(5)).toBe(true);
    });

    it("satisfy the real parameter type at the call site", () => {
        const mockedFoo = mock(Foo);
        when(mockedFoo.convertNumberToString(anyNumber())).thenReturn("stubbed");

        const result = instance(mockedFoo).convertNumberToString(42);

        expect(result).toEqual("stubbed");
    });

    it("reject a matcher of the wrong type at compile time", () => {
        const mockedFoo = mock(Foo);

        // @ts-expect-error anyString() returns `string & Matcher<string>`, which isn't assignable to the `number` parameter of convertNumberToString
        when(mockedFoo.convertNumberToString(anyString())).thenReturn("stubbed");
    });
});
