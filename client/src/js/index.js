import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const initApp = async () => {
  const editor = new Editor(); // Assuming Editor has some asynchronous initialization

  if (!editor.isInitialized()) { // Adjust this based on your Editor implementation
    loadSpinner();
    await editor.init(); // Assuming Editor has an asynchronous init method
    // Hide spinner or perform any other actions after initialization
  }
};

initApp();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  try {
    const registration = await workboxSW.register();
    console.log('Service Worker registered with scope:', registration.scope);
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
} else {
  console.error('Service workers are not supported in this browser.');
}
