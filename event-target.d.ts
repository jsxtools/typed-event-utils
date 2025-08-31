export var EventTarget: EventTargetConstructor

/**
 * The **`EventTarget()`** constructor creates a new EventTarget object instance.
 * 
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget)
 */
export interface EventTargetConstructor {
	new <T extends Events = Events>(): EventTarget<T>

	prototype: globalThis.EventTarget
}

/**
 * The **`EventTarget`** interface is implemented by objects that can receive events and may have listeners for them.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget)
 */
export interface EventTarget<T extends Events = Events> {
	/**
	 * The **`addEventListener()`** method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
	 */
	addEventListener<K extends keyof T>(
		type: K,
		listener: EventListenerOrEventListenerObject<T[K]> | null,
		options?: AddEventListenerOptions | boolean
	): void

	/**
	 * The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
	 */
	removeEventListener<K extends keyof T>(
		type: K,
		listener: EventListenerOrEventListenerObject<T[K]> | null,
		options?: EventListenerOptions | boolean
	): void

	/**
	 * The **`removeEventListener()`** method of the EventTarget interface removes an event listener previously registered with EventTarget.addEventListener() from the target.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)
	 */
	dispatchEvent<K extends keyof T>(event: T[K]): boolean
}

/** The callback function that receives a specified event delivered to the target */
export interface EventListener<T extends Event = Event> {
	(event: T): void
}

/** The object whose handleEvent() method serves as the callback function. */
export interface EventListenerObject<T extends Event = Event> {
	/** The callback function that receives a specified event delivered to the target */
	handleEvent(event: T): void
}

/** The object that specifies characteristics about the event listener. */
export interface AddEventListenerOptions extends EventListenerOptions {
	once?: boolean
	passive?: boolean
	signal?: AbortSignal
}

/** The object that specifies characteristics about the event listener. */
export interface EventListenerOptions {
	capture?: boolean
}

/** The map of event types to their corresponding event objects. */
export interface Events {
	[type: string]: Event
}

/** The callback function or object whose handleEvent() method serves as the callback function. */
export type EventListenerOrEventListenerObject<T extends Event = Event> = EventListener<T> | EventListenerObject<T>
