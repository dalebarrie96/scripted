var countdownElement = document.getElementById("countdown");

var timeleft = countdownElement.innerHTML;

var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    window.close();
  } else {
    countdownElement.innerHTML = timeleft;
  }
  timeleft -= 1;
}, 1000);