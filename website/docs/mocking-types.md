---
sidebar_position: 7
---

# Mocking Interfaces and Types

## Mocking interfaces

You can mock interfaces too - instead of passing a type to the `mock` function, set the `mock`
function's generic type. Mocking interfaces requires a `Proxy` implementation.

```typescript
let mockedFoo: FooInterface = mock<FooInterface>(); // instead of mock(FooInterface)
const foo: FooInterface = instance(mockedFoo);
```

## Mocking abstract classes

```typescript
const mockedFoo: SampleAbstractClass = mock(SampleAbstractClass);
const foo: SampleAbstractClass = instance(mockedFoo);
```

## Mocking generic classes

You can also mock generic classes, but note that the generic type is only needed by the `mock`
type definition:

```typescript
const mockedFoo: SampleGeneric<SampleInterface> = mock(SampleGeneric);
const foo: SampleGeneric<SampleInterface> = instance(mockedFoo);
```
