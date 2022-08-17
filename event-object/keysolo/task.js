class Game {
    constructor(container) {
        this.container = container;
        this.statusWinsEl = container.querySelector('.status__wins');
        this.statusLossEl = container.querySelector('.status__loss');
        this.timerEl = container.querySelector('.timer');
        this.phraseEl = container.querySelector('.phrase');
        this.symbolEl = container.getElementsByClassName('symbol');
        this.timerId = null;

        this.setNewPhrase();

        this.startTimer();

        this.keyAwaiting();
    }

    setNewPhrase() {
        const phraseBank = [
            'hey jude',
            'break on through',
            'Пластмассовый мир победил',
            'Spb точка ру',
            'я люблю kitkat',
            'snickers все же лучше',
            'да пребудет с тобой сила'
        ];

        this.phraseEl.innerHTML = '';

        const randomPhrase = phraseBank[Math.floor(Math.random() * phraseBank.length)];
        [...randomPhrase].forEach(char => {
            this.phraseEl.innerHTML += `<span class="symbol">${char.toLowerCase()}</span>`;
        });

        this.phraseEl.firstChild.classList.add('symbol__current');
    }

    getCurrentSymbolCharCode() {
        return [...this.symbolEl].find(el => el.classList.contains('symbol__current')).textContent.charCodeAt();
    }

    nextSymbol() {
        const currentSymbolIndex = [...this.symbolEl].findIndex(el => el.classList.contains('symbol__current'));
        [...this.symbolEl][currentSymbolIndex].classList.remove('symbol__current');
        [...this.symbolEl][currentSymbolIndex].classList.add('symbol_correct');
        
        if ([...this.symbolEl][currentSymbolIndex + 1] === undefined) {
            return this.win();
        }
        [...this.symbolEl][currentSymbolIndex + 1].classList.add('symbol__current');
    }

    win() {
        this.statusWinsEl.textContent++;
        this.setNewPhrase();
        this.startTimer();

        if (+this.statusWinsEl.textContent === 10) {
            alert('Вы выиграли!');
            this.reset();
        }
    }

    loss() {
        this.statusLossEl.textContent++;
        this.setNewPhrase();
        this.startTimer();

        if (+this.statusLossEl.textContent === 5) {
            alert('Вы проиграли!');
            this.reset();
        }
    }

    reset() {
        this.statusWinsEl.textContent = 0;
        this.statusLossEl.textContent = 0;
        this.timerEl.textContent = 0;
        
        this.setNewPhrase();

        this.startTimer();
    }

    keyAwaiting() {
        document.addEventListener('keypress', event => {
            const char = event.key.toLowerCase();

            if (verifyChar(char.charCodeAt())) {
                if (char.charCodeAt() === this.getCurrentSymbolCharCode()) {
                    this.nextSymbol();
                } else {
                    this.loss();
                }
            }

            function verifyChar(char) {
                return char >= 97 && char <= 122 || 
                char >= 1072 && char <= 1105 || 
                char >= 32 && char <= 63;
            }
        })
    }

    startTimer() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }

        this.timerEl.textContent = this.phraseEl.childNodes.length;
        
        this.timerId = setInterval(() => {
            this.timerEl.textContent--;
            if (+this.timerEl.textContent === 0) {
                this.loss();
            }
        }, 1000);
    }
}

new Game(document.querySelector('#game'));