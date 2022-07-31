let timerId = null;
let timerEl = document.getElementById('timer');

function countdownTimer() {
    if (--timerEl.textContent === 0) {
        clearInterval(timerId);
        window.alert('Вы победили в конкурсе!');
    }
}

let [hours, minutes, seconds] = timerEl.textContent.split(':');
let secondsInTimer = +hours * 3600 + +minutes * 60 + +seconds;

function countdownTimer2() {
    secondsInTimer--;
    if (secondsInTimer === 0) {
        clearInterval(timerId);
        window.alert('Вы победили в конкурсе!');
        document.getElementById('winnerClick').click();
    }

    hours = secondsInTimer > 0 ? Math.floor(secondsInTimer / 60 / 60) % 24 : 0;
    minutes = secondsInTimer > 0 ? Math.floor(secondsInTimer / 60) % 60 : 0;
    seconds = secondsInTimer > 0 ? secondsInTimer % 60 : 0;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerEl.textContent = [hours, minutes, seconds].join(':');
}

setInterval(countdownTimer2, 1000);


