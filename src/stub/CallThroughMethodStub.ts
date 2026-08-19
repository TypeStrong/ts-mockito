import {Matcher} from "../matcher/type/Matcher";
import {MethodStub} from "./MethodStub";

export class CallThroughMethodStub implements MethodStub {
    private result: any;

    constructor(private instance: any, private method: (...args: any[]) => any) {
    }

    public getGroupIndex(): number {
        return -1;
    }

    public isApplicable(args: any[]): boolean {
        return false;
    }

    public execute(args: any[]): void {
        this.result = this.method.apply(this.instance, args);
    }

    public getValue(): any {
        return this.result;
    }

    public getMatchers(): Matcher[] {
        return [];
    }
}
