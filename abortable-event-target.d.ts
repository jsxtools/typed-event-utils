import type { Events, EventTarget, EventTargetConstructor } from "./event-target.d.ts"

export var AbortableEventTarget: AbortableEventTargetConstructor

/**
 * The **`AbortableEventTarget()`** constructor creates a new AbortableEventTarget object instance.
 * 
 * [GitHub Reference](https://github.com/jsxtools/typed-event-utils#abortableeventtargett)
 */
export interface AbortableEventTargetConstructor extends EventTargetConstructor {
	new <T extends Events>(): AbortableEventTarget<T>

	prototype: AbortableEventTarget
}

/**
 * The **`AbortableEventTarget`** interface is implemented by objects that can receive events and may have listeners for them.
 * 
 * [GitHub Reference](https://github.com/jsxtools/typed-event-utils#abortableeventtargett)
 */
export interface AbortableEventTarget<T extends Events = Events> extends EventTarget<T> {
	/** The **`signal`** read-only property of the AbortableEventTarget interface returns an AbortSignal object instance, which can be used to abort all listeners on the object. */
	readonly signal: AbortSignal;

	/** The **`abort()`** method of the AbortableEventTarget interface aborts all listeners on the object. */
	abort(reason?: any): void;

	/** The **`renew()`** method of the AbortableEventTarget interface renews the abort signal for the object if it is presently aborted. */
	renew(): void
}
