# Rethink Asynchronous JavaScript DEEP NOTES

## 1️⃣ Parallel vs Async

👉 In computing sense, paralleism is expressed through threads

👉 Paralleism is about Optimization <br />
if I have a bunch of things, I don't wanna wait to do the second set of tasks until the first finished, If it's possible to do both at the same time, we can get things done faster - it much better

👉 Asynchronousity (non-paralleism) move us to SINGLE THREAD

### Single Threaded JavaScript

👉 Even though the browser may have access to multiple threads, even Node engine for example, could use hundreds of threads in the background, BUT OUR PROGRAM ONLY RUN IN A SINGLE THREAD

👉 At any given instant, there is only one line of JS running in the JS Engine

👉 You COULD in theory spend multiple instances of JavaScript engine on entirely separate threads, it will look like multithreaded programming BUT they COULD NOT communicate in any useful way!

👉 Web Worker try to bridge that gap, BUT it's BROWSER thing not JS thing, web worker give us communication path through async events, even though they are functionally operating on independent threads, they cannot communicate threaded fashion, they have to communicate back on that single threaded notion through event loop

### Concurrency

👉 Describe concurrency as two higher level tasks happening within the same timeframe

👉 Asynchronous programming is managing our concurency

## 2️⃣ CallBack
