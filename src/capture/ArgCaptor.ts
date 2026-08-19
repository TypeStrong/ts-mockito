import {MethodAction} from "../MethodAction";

/**
 * Returned by {@link capture}, lets you inspect the arguments passed on individual past calls
 * to a mocked method. This is the untyped fallback for methods with more than 10 parameters;
 * for up to 10 parameters, {@link capture}'s overloads return one of the `ArgCaptorN` interfaces
 * below instead, which type each accessor's return value as the method's real argument tuple.
 */
export class ArgCaptor {
    constructor(private actions: MethodAction[]) {
    }

    /**
     * @returns the arguments passed on the 1st call
     */
    public first(): any {
        return this.byCallIndex(0);
    }

    /**
     * @returns the arguments passed on the 2nd call
     */
    public second(): any {
        return this.byCallIndex(1);
    }

    /**
     * @returns the arguments passed on the 3rd call
     */
    public third(): any {
        return this.byCallIndex(2);
    }

    /**
     * @returns the arguments passed on the second-to-last call
     */
    public beforeLast(): any {
        return this.byCallIndex(this.actions.length - 2);
    }

    /**
     * @returns the arguments passed on the most recent call
     */
    public last(): any {
        return this.byCallIndex(this.actions.length - 1);
    }

    /**
     * @param index zero-based call index
     * @returns the arguments passed on the call at the given index
     * @throws {Error} if the method hasn't been called that many times
     */
    public byCallIndex(index: number): any {
        if (this.actions.length > index && index >= 0) {
            return this.actions[index].args;
        }
        throw new Error(`Cannot capture arguments, method has not been called so many times: ${index + 1}`);
    }
}

/** Return type of {@link capture} for a mocked method with 1 parameter. */
export interface ArgCaptor1<T> {
    first(): [T];
    second(): [T];
    third(): [T];
    beforeLast(): [T];
    last(): [T];
    byCallIndex(index: number): [T];
}

/** Return type of {@link capture} for a mocked method with 2 parameters. */
export interface ArgCaptor2<T0, T1> {
    first(): [T0, T1];
    second(): [T0, T1];
    third(): [T0, T1];
    beforeLast(): [T0, T1];
    last(): [T0, T1];
    byCallIndex(index: number): [T0, T1];
}

/** Return type of {@link capture} for a mocked method with 3 parameters. */
export interface ArgCaptor3<T0, T1, T2> {
    first(): [T0, T1, T2];
    second(): [T0, T1, T2];
    third(): [T0, T1, T2];
    beforeLast(): [T0, T1, T2];
    last(): [T0, T1, T2];
    byCallIndex(index: number): [T0, T1, T2];
}

/** Return type of {@link capture} for a mocked method with 4 parameters. */
export interface ArgCaptor4<T0, T1, T2, T3> {
    first(): [T0, T1, T2, T3];
    second(): [T0, T1, T2, T3];
    third(): [T0, T1, T2, T3];
    beforeLast(): [T0, T1, T2, T3];
    last(): [T0, T1, T2, T3];
    byCallIndex(index: number): [T0, T1, T2, T3];
}

/** Return type of {@link capture} for a mocked method with 5 parameters. */
export interface ArgCaptor5<T0, T1, T2, T3, T4> {
    first(): [T0, T1, T2, T3, T4];
    second(): [T0, T1, T2, T3, T4];
    third(): [T0, T1, T2, T3, T4];
    beforeLast(): [T0, T1, T2, T3, T4];
    last(): [T0, T1, T2, T3, T4];
    byCallIndex(index: number): [T0, T1, T2, T3, T4];
}

/** Return type of {@link capture} for a mocked method with 6 parameters. */
export interface ArgCaptor6<T0, T1, T2, T3, T4, T5> {
    first(): [T0, T1, T2, T3, T4, T5];
    second(): [T0, T1, T2, T3, T4, T5];
    third(): [T0, T1, T2, T3, T4, T5];
    beforeLast(): [T0, T1, T2, T3, T4, T5];
    last(): [T0, T1, T2, T3, T4, T5];
    byCallIndex(index: number): [T0, T1, T2, T3, T4, T5];
}

/** Return type of {@link capture} for a mocked method with 7 parameters. */
export interface ArgCaptor7<T0, T1, T2, T3, T4, T5, T6> {
    first(): [T0, T1, T2, T3, T4, T5, T6];
    second(): [T0, T1, T2, T3, T4, T5, T6];
    third(): [T0, T1, T2, T3, T4, T5, T6];
    beforeLast(): [T0, T1, T2, T3, T4, T5, T6];
    last(): [T0, T1, T2, T3, T4, T5, T6];
    byCallIndex(index: number): [T0, T1, T2, T3, T4, T5, T6];
}

/** Return type of {@link capture} for a mocked method with 8 parameters. */
export interface ArgCaptor8<T0, T1, T2, T3, T4, T5, T6, T7> {
    first(): [T0, T1, T2, T3, T4, T5, T6, T7];
    second(): [T0, T1, T2, T3, T4, T5, T6, T7];
    third(): [T0, T1, T2, T3, T4, T5, T6, T7];
    beforeLast(): [T0, T1, T2, T3, T4, T5, T6, T7];
    last(): [T0, T1, T2, T3, T4, T5, T6, T7];
    byCallIndex(index: number): [T0, T1, T2, T3, T4, T5, T6, T7];
}

/** Return type of {@link capture} for a mocked method with 9 parameters. */
export interface ArgCaptor9<T0, T1, T2, T3, T4, T5, T6, T7, T8> {
    first(): [T0, T1, T2, T3, T4, T5, T6, T7, T8];
    second(): [T0, T1, T2, T3, T4, T5, T6, T7, T8];
    third(): [T0, T1, T2, T3, T4, T5, T6, T7, T8];
    beforeLast(): [T0, T1, T2, T3, T4, T5, T6, T7, T8];
    last(): [T0, T1, T2, T3, T4, T5, T6, T7, T8];
    byCallIndex(index: number): [T0, T1, T2, T3, T4, T5, T6, T7, T8];
}

/** Return type of {@link capture} for a mocked method with 10 parameters. */
export interface ArgCaptor10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> {
    first(): [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9];
    second(): [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9];
    third(): [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9];
    beforeLast(): [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9];
    last(): [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9];
    byCallIndex(index: number): [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9];
}
