document.addEventListener('DOMContentLoaded', async () => {
    let appVersion = await window.application.getVersion();
    document.title = `Scripted (${appVersion})`;
});