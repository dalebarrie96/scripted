const countdownElement = document.getElementById('countdown')

let timeleft = countdownElement.innerHTML

const downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downloadTimer)
    window.close()
  } else {
    countdownElement.innerHTML = timeleft
  }
  timeleft -= 1
}, 1000)
