const liveClock = document.querySelector('.live-clock div');

function updateClock() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    liveClock.textContent = now.toLocaleTimeString('en-US', options);
}

setInterval(updateClock, 1000);