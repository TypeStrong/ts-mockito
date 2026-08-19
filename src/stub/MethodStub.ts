import {Matcher} from "../matcher/type/Matcher";

export interface MethodStub {
    isApplicable(args: any[]): boolean;
    execute(args: any[]): void;
    getValue(): any;
    getGroupIndex(): number;
    getMatchers(): Matcher[];
}
