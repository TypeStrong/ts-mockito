import _ from "lodash";
import {Matcher} from "./Matcher";

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- narrowing to `object` would reject primitives consumers could previously pass, a public API break
export class ObjectContainingMatcher<T extends Object = Object> extends Matcher<T> {
    constructor(private expectedValue: any) {
        super();
    }

    public match(value: T): boolean {
        return _.isMatch(value, this.expectedValue);
    }

    public toString(): string {
        return `objectContaining(${JSON.stringify(this.expectedValue)})`;
    }
}
