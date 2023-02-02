var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var helperFunc

function startTimer(start)
{
    totalSeconds = start
    helperFunc = setInterval(setTime, 1000);
}

function setTime()
{
    if(myGame.gameFinished) return
    myGame.timeCount = totalSeconds
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}