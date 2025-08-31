export class AbortableEventTarget extends EventTarget {
	abort() {
		this.#controller.abort(...arguments)
	}

	addEventListener(type, listener, options = null) {
		this.signal.aborted || super.addEventListener(type, listener, {
			capture: +options,
			signal: this.signal,
			...options,
		})
	}

	renew() {
		if (this.signal.aborted) this.#controller = new AbortController()
	}

	get signal() {
		return this.#controller.signal
	}

	#controller = new AbortController()
}
