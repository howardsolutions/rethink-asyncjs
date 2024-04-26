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

👉 That's the fundamental conceptual underpinnning for what a Promise is - a Wrapper around a Value

👉 Thunks are Promises without fancy API

### Asynchronous Thunk

```js
function addAsync(x, y, cb) {
  setTimeout(function () {
    cb(x + y);
  }, 1000);
}

var thunk = function (cb) {
  addAsync(10, 15, cb);
};

thunk(function (sum) {
  console.log(sum); // 25
});
```

👉 Any time we call `thunk` and pass in a callback `cb` we know we gonna get the value out.

👉 We have produced the value that has become time independent, no matter the value is there now? or it's gonna come LATER we still use it in exactly same way.

👉 Time is the most complex Factor of state in your program

#### Lazy Thunk, Active Thunk

👉 Lazy thunk is the thunk in that it does not do the work `until you call it the first time`

👉 Active thunk did the work right away and just held on to the response

### Thunks and Closure

👉 By using the Closure to maintain the state of something, we eliminate time as a complecting factor of state.

👉 Time is the most complex Factor of state in your program
Understanding the `order in which things happen` and `the way things change over time` is the most complex part of your application.

<hr />

## 4️⃣ Promise

👉 A placeholder for the `future value` of an asynchronous action. <br />
👉 Promise UN-INVERT the inversion control problem => That's a BIG DEAL

### wait! Still have callback pass in to handle resolved value or rejected error???

![Still callback?](/images/still%20callback.png)

### 🤔 Promises were all about solving callback error? get rid of callbacks hell?

### SO why still passed in callback? => NOT really solved the inverstion control problem???

### Promise Trust:

👉 Only resolved ONE <br />
👉 EITHER SUCCESS OR ERROR <br />
👉 Messages passed / kept <br />
👉 Exceptions become errors <br />
👉 IMMUTABLE one resolved <br />

### Flow Control - Promise Chaining .then() and .catch()

#### How do promises allow us to manage sequential flow control? => BY CHAINING PROMISES

### Abstractions

### Promise "GATE" - Promise.all()

![Promise Gate](/images/promise%20gate.png)

👉 OLD SCHOOL Computer Science we call Promise.all is a GATE

👉 Whenever you have MULTIPLE THINGS happening, you don't know what ORDER they're gonna finish in, BUT all of them need to FINISH before MOVING ON => WE CALL THAT A GATE

👉 If any of those Three Promises creates a Rejection => the main Promises immediately rejected

### Promise "TIMEOUT" - Promise.race()

👉 Wait for any resolution, whether that's `fulfillment` or `rejection` any resolution Crosses the FINISH LINE FIRST WINS! and EVERYBODY ELSE gets ignored!

![Promise Timeout](/images/promise%20timeout.png)

### Sequences = Automatically Chained Promises
