---
sidebar_position: 4
---

# Verification

## Call count verification

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);

// Getting instance
let foo: Foo = instance(mockedFoo);

// Some calls
foo.getBar(1);
foo.getBar(2);
foo.getBar(2);
foo.getBar(3);

// Call count verification
verify(mockedFoo.getBar(1)).once();               // was called with arg === 1 only once
verify(mockedFoo.getBar(2)).twice();              // was called with arg === 2 exactly two times
verify(mockedFoo.getBar(between(2, 3))).thrice(); // was called with arg between 2-3 exactly three times
verify(mockedFoo.getBar(anyNumber())).times(4);   // was called with any number arg exactly four times
verify(mockedFoo.getBar(2)).atLeast(2);           // was called with arg === 2 min two times
verify(mockedFoo.getBar(anything())).atMost(4);   // was called with any argument max four times
verify(mockedFoo.getBar(4)).never();              // was never called with arg === 4
```

## Custom verification error message

`verify` accepts an optional message as its second argument. If the verification fails, this
message is prepended to the default failure output (similar to
[jest-expect-message](https://github.com/mattphillips/jest-expect-message)) - you still get the
usual "Expected ... to be called ... Actual calls: ..." diagnostics, plus your own context.

```typescript
let mockedFoo: Foo = mock(Foo);
let foo: Foo = instance(mockedFoo);

foo.getBar(2);

verify(mockedFoo.getBar(1), 'getBar should have been called with 1').once();
// throws: getBar should have been called with 1
//         Expected "getBar(strictEqual(1))" to be called 1 time(s). But has been called 0 time(s).
//         Actual calls:
//           getBar(2)
```

## Call order verification

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);
let mockedBar: Bar = mock(Bar);

// Getting instance
let foo: Foo = instance(mockedFoo);
let bar: Bar = instance(mockedBar);

// Some calls
foo.getBar(1);
bar.getFoo(2);

// Call order verification
verify(mockedFoo.getBar(1)).calledBefore(mockedBar.getFoo(2));    // foo.getBar(1) has been called before bar.getFoo(2)
verify(mockedBar.getFoo(2)).calledAfter(mockedFoo.getBar(1));    // bar.getFoo(2) has been called before foo.getBar(1)
verify(mockedFoo.getBar(1)).calledBefore(mockedBar.getFoo(999999));    // throws error (mockedBar.getFoo(999999) has never been called)
```
