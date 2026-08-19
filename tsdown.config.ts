import {defineConfig} from "tsdown";

export default defineConfig({
    entry: "src/ts-mockito.ts",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    unbundle: true,
    outExtensions: ({format}) => ({js: format === "cjs" ? ".cjs" : ".mjs"}),
    deps: {neverBundle: true},
    outputOptions: {exports: "named"},
});
