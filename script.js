let count = 0;
let intervalId = null;

document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('stop-btn').addEventListener('click', stop);
document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('toggle-btn').addEventListener('click', toggleView);
document.getElementById('stopwatch-link').addEventListener('click', showStopwatch);
document.getElementById('timer-link').addEventListener('click', showTimer);

function start() {
    if (intervalId === null) {
        intervalId = setInterval(() => {
            count++;
            document.getElementById('display').innerText = count;
        }, 1000);
    }
}

function stop() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function reset() {
    stop();
    count = 0;
    document.getElementById('display').innerText = count;
}

function updateDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.getElementById('date-time').innerText = `${day}, ${date} ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Countdown Timer
let countdownIntervalId = null;
let countdownTime = 0;

document.getElementById('start-countdown-btn').addEventListener('click', startCountdown);
document.getElementById('stop-countdown-btn').addEventListener('click', stopCountdown);
document.getElementById('reset-countdown-btn').addEventListener('click', resetCountdown);

function startCountdown() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    countdownTime = (hours * 3600) + (minutes * 60) + seconds;

    if (countdownTime <= 0) {
        alert('Please enter a valid time.');
        return;
    }

    if (countdownIntervalId === null) {
        countdownIntervalId = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                updateCountdownDisplay();
            } else {
                stopCountdown();
                alert('Time is up!');
            }
        }, 1000);
    }
}

function stopCountdown() {
    if (countdownIntervalId !== null) {
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
    }
}

function resetCountdown() {
    stopCountdown();
    countdownTime = 0;
    updateCountdownDisplay();
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}

function updateCountdownDisplay() {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;
    document.getElementById('countdown-display').innerText = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleView() {
    const stopwatchCard = document.getElementById('stopwatch-card');
    const timerCard = document.getElementById('timer-card');
    const toggleBtn = document.getElementById('toggle-btn');

    if (stopwatchCard.style.display === 'none') {
        stopwatchCard.style.display = 'flex';
        timerCard.style.display = 'none';
        toggleBtn.innerText = 'Switch to Timer';
    } else {
        stopwatchCard.style.display = 'none';
        timerCard.style.display = 'flex';
        toggleBtn.innerText = 'Switch to Stopwatch';
    }
}

function showStopwatch() {
    document.getElementById('stopwatch-card').style.display = 'flex';
    document.getElementById('timer-card').style.display = 'none';
    document.getElementById('toggle-btn').innerText = 'Switch to Timer';
}

function showTimer() {
    document.getElementById('stopwatch-card').style.display = 'none';
    document.getElementById('timer-card').style.display = 'flex';
    document.getElementById('toggle-btn').innerText = 'Switch to Stopwatch';
}
