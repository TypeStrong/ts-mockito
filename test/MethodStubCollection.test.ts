import {describe, it} from "node:test";
import {expect} from "expect";
import {MethodStubCollection} from "../src/MethodStubCollection";

describe("MethodStubCollection", () => {
    describe("empty stub collection", () => {
        it("returns -1 if doesn't find method stub", () => {
            // given
            const methodStubCollection = new MethodStubCollection();

            // when
            const index = methodStubCollection.getLastMatchingGroupIndex([]);

            // then
            expect(index).toBe(-1);
        });
    });
});
