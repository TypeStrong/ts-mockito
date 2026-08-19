# Changelog

All notable changes to this project are documented in this file.
The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [3.0.0]

### Breaking changes

- **Package format**: rebuilt as a dual ESM/CJS package using [`tsdown`](https://github.com/rolldown/tsdown). The
  `main`/`module`/`types` fields and `exports` map now point at `dist/ts-mockito.{mjs,cjs}` and
  `dist/ts-mockito.d.{mts,cts}` instead of `lib/ts-mockito.js`. Consumers importing deep paths from `lib/` will need
  to switch to the package entry point.
- **Node.js 18+** is now required (`engines.node >= 18`).
- Argument matchers (`anything()`, `anyString()`, `anyNumber()`, `anyOfClass()`, `notNull()`, `strictEqual()`,
  `match()`, `between()`, `anyFunction()`) no longer return `any`. They now return `T & Matcher<T>`, so mismatched
  matcher/parameter types are caught at compile time instead of silently passing (issue #38). This may surface new
  type errors in existing test code that relied on the previous unsafe `any` return.
- Tooling: Jest and Karma were removed in favor of Node's built-in test runner (`node --test`) via `tsx`; TSLint was
  replaced with ESLint (flat config); Travis CI config was removed in favor of GitHub Actions.

### Added

- `verify()` accepts an optional `customMessage` parameter that is prepended to the failure output when a
  verification fails, e.g. `verify(mockedFoo.getBar(3), 'getBar should have been called with 3').once()` (issue #40).
- Calling a mocked method with arguments that don't match any configured stub now logs a `console.warn` diagnostic
  showing the actual call and the configured stub(s), to help diagnose accidentally-unmatched stubs (issue #66).
- Full TSDoc/JSDoc comments across the public API (`mock`, `verify`, `when`, capture/matcher helpers, etc.), improving
  editor tooltips and IntelliSense (issue #39).
- Documentation is now published via TypeDoc to the project website, with a link from the README.

### Fixed

- `instance(mock(MyClass))` now correctly passes `instanceof MyClass` checks again (issue #37).
- Verification failure messages for calls with `null`/`undefined` arguments now render a useful representation
  instead of an unhelpful/empty value (issue #65).

### Changed

- Various internal modernization: updated dependencies, `tsconfig.json`, and CI workflows; renamed test files from
  `*.spec.ts` to `*.test.ts` to match the new Node test runner's conventions.
