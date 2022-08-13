class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.timer');
    this.timerId;

    this.reset();

    this.registerEvents();

    this.startTimer();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', event => {
      if (this.currentSymbol.textContent === event.key.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    })
  }

  startTimer() {
    this.resetTimer();
    this.timerId = setInterval(() => this.checkTimeRest(), 1000);
  }

  checkTimeRest() {
    let timeRest = parseInt(this.timerElement.textContent);
    timeRest--;

    if (timeRest > 0) {
      this.timerElement.textContent = this.parseTime(timeRest);
    } else {
      this.fail();
    }
  }

  parseTime(time) {
    if (time === 1) {
      return `${time} секунда`
    } else if (time > 1 && time < 5) {
      return `${time} секунды`      
    } else {
      return `${time} секунд`
    }
  }

  resetTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.timerElement.textContent = this.parseTime(this.wordElement.childNodes.length);
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.startTimer();
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

