/**
 * Base class for argument matchers such as those returned by `anyString()`, `anyNumber()`,
 * `deepEqual()`, etc. Consumers don't construct these directly — the matcher factory functions
 * exported from `ts-mockito` return one in place of a real argument value, for use inside
 * {@link when}/{@link verify} calls.
 */
export class Matcher<T = unknown> {
    /**
     * @param value the actual argument passed to the mocked call
     * @returns whether `value` satisfies this matcher
     */
    public match(value: T): boolean {
        return false;
    }

    /**
     * @returns a human-readable representation, used in verification failure messages
     */
    public toString(): string {
        return "";
    }
}
