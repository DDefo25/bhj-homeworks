const counterEl = document.getElementById('clicker__counter');
const cookieEl = document.getElementById('cookie');
const clickSpeed = document.getElementById('clicker__speed');

let counter = +counterEl.textContent;
let startTime = counter === 0 ? new Date() : null;

cookieEl.onclick = () => {
    counterEl.textContent++;
    cookieEl.width = (counterEl.textContent % 2) === 0 ? '180' : '200';
    let diff = new Date() - startTime;
    startTime = new Date();
    clickSpeed.textContent = (1000 / diff).toFixed(2) 
}