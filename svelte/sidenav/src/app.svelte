<script>
	import { writable } from "svelte/store";

	function createOpenStore() {
		const store = writable(/** @type {'closed' | 'closing' | 'open' | 'opening'} */('closed'));
		const { set, subscribe } = store;

		return {
			setClosed: () => set('closed'),
			setClosing: () => set('closing'),
			setOpening: () => set('opening'),
			setOpen: () => set('open'),
			subscribe,
		};
	}

	const sidebarStatus = createOpenStore();

	/**
	 * @param {TransitionEvent} event
	 */
	function handleTransitionend(event) {
		if (event.propertyName !== 'transform') return;
		if ($sidebarStatus === 'opening') sidebarStatus.setOpen();
		if ($sidebarStatus === 'closing') sidebarStatus.setClosed();
	}

	/**
	 * Close our menu when esc is pressed
	 *
	 * @param {KeyboardEvent} event
	 */
	function handleEscape(event) {
		if (/** @type {KeyboardEvent} */(event).code === 'Escape') {
			sidebarStatus.setClosing();
		}
	}

	/**
	 * @param {HTMLElement} element
	 * @param {boolean} shouldFocus
	 */
	function focus(element, shouldFocus) {
		update(shouldFocus);

		/** @param {boolean} shouldFocus */
		function update(shouldFocus) {
			if (shouldFocus) element.focus();
		}

		return { update };
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-invalid-attribute -->
<aside id="sidenav-open"
	class='grid grid-cols-[2fr_1fr]'
	class:is-open={$sidebarStatus === 'open' || $sidebarStatus === 'opening'}
	on:keyup={handleEscape} on:transitionend={handleTransitionend}>
	<nav class="inline-flex flex-col p-8 text-xl sm:pt-16">
		<h4 class="uppercase">My</h4>
		<a href="#"  class='leading-tight'>Dashboard</a>
		<a href="#"  class='leading-tight'>Profile</a>
		<a href="#"  class='leading-tight'>Preferences</a>
		<a href="#"  class='leading-tight'>Archive</a>

		<h4 class="uppercase mt-8">Settings</h4>
		<a href="#"  class='leading-tight'>Accessibility</a>
		<a href="#"  class='leading-tight'>Theme</a>
		<a href="#"  class='leading-tight'>Admin</a>
	</nav>

	<button
		id="sidenav-close"
		title="Close Menu"
		aria-label="Close Menu"
		class='select-none touch-manipulation sm:hidden'
		use:focus={$sidebarStatus === 'open'}
		on:click={() => sidebarStatus.setClosing()}
	></button>
</aside>

<main class="py-2 px-6">
	<header class='flex items-center justify-between mb-4 min-w-[3em]'>
		<button
			use:focus={$sidebarStatus === 'closed'}
			on:click={() => sidebarStatus.setOpening()}
			id="sidenav-button"
			class="hamburger flex items-center justify-center rounded p-4 w-16 h-16 outline-none -ms-4 select-none touch-manipulation sm:hidden"
			title="Open Menu"
			aria-label="Open Menu"
		>
			<svg class='w-full'
				viewBox="0 0 50 40"
				role="presentation"
				focusable="false"
				aria-label="trigram for heaven symbol"
			>
				<line x1="0" x2="100%" y1="10%" y2="10%" />
				<line x1="0" x2="100%" y1="50%" y2="50%" />
				<line x1="0" x2="100%" y1="90%" y2="90%" />
			</svg>
		</button>
		<h1 class="text-3xl">Site Title</h1>
	</header>

	<article class="inline-grid gap-1 p-5 rounded-lg">
		<h2>Totam Header</h2>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum consectetur,
			necessitatibus velit officia ut impedit veritatis temporibus soluta? Totam
			odit cupiditate facilis nisi sunt hic necessitatibus voluptatem nihil
			doloribus! Enim.
		</p>

		<h3>Subhead Totam Odit</h3>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum,
			amet odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt
			soluta eligendi labore error corrupti! Dolore, cupiditate porro.
		</p>

		<h3>Subhead</h3>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit rerum,
			amet odio explicabo voluptas eos cum libero, ex esse quasi optio incidunt
			soluta eligendi labore error corrupti! Dolore, cupiditate porro.
		</p>
	</article>
</main>

<style>
	
</style>
