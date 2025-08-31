import { test } from 'node:test'
import { EventTarget } from '../event-target.js'

test('exports EventTarget', () => {
	new EventTarget()
})
