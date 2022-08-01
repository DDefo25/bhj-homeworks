const deadEl = document.getElementById('dead');
const lostEl = document.getElementById('lost');

getIndex = index => document.getElementById(`hole${index}`);
for (let i = 1; i <= 9; i += 1) {
    getIndex(i).onclick = () => {
        if (getIndex(i).classList.contains('hole_has-mole')) {
            deadEl.textContent++;
        } else {
            lostEl.textContent++;
        }

        if (+deadEl.textContent === 10) {
            endGame('Вы победили');
        } else if (+lostEl.textContent === 5) {
            endGame('Вы проиграли');
        }
    }    
}

endGame = message => {
    window.alert(message);
    deadEl.textContent = 0;
    lostEl.textContent = 0;
}