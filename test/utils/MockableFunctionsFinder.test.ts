import {beforeEach, describe, it} from "node:test";
import {expect} from "expect";
import {MockableFunctionsFinder} from "../../src/utils/MockableFunctionsFinder";

describe("MockableFunctionsFinder", () => {
    describe("searching for method names in code", () => {
        it("returns all called and defined functions", () => {
            // given
            const code = getSampleCode();

            // when
            const result = new MockableFunctionsFinder().find(code);

            // then
            expect(result).toContain("anonymousMethod");
            expect(result).toContain("convertNumberToString");
        });

        it("should not find hasOwnProperty as it should not be mocked (because its used by mockito to evaluate properties)", () => {
            // given
            const code = getSampleCode();

            // when
            const result = new MockableFunctionsFinder().find(code);

            // then
            expect(result["hasOwnProperty"] instanceof Function).toBeTruthy();
        });
    });

    describe("searching for method names wrapped by a bundler's name-preservation helper", () => {
        it("still finds a constructor-assigned method wrapped in a __name() call", () => {
            // given
            // esbuild's `keepNames` (used by tsx, which runs this very test suite) rewrites
            // `this.dynamicMethod = () => ...` into `this.dynamicMethod = __name(() => ..., "dynamicMethod")`
            // to preserve the function's .name. The finder must see through that wrapper.
            const code = getSampleCodeWithNameHelper();

            // when
            const result = new MockableFunctionsFinder().find(code);

            // then
            expect(result).toContain("dynamicMethod");
        });

        it("still finds a class field initialized with a wrapped arrow function", () => {
            // given
            const code = getSampleClassFieldCodeWithNameHelper();

            // when
            const result = new MockableFunctionsFinder().find(code);

            // then
            expect(result).toContain("add");
        });
    });

    describe("searching for method names in complex class code", () => {
        const mockableFunctionsFinder = new MockableFunctionsFinder();
        let mockableMethods: string[];

        beforeEach(() => {
            const object = getSampleComplexClassCode();
            mockableMethods = mockableFunctionsFinder.find(object);
        });

        it("should find existing property method", () => {
            expect(mockableMethods).toContain('testMethod');
            expect(mockableMethods).toContain('testMethod2');
            expect(mockableMethods).toContain('testMethod3');
        });

        it("should find existing existing property accessors", () => {
            expect(mockableMethods).toContain('someValue');
        });

        it("should not find non existent property", () => {
            expect(mockableMethods).not.toContain("nonExistentProperty");
        });
    });
});

function getSampleCode(): string {
    return eval(`
class Foo {
    constructor (temp) {
        this.anonymousMethod = function(arg) {
            console.log(arg);
            temp.hasOwnProperty("fakeProperty");
        }
    }

    convertNumberToString(value) {
        return value.toString();
    }
}

Foo;
`);
}

function getSampleCodeWithNameHelper(): string {
    // `find()` only ever reads `.toString()` of the class/prototype chain -- it never
    // constructs an instance -- so `__name` doesn't need to be a real, callable function
    // here. Only its literal presence in the source text is under test.
    return eval(`
class Foo {
    constructor() {
        this.dynamicMethod = __name(() => "dynamicMethod", "dynamicMethod");
    }
}

Foo;
`);
}

function getSampleClassFieldCodeWithNameHelper(): string {
    return eval(`
class Foo {
    constructor() {
        this.add = __name((str, num) => null, "add");
    }
}

Foo;
`);
}

function getSampleComplexClassCode() {
    return eval(`
class InheritedTest {
    undefinedProperty = undefined;
    nullProperty = null;
    nanProperty = NaN;
    stringProperty = "stringProperty";
    booleanProperty = true;
    testMethod = () => true;
    testMethod2 = function () { return true };

    get someValue() {
        return "someValue";
    }

    set someValue(newValue) {
        console.info("someValue set");
    }
}

class Test extends InheritedTest {
    testMethod3() {
        return 'barbaz';
    }
}

Test;
`);
}