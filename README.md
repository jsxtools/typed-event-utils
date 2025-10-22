# typed-event-utils

![Tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/jsxtools/typed-event-utils/refs/heads/badges/tests.json)
![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/jsxtools/typed-event-utils/refs/heads/badges/coverage.json)

A collection of type-safe utilities for working with events.

## Features

- **Type-safe Event**: Strongly typed Event constructor with enhanced type safety
- **Type-safe EventTarget**: Strongly typed event handling with full TypeScript support

## Extra Features

- **AbortableEventTarget**: EventTarget with built-in abort functionality for automatic cleanup
- **ComposedEvent**: Event with additional features for working across shadow DOM boundaries

## Installation

```shell
npm install typed-event-utils
```

## Usage

### Event

The `Event` constructor provides type safety for event creation with enhanced target typing.

```typescript
import { Event } from "typed-event-utils/event"

// create an event with a typed target
const event = new Event<HTMLButtonElement>("click")

// the event has typed currentTarget and target properties
// event.currentTarget: HTMLButtonElement
// event.target: HTMLButtonElement
```

### EventTarget

The `EventTarget` class provides type safety for event handling.

```typescript
import { EventTarget } from "typed-event-utils"

// define your event types
type Events = {
  "success": CustomEvent<{ message: string }>
  "error": ErrorEvent
}

// create an event target with typed events
const target = new EventTarget<Events>()

// add event listeners with full type safety
target.addEventListener("success", (event) => {
  // event.detail is typed to be { message: string }
  console.log("success message:", event.detail.message)
})

target.addEventListener("error", (event) => {
  // event is typed to be an ErrorEvent
  console.log(event.message)
})

// dispatch an error event
target.dispatchEvent(new ErrorEvent("error", { message: "cause" }))

// @ts-expect-error because "invalid" is not an allowable event
target.addEventListener("invalid", (event) => {})

// @ts-expect-error because MessageEvent is not an allowable instance
target.dispatchEvent(new MessageEvent("error", { message: "cause" }))
```

### AbortableEventTarget

The `AbortableEventTarget` class extends `EventTarget` to support cleanup capabilities.

```typescript
import { AbortableEventTarget } from "typed-event-utils/abortable-event-target"

type Events = {
  "update-data": CustomEvent<{ data: any }>
}

const target = new AbortableEventTarget<Events>()

// All listeners are automatically connected to an AbortSignal associated with the target
target.addEventListener("update-data", (event) => {
  console.log("Data updated:", event.detail.data)
})

// Remove all listeners at once
target.abort()

// The AbortSignal is accessible if needed
console.log(target.signal.aborted) // true after abort()
```

### ComposedEvent

The `ComposedEvent` class extends `Event` to improve working across shadow DOM boundaries.

```typescript
import { ComposedEvent } from "typed-event-utils/composed-event"

// create an event with a typed compose target
const event = new ComposedEvent<HTMLButtonElement>("click")

// a composed event is automatically composed
// event.composed: true

// a composed event includes a typed composedTarget property
// event.composedTarget: HTMLButtonElement

// a composed event has typed currentTarget and target properties
// event.currentTarget: HTMLButtonElement
// event.target: HTMLButtonElement
```

## API Reference

### Event\<T,U\>

A generic `Event` constructor that provides type safety for event creation with enhanced target typing.

- `new Event<T, U>(type, eventInit?)`: Creates a typed event with target type information.



### EventTarget\<T\>

A generic `EventTarget` constructor that provides type safety for event handling.

- `new EventTarget<T>()`: Creates a typed event target with typed events.

#### Methods

- `addEventListener(type, listener, options?)`: Adds a typed event listener.
- `removeEventListener(type, listener, options?)`: Removes a typed event listener.
- `dispatchEvent(event)`: Dispatches a typed event.



### AbortableEventTarget\<T\>

An extended `EventTarget` constructor with built-in abort functionality.

- `new EventTarget<T>()`: Creates a typed event target with typed events and cleanup capabilities.

#### Methods

The `AbortableEventTarget` methods extend generic `EventTarget` methods.

- `abort(reason?)`: Aborts all event listeners on the target.

#### Properties

- `signal`: Read-only `AbortSignal` for the event target.



### ComposedEvent\<C,T,U\>

An extended `Event` constructor with additional features for working across shadow DOM boundaries.

- `new Event<C, T, U>(type, composedEventInit?)`: Creates a composed event with target type information.

#### Properties

- `composedTarget`: Read-only `EventTarget` representing the first target in the composed path, otherwise `null`.

<br />

## License

### MIT No Attribution

#### Copyright 2025 Jonathan Neal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
