---
sidebar_position: 8
---

# Spying on Real Objects

You can partially mock an existing instance - unstubbed methods call through to the real
implementation:

```typescript
const foo: Foo = new Foo();
const spiedFoo = spy(foo);

when(spiedFoo.getBar(3)).thenReturn('one');

console.log(foo.getBar(3)); // 'one'
console.log(foo.getBaz());  // call to a real method
```

You can spy on plain objects too:

```typescript
const foo = { bar: () => 42 };
const spiedFoo = spy(foo);

foo.bar();

console.log(capture(spiedFoo.bar).last()); // [42]
```
