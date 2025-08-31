import { describe, it, mock } from 'node:test'
import * as assert from 'node:assert/strict'
import { AbortableEventTarget } from '../abortable-event-target.js'

describe("AbortableEventTarget", () => {
	it("should construct without error", () => {
		assert.doesNotThrow(() => {
			new AbortableEventTarget()
		})
	})

	it('should include a signal property', () => {
		assert.ok(new AbortableEventTarget().signal instanceof AbortSignal)
	})

	it('should include an abort() method', () => {
		const target = new AbortableEventTarget()

		assert.ok(target.abort instanceof Function)
		assert.ok(target.abort.length === 0)
	})

	it('support support providing an abort reason', () => {
		const target = new AbortableEventTarget()

		assert.equal(target.signal.aborted, false, "the signal should not yet be aborted")

		target.abort('test reason')
		assert.equal(target.signal.aborted, true, "the signal should be aborted")
		assert.equal(target.signal.reason, "test reason", "the signal should have the correct reason")
	})

	it('should stop listening after abort()', () => {
		const target = new AbortableEventTarget()
		const mockFn = mock.fn(() => {});

		target.addEventListener('test', mockFn)
		assert.equal(mockFn.mock.callCount(), 0, "expected 0 calls before dispatching")

		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 1, "expected 1 call after 1 dispatch")

		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 2, "expected 2 calls after 2 dispatches")

		target.abort()

		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 2, "expected 2 calls after 3 dispatches due to abort()")
		
		target.addEventListener('test', mockFn)
		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 2, "expected 2 calls after 3 dispatches due to abort()")
	})

	it('should restart listening after renew()', () => {
		const target = new AbortableEventTarget()
		const mockFn = mock.fn(() => {});

		target.addEventListener('test', mockFn)
		assert.equal(mockFn.mock.callCount(), 0, "expected 0 calls before dispatching")

		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 1, "expected 1 call after 1 dispatch")

		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 2, "expected 2 calls after 2 dispatches")

		target.abort()

		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 2, "expected 2 calls after 3 dispatches due to abort()")

		target.renew()

		target.addEventListener('test', mockFn)
		target.dispatchEvent(new Event('test'))
		assert.equal(mockFn.mock.callCount(), 3, "expected 3 calls after 4 dispatches due to renew()")
	})
});

