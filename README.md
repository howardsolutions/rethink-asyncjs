# Rethink Asynchronous JavaScript DEEP NOTES

## 1️⃣ Parallel vs Async

👉 Paralleism is about Optimization

👉 Asynchronousity move us to SINGLE THREAD

### Single Threaded JavaScript

👉 Even though the browser may have access to multiple threads, even Node engine for example, could use hundreds of threads in the background, BUT OUR PROGRAM ONLY RUN IN A SINGLE THREAD

👉 At any given instant, there is only one line of JS running in the JS Engine

👉 You COULD in theory spend multiple instances of JavaScript engine on entirely separate threads, it will look like multithreaded programming BUT they COULD NOT communicate in any useful way!
