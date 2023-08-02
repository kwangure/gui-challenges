const FOCUSABLE_SELECTOR =
	'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * @param {HTMLElement} element
 */
export function getFocusableElements(element) {
	return /** @type {HTMLElement[]} */ (
		Array.from(element.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
			(/** @type {Element} */ el) => !el.hasAttribute('disabled'),
		)
	);
}

/**
 * @param {HTMLElement} element
 * @param {boolean} [shouldTrap]
 */
export function focustrap(element, shouldTrap) {
	let __shouldTrap = shouldTrap;
	/** @type {HTMLElement} */
	let firstFocusableElement;
	/** @type {HTMLElement} */
	let lastFocusableElement;

	update(shouldTrap);

	// This is run every time the element or its children are updated
	function update(shouldTrap = true) {
		__shouldTrap = shouldTrap;
		let focusableElements = getFocusableElements(element);
		firstFocusableElement = focusableElements[0];
		lastFocusableElement = focusableElements[focusableElements.length - 1];
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	function handleKeydown(event) {
		if (!__shouldTrap) return;
		// ignore if Tab is not pressed
		if (event.key !== 'Tab' && event.keyCode !== 9) return;

		if (event.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				event.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				event.preventDefault();
			}
		}
	}

	element.addEventListener('keydown', handleKeydown);
	return {
		update,
		destroy() {
			element.removeEventListener('keydown', handleKeydown);
		},
	};
}
