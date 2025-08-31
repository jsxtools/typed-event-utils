# typed-event-utils

![Tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/jsxtools/typed-event-utils/refs/heads/badges/tests.json)
![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/jsxtools/typed-event-utils/refs/heads/badges/coverage.json)

A collection of type-safe utilities for working with events.

## Features

- **Type-safe Event**: Strongly typed Event constructor with enhanced type safety
- **Type-safe EventTarget**: Strongly typed event handling with full TypeScript support
- **AbortableEventTarget**: EventTarget with built-in abort functionality for automatic cleanup

## Installation

```shell
npm install typed-event-utils
```

## Usage

### Event

The `Event` constructor provides type safety for event creation with enhanced target typing.

```typescript
import { Event } from "typed-event-utils/event"

// create a typed event with target type information
const event = new Event<HTMLButtonElement>("click")

// the event has properly typed currentTarget and target properties
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

// create a typed event target
const target = new EventTarget<Events>()

// add event listeners with full type safety
target.addEventListener("success", (event) => {
  // event.detail is properly typed with { message: string }
  console.log("success message:", event.detail.message)
})

target.addEventListener("error", (event) => {
  // event is properly typed as an ErrorEvent
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

## API Reference

### Event\<T, U\>

A generic `Event` constructor that provides type safety for event creation with enhanced target typing.

- `new Event<T, U>(type, eventInitDict?)`: Creates a typed event with target type information.

### EventTarget\<T\>

A generic `EventTarget` that provides type safety for event handling.

- `new EventTarget<T>()`: Creates a typed event target with typed events.

#### Methods

- `addEventListener(type, listener, options?)`: Adds a typed event listener.
- `removeEventListener(type, listener, options?)`: Removes a typed event listener.
- `dispatchEvent(event)`: Dispatches a typed event.

### AbortableEventTarget\<T\>

Extends `EventTarget` with automatic cleanup capabilities.

- `new EventTarget<T>()`: Creates a typed event target with typed events and cleanup capabilities.

#### Methods

Extends `EventTarget` methods.

- `abort(reason?)`: Aborts all event listeners on the target.

#### Properties

- `signal`: Read-only `AbortSignal` for the event target.

<br />

## License

### MIT No Attribution

#### Copyright 2025 Jonathan Neal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
