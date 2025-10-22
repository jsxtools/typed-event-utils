import * as assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { ComposedEvent } from '../composed-event.js'

describe("ComposedEvent", () => {
	it("should construct without error", () => {
		assert.doesNotThrow(() => {
			new ComposedEvent("test-event")
		})
	})

	it("should extend Event", () => {
		const event = new ComposedEvent("test-event")

		assert.ok(event instanceof Event, "should be instance of Event")
	})

	it("should set composed to true", () => {
		const event = new ComposedEvent("test-event")

		assert.equal(event.composed, true, "composed should be true")
		assert.equal(event.bubbles, false, "bubbles should be false by default")
		assert.equal(event.cancelable, false, "cancelable should be false by default")
	})

	it("should override user initialization", () => {
		const event = new ComposedEvent("test-event", { composed: false })

		assert.equal(event.composed, true, "composed should be true, even if user initialized to be false")
	})

	it("should accept options and merge with composed: true", () => {
		const event = new ComposedEvent("test-event", { bubbles: true, cancelable: true })

		assert.equal(event.composed, true, "composed should be true")
		assert.equal(event.bubbles, true, "bubbles should be true")
		assert.equal(event.cancelable, true, "cancelable should be true")
	})

	it("should have composedTarget getter that returns composedPath first element", () => {
		const event = new ComposedEvent("test-event")

		assert.ok("composedTarget" in event, "composedTarget should be a property")
	})

	it("should return first element of composedPath as composedTarget", () => {
		const event = new ComposedEvent("test-event")
		const composedPath = event.composedPath()
		const composedTarget = event.composedTarget

		assert.equal(composedPath.length, 0, "composedPath should be empty")
		assert.equal(composedTarget, null, "composedTarget should be null if composedPath is empty")
	})

	it("should expect composedTarget to match target by default", () => {
		const event = new ComposedEvent("test-event")
		const composedTarget = event.composedTarget
		const currentTarget = event.currentTarget
		assert.equal(composedTarget, currentTarget, "composedTarget should match currentTarget without a shadow root")
	})
})
