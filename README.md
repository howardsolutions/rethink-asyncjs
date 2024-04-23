# Rethink Asynchronous JavaScript DEEP NOTES

## 1️⃣ Parallel vs Async

👉 In computing sense, paralleism is expressed through threads

👉 Parallelism is when tasks literally run (instantly) at the same time, e.g., on a multicore processor.

👉 Paralleism is about Optimization <br />
if I have a bunch of things, I don't wanna wait to do the second set of tasks until the first finished, If it's possible to do both at the same time, we can get things done faster - it much better

👉 Asynchronousity (non-paralleism) move us to SINGLE THREAD

### Single Threaded JavaScript

👉 Even though the browser may have access to multiple threads, even Node engine for example, could use hundreds of threads in the background, BUT OUR PROGRAM ONLY RUN IN A SINGLE THREAD

👉 At any given instant, there is only one line of JS running in the JS Engine

👉 You COULD in theory spend multiple instances of JavaScript engine on entirely separate threads, it will look like multithreaded programming BUT they COULD NOT communicate in any useful way!

👉 Web Worker try to bridge that gap, BUT it's BROWSER thing not JS thing, web worker give us communication path through async events, even though they are functionally operating on independent threads, they cannot communicate threaded fashion, they have to communicate back on that single threaded notion through event loop

### Concurrency

👉 Describe concurrency as two higher level tasks happening within the same `timeframe`

👉 Concurrency is when two or more tasks can start, run, and complete in `overlapping time periods`. It doesn't necessarily mean they'll ever both be running at the same instant like Parallel.

👉 Asynchronous programming is managing our concurency

<hr />

## 2️⃣ CallBack

```javascript
setTimeout(function () {
  console.log('One');

  setTimeout(function () {
    console.log('Two');

    setTimeout(function () {
      console.log('three');
    }, 1000);
  }, 1000);
}, 1000);
```

### INVERSION OF CONTROL - FIRST callback PROBLEM

👉 MEANS there's part of my program that I'm in control of executing, and there's another portion of my code that I'm NOT in control of executing

👉 Take the First half of my program that executes NOW, second half of my code executes in the CALLBACK, and when I give that callback to somebody else - that INVERSE the control and PUT them in control of WHEN and HOW (in what manner) to execute the second half of my program

### NOT REASONABLE - hard to read, maintain and understand - SECOND callback PROBLEM

<hr />

## 3️⃣ Synchronous and Asynchronous Thunks - pattern on top of callback

### Synchronous Thunk

```js
function add(x, y) {
  return x + y;
}

var thunk = function () {
  return add(10, 15);
};

thunk(); // 25
```

👉 is a function that has everything already that needs to give you some value back, you dont need to pass any arguments in, simply call it, give value back

👉 is just a function with some closure state keeping track of some value, it's a container around that particular collection of state, now it's a container that I can pass around anywhere in my program

I don't have to pass the value it self, just need to pass the wrapper around that state
