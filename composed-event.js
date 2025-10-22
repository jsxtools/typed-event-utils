export class ComposedEvent extends Event {
	constructor(type, options = null) {
		super(type, { ...options, composed: true })
	}

	get composedTarget() {
		return this.composedPath().at(0) ?? null
	}
}
