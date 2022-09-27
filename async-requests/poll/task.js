class Poll {
    constructor(container) {
        this.container = container;
        this.poll = {
            voteId: null,
            answerIndex: null,
        };

        this.registerEvent();
    }

    registerEvent() {
        const pollRequest = this.getRequest('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
        pollRequest.onreadystatechange = () => {
            if (pollRequest.readyState === pollRequest.DONE) {
                this.poll.voteId = pollRequest.response.id;
                this.renderPoll( pollRequest.response );
            }
        }
    }

    getRequest( method, url ) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        switch (method) {
            case 'POST':
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send( `vote=${this.poll.voteId}&answer=${this.poll.answerIndex}` );
                break;
            case 'GET':
                xhr.send();
        }
        return xhr;
    }

    sendAnswers( answerIndex ) {
        alert('Спасибо, ваш голос засчитан!');
        this.poll.answerIndex = answerIndex;
        
        const pollResult = this.getRequest('POST', 'https://netology-slow-rest.herokuapp.com/poll.php' );

        pollResult.onreadystatechange = () => {
            if (pollResult.readyState === pollResult.DONE) {
                this.renderPollResult( pollResult.response );
            }
        }   
    }

    createEl( params ) {
        const {tag, _class, _textContent, listener} = params;
        const el = document.createElement(tag);
        el.classList = _class;
        el.textContent = _textContent;
        if(listener) {
            el.addEventListener('click', listener)
        }
        return el;
    }

    renderPoll( pollRequest ) {
        this.container.querySelector('.poll__title').textContent = pollRequest.data.title;
        const answersEl = this.container.querySelector('.poll__answers');
        answersEl.innerHTML = '';
        pollRequest.data.answers.forEach((answer, index) => {
            const sendAnswersBind = this.sendAnswers.bind(this, index)
            const elParams = {
                tag: 'button',
                _class: 'poll__answer',
                _textContent: answer,
                listener: sendAnswersBind,
            }
            answersEl.appendChild( this.createEl( elParams ) );
        });
    }

    renderPollResult( pollResult ) {
        const answersEl = this.container.querySelector('.poll__answers');
        answersEl.innerHTML = '';
        const votesSum = pollResult.stat.reduce((sum, el) => sum + el.votes, 0)
        pollResult.stat.forEach(({answer, votes}) => {
            const result = (votes / votesSum * 100).toFixed(2);
            const elParams = {
                tag: 'div',
                _class: 'poll__result',
                _textContent: `${answer}: ${result}%`,
            }
            answersEl.appendChild( this.createEl( elParams ))
        })
    }
}

const pool1 = new Poll(document.querySelector('.poll'));