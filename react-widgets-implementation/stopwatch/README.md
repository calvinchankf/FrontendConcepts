# Stop Watch / Timer Implmentation


This question looks simple on first glance but is actually more complex than it seems.

1. `setInterval`'s `delay` is unreliable. The actual amount of time that elapses between calls to the callback may be longer than the given delay due to various reasons  e.g. nested timeouts, inactive tabs, throttling (firefox), timeouts in Web Extension. Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#reasons_for_delays_longer_than_specified


2. `useEffect` is async, there will be a delay on click if you use it on the start/pause button 

===

Below is a list of implementations, starting from a naive approach to an optimal appraoch.

| Version  | Details | Links |
| -------- | ------- | ------- |
| [v0](/react-widgets-implementation/stopwatch/v0/)  | unreliable `setInterval` | [demo](https://stackblitz.com/edit/vitejs-vite-kkwfsbml?file=src%2FStopwatch.jsx) |
| [v1](/react-widgets-implementation/stopwatch/v1/)  | a trick is to use `setInterval` for time calculation, but `Date.now()` is inacurrate that affected by system clock change, also `useEffect` has a delay in start & pause button on click | [demo](https://stackblitz.com/edit/vitejs-vite-7kfz8mhf?file=src%2FStopwatch.jsx) |
| [v2](/react-widgets-implementation/stopwatch/v2/)  | keep using `setInterval` trick but minimize button click delay by using `performance.now()`, however still keep calling `useEffect` every 10ms | [demo](https://stackblitz.com/edit/vitejs-vite-6punuawq?file=src%2FStopwatch.jsx) |
| [v3](/react-widgets-implementation/stopwatch/v3/) | use `requestAnimationFrame` instead of `setInterval` | [demo](https://stackblitz.com/edit/vitejs-vite-2cg3vpj1?file=src%2FStopwatch.jsx) |
| [v4](/react-widgets-implementation/stopwatch/v4/) | final version | [demo](https://stackblitz.com/edit/vitejs-vite-fnq9a33e?file=src%2FStopwatch.jsx) |

On the other side, in Valiina Javascript

| [v0](/vanilla-widgets-implementation/stopwatch/v0/) | `setInterval` | [demo](https://stackblitz.com/edit/vitejs-vite-yqxsvjbp?file=src%2Fstopwatch.js) |
| [v1](/vanilla-widgets-implementation/stopwatch) | `requestAnimationFrame` | [demo](https://stackblitz.com/edit/vitejs-vite-8sr1yd9l?file=src%2Fstopwatch.js) |