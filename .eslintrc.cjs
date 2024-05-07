module.exports = {
    root: true,
    env: { es2021: true, browser: true },
    ignorePatterns: ["dist", "node_modules"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
    plugins: [
        "@stylistic",
        "react-refresh",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react/recommended",
    ],
    rules: {
        "@stylistic/jsx-quotes": [ "error", "prefer-double" ],
        "@stylistic/member-delimiter-style": [ "error", { "multiline": { "delimiter": "semi" }, "singleline": { "delimiter": "semi" } } ],
        "@stylistic/quotes": [ "error", "double", { "avoidEscape": true } ],
        "@stylistic/semi": [ "error", "always" ],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/restrict-template-expressions": "off",
        "react/no-unescaped-entities": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        react: {
            version: "detect"
        }
    },
}
