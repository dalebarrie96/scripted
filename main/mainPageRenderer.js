// On Page Load
document.addEventListener('DOMContentLoaded', async () => {
  // Set Title with app version
  const appVersion = await window.application.getVersion()
  document.title = `Scripted (${appVersion})`
  // Set Typing delay default value
  document.getElementById('typing-delay').value = window.config.typingDelay
})

// Typing Delay Input
const typingDelayElement = document.getElementById('typing-delay')
typingDelayElement.onchange = (event) => {
  window.electronTunnel.changeTypingDelay(event.target.value)
}

let codeSnippet = ''

document.getElementById('code-snippet').onchange = (event) => {
  codeSnippet = event.target.value
}

// Run Script
document.getElementById('btn-run-script').onclick = (event) => {
  window.electronTunnel.runScript(codeSnippet)
}
