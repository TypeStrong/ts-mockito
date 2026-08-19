---
sidebar_position: 6
---

# Recording Multiple Behaviors

You can set multiple returning values for the same matching call.

```typescript
const mockedFoo: Foo = mock(Foo);

when(mockedFoo.getBar(anyNumber())).thenReturn('one').thenReturn('two').thenReturn('three');

const foo: Foo = instance(mockedFoo);

console.log(foo.getBar(1)); // one
console.log(foo.getBar(1)); // two
console.log(foo.getBar(1)); // three
console.log(foo.getBar(1)); // three - last defined behavior will be repeated infinitely
```

Another example with specific values:

```typescript
let mockedFoo: Foo = mock(Foo);

when(mockedFoo.getBar(1)).thenReturn('one').thenReturn('another one');
when(mockedFoo.getBar(2)).thenReturn('two');

let foo: Foo = instance(mockedFoo);

console.log(foo.getBar(1)); // one
console.log(foo.getBar(2)); // two
console.log(foo.getBar(1)); // another one
console.log(foo.getBar(1)); // another one - this is last defined behavior for arg '1' so it will be repeated
console.log(foo.getBar(2)); // two
console.log(foo.getBar(2)); // two - this is last defined behavior for arg '2' so it will be repeated
```

Short notation - you can specify return values as multiple `thenReturn` args:

```typescript
const mockedFoo: Foo = mock(Foo);

when(mockedFoo.getBar(anyNumber())).thenReturn('one', 'two', 'three');

const foo: Foo = instance(mockedFoo);

console.log(foo.getBar(1)); // one
console.log(foo.getBar(1)); // two
console.log(foo.getBar(1)); // three
console.log(foo.getBar(1)); // three - last defined behavior will be repeated infinitely
```

## Overlapping matchers

When more than one stub matches the same call, the most recently defined one wins - not the
most specific one. This lets you set a default behavior first and override it for specific
inputs afterwards:

```typescript
const mockedFoo: Foo = mock(Foo);

when(mockedFoo.getBar(anyNumber())).thenReturn('default');
when(mockedFoo.getBar(3)).thenReturn('three');

const foo: Foo = instance(mockedFoo);
console.log(foo.getBar(3)); // 'three' - the more recently defined stub wins
console.log(foo.getBar(5)); // 'default' - falls back to the only matching stub
```

Defining them in the opposite order changes which one wins, since it's always "last defined,"
not "most specific":

```typescript
const mockedFoo: Foo = mock(Foo);

when(mockedFoo.getBar(3)).thenReturn('three');
when(mockedFoo.getBar(anyNumber())).thenReturn('default');

const foo: Foo = instance(mockedFoo);
console.log(foo.getBar(3)); // 'default' - defined after the '3'-specific stub, so it wins even for 3
```
