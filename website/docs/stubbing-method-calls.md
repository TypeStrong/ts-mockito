---
sidebar_position: 3
---

# Stubbing Method Calls

## Stubbing method calls

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);

// stub method before execution
when(mockedFoo.getBar(3)).thenReturn('three');

// Getting instance
let foo: Foo = instance(mockedFoo);

// prints three
console.log(foo.getBar(3));

// prints null, because "getBar(999)" was not stubbed
console.log(foo.getBar(999));
```

## Stubbing getter value

```typescript
// Creating mock
let mockedFoo: Foo = mock(Foo);

// stub getter before execution
when(mockedFoo.sampleGetter).thenReturn('three');

// Getting instance
let foo: Foo = instance(mockedFoo);

// prints three
console.log(foo.sampleGetter);
```

## Stubbing property values that have no getters

Syntax is the same as with getter values.

## Throwing errors

```typescript
let mockedFoo: Foo = mock(Foo);

when(mockedFoo.getBar(10)).thenThrow(new Error('fatal error'));

let foo: Foo = instance(mockedFoo);
try {
    foo.getBar(10);
} catch (error: Error) {
    console.log(error.message); // 'fatal error'
}
```

## Custom function

You can also stub a method with your own implementation:

```typescript
let mockedFoo: Foo = mock(Foo);
let foo: Foo = instance(mockedFoo);

when(mockedFoo.sumTwoNumbers(anyNumber(), anyNumber())).thenCall((arg1: number, arg2: number) => {
    return arg1 * arg2;
});

// prints '50' because we've changed sum method implementation to multiply!
console.log(foo.sumTwoNumbers(5, 10));
```

## Resolving / rejecting promises

You can also stub a method to resolve or reject a promise:

```typescript
let mockedFoo: Foo = mock(Foo);

when(mockedFoo.fetchData("a")).thenResolve({id: "a", value: "Hello world"});
when(mockedFoo.fetchData("b")).thenReject(new Error("b does not exist"));
```
