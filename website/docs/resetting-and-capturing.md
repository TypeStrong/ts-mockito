---
sidebar_position: 5
---

# Resetting and Capturing

## Resetting mock calls

You can reset just the mock's call counter:

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);

// Getting instance
let foo: Foo = instance(mockedFoo);

// Some calls
foo.getBar(1);
foo.getBar(1);
verify(mockedFoo.getBar(1)).twice();      // getBar with arg "1" has been called twice

// Reset mock
resetCalls(mockedFoo);

// Call count verification
verify(mockedFoo.getBar(1)).never();      // has never been called after reset
```

You can also reset calls of multiple mocks at once: `resetCalls(firstMock, secondMock, thirdMock)`

## Resetting mock

Or reset the mock's call counter along with all its stubs:

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);
when(mockedFoo.getBar(1)).thenReturn("one");

// Getting instance
let foo: Foo = instance(mockedFoo);

// Some calls
console.log(foo.getBar(1));               // "one" - as defined in stub
console.log(foo.getBar(1));               // "one" - as defined in stub
verify(mockedFoo.getBar(1)).twice();      // getBar with arg "1" has been called twice

// Reset mock
reset(mockedFoo);

// Call count verification
verify(mockedFoo.getBar(1)).never();      // has never been called after reset
console.log(foo.getBar(1));               // null - previously added stub has been removed
```

You can also reset multiple mocks at once: `reset(firstMock, secondMock, thirdMock)`

## Capturing method arguments

```typescript
let mockedFoo: Foo = mock(Foo);
let foo: Foo = instance(mockedFoo);

// Call method
foo.sumTwoNumbers(1, 2);

// Check first arg captor values
const [firstArg, secondArg] = capture(mockedFoo.sumTwoNumbers).last();
console.log(firstArg);    // prints 1
console.log(secondArg);   // prints 2
```

You can also get other calls using `first()`, `second()`, `byCallIndex(3)` and more.
