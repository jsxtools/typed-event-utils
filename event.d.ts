export var Event: EventConstructor

/**
 * The **`Event()`** constructor creates a new Event object.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
 */
export interface EventConstructor {
	new <T extends EventTarget = EventTarget, U extends EventTarget = T>(type: string, eventInitDict?: EventInit): Event<T, U>

	prototype: globalThis.Event

	readonly NONE: 0
	readonly CAPTURING_PHASE: 1
	readonly AT_TARGET: 2
	readonly BUBBLING_PHASE: 3
}

/**
 * The **`Event`** interface represents an event which takes place on an EventTarget.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Event)
 */
export type Event<T extends EventTarget = EventTarget, U extends EventTarget = T> = globalThis.Event & {
	readonly currentTarget: T | null
	readonly target: U | null
}

/** The object that specifies characteristics about the event. */
export interface EventInit {
	bubbles?: boolean
	cancelable?: boolean
	composed?: boolean
}
