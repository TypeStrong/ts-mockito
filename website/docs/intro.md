---
sidebar_position: 1
---

# Getting Started

Mocking library for TypeScript, inspired by [Mockito](http://mockito.org/).

## Installation

```
npm install @typestrong/ts-mockito --save-dev
```

## Basics

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);

// Getting instance from mock
let foo: Foo = instance(mockedFoo);

// Using instance in source code
foo.getBar(3);
foo.getBar(5);

// Explicit, readable verification
verify(mockedFoo.getBar(3)).called();
verify(mockedFoo.getBar(anything())).called();
```

## Main features

* Strongly typed, with IDE autocomplete
* Mock creation (`mock`), including abstract classes - see [Mocking types](./mocking-types)
* Spying on real objects (`spy`) - see [Spying on real objects](./spying)
* Changing mock behavior (`when`) via `thenReturn`, `thenThrow`, `thenCall`, `thenResolve` and
  `thenReject` - see [Stubbing method calls](./stubbing-method-calls)
* Checking if methods were called with given arguments (`verify`), including call count and call
  order - see [Verification](./verification)
* Resetting mocks (`reset`, `resetCalls`) and capturing arguments (`capture`) - see
  [Resetting and capturing](./resetting-and-capturing)
* Recording multiple behaviors for the same stub - see
  [Recording multiple behaviors](./recording-multiple-behaviors)
* Readable error messages, e.g.
  `'Expected "convertNumberToString(strictEqual(3))" to be called 2 time(s). But has been called 1 time(s).'`

See the full [API reference](./api) for every exported function and its options.
