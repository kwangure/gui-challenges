import './css/app.css';
import './css/sidenav.css';
import './css/brandnav.css';
import './css/index.css';
import App from './app.svelte';

const target = /** @type {HTMLElement} */ (document.getElementById('app'));
new App({ target });
