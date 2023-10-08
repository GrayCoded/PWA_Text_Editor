const butInstall = document.getElementById('buttonInstall');
let installPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt', event);
    event.preventDefault();
    installPrompt = event;
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', () => {
    if (installPrompt) {
        installPrompt.prompt();

        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the installation');
            } else {
                console.log('User dismissed the installation');
            }
            installPrompt = null;
            butInstall.style.display = 'none';
        });
    }
});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Application Installed!', event);
});
