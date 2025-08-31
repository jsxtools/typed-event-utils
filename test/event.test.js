import * as assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Event } from "../event.js";

describe("TypedEvent", () => {
	it("should be reflection of native Event", () => {
		assert.equal(Event, globalThis.Event, "should be same constructor")
		assert.equal(Event.prototype, globalThis.Event.prototype, "should have same prototype")
	})

	it("should require type argument", () => {
		assert.throws(() => {
			new Event()
		}, "should throw if no type is provided")
	})

	it("should construct without error", () => {
		assert.doesNotThrow(() => {
			new Event("test-event")
		}, "should not throw if type is provided")
	})
})
