import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/**", "lib/**", "coverage.lcov"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.ts", "test/**/*.ts"],
        rules: {
            "@typescript-eslint/member-ordering": ["error", {default: ["field", "constructor", "method"]}],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/no-unused-vars": ["error", {args: "none"}],
        },
    },
    {
        files: ["src/**/*.ts"],
        rules: {
            "no-console": "warn",
        },
    }
);
