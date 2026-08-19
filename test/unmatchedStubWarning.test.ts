import {beforeEach, describe, it, mock as nodeMock} from "node:test";
import {expect} from "expect";
import {instance, mock, when} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("warning about unmatched stub", () => {
    let mockedFoo: Foo;
    let foo: Foo;

    beforeEach(() => {
        mockedFoo = mock(Foo);
        foo = instance(mockedFoo);
    });

    it("warns when a stubbed method is called with args that don't match any configured stub", () => {
        // given
        const warnMock = nodeMock.method(console, "warn", () => undefined);
        when(mockedFoo.sumTwoNumbers(1, 2)).thenReturn(3);

        // when
        foo.sumTwoNumbers(1, 999);

        // then
        expect(warnMock.mock.callCount()).toEqual(1);
        const [message] = warnMock.mock.calls[0].arguments;
        expect(message).toContain("sumTwoNumbers(1, 999)");
        expect(message).toContain("sumTwoNumbers(strictEqual(1), strictEqual(2))");

        nodeMock.restoreAll();
    });

    it("does not warn when the call matches a configured stub", () => {
        // given
        const warnMock = nodeMock.method(console, "warn", () => undefined);
        when(mockedFoo.sumTwoNumbers(1, 2)).thenReturn(3);

        // when
        foo.sumTwoNumbers(1, 2);

        // then
        expect(warnMock.mock.callCount()).toEqual(0);

        nodeMock.restoreAll();
    });

    it("does not warn when the method was never stubbed", () => {
        // given
        const warnMock = nodeMock.method(console, "warn", () => undefined);

        // when
        foo.sumTwoNumbers(1, 2);

        // then
        expect(warnMock.mock.callCount()).toEqual(0);

        nodeMock.restoreAll();
    });
});
