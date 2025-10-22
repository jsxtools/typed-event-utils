import type { Event, EventConstructor } from "./event.d.ts"

export var ComposedEvent: ComposedEventConstructor

/**
 * The **`ComposedEvent()`** constructor creates a new Event object that propagates across the shadow DOM boundary.
 *
 * [GitHub Reference](https://github.com/jsxtools/typed-event-utils#composedeventctu)
 */
export interface ComposedEventConstructor extends EventConstructor {
	new <C extends Node = Node, T extends Node = C, U extends Node = T>(type: string, eventInitDict?: ComposedEventInit): ComposedEvent<C, T, U>

	prototype: ComposedEvent
}

/**
 * The **`ComposedEvent`** interface represents a composed event which takes place on an EventTarget.
 *
 * [GitHub Reference](https://github.com/jsxtools/typed-event-utils#composedeventctu)
 */
export interface ComposedEvent<C extends Node = Node, T extends Node = C, U extends Node = T> extends Event<T, U> {
	readonly composedTarget: C | null
}

/** The object that specifies characteristics about the event. */
export interface ComposedEventInit {
	bubbles?: boolean
	cancelable?: boolean
}
