class ChatWidget {
    constructor(container) {
        this.container = container;
        this.widgetSide = document.querySelector('.chat-widget__side');
        this.messages = document.querySelector('#chat-widget__messages');
        this.messagesInput = document.querySelector('#chat-widget__input');
        this.timers = {
            idleId: null,
            closeId: null,
        }

        this.widgetSide.addEventListener('click', this);
    }

    handleEvent(event) {
        switch(event.type) {
            case 'change':
                this.messagerAction(event);
                break;
            case 'click': 
                this.popInOut(true);
                break;
        }
    }

    popInOut(show) {
        if (show) {
            this.container.classList.add('chat-widget_active');
            this.messager();
        } else if (!show) {
            this.container.classList.remove('chat-widget_active');
            this.clearMessager();           
        }
    }

    messager() {
        this.messagesInput.focus();
        this.messagesInput.addEventListener('change', this);
    }

    messagerAction(event) {
        this.sendMessage(event.target.value, true);
        this.clearInput();
        this.sendMessage(this.getRandomAnswer());

        clearTimeout(this.timers.idleId);
        clearTimeout(this.timers.closeId);
        this.timers.idleId = setTimeout(() => {
            this.sendMessage(this.getRandomAnswer())
            this.timers.closeId = setTimeout(() => {
                this.sendMessage('Ну пока!');
                setTimeout(this.popInOut.bind(this), 1000, false);
            }, 5000);
        }, 5000);
    }

    sendMessage(message, client = false) {
        const messageTime = { 
            time: new Date(),
            getTime() {
                const hours = (this.time.getHours() > 10) ? this.time.getHours() : '0' + this.time.getHours();
                const minutes = (this.time.getMinutes() > 10) ? this.time.getMinutes() : '0' + this.time.getMinutes();
                return hours + ':' + minutes;
            }
        };

        const messageEl = document.createElement('div');
        const clientMessage = client ? 'message_client' : ''; 
        messageEl.className = `message ${clientMessage}`;
        messageEl.innerHTML = `
            <div class="message__time">${messageTime.getTime()}</div>
            <div class="message__text">${message}</div>
        `;
        this.messages.appendChild(messageEl);
        this.messages.lastChild.scrollIntoView();
    }

    clearInput() {
        this.messagesInput.value = '';
    }

    clearMessager() {
        this.messages.innerHTML = '';
        this.messagesInput.removeEventListener('change', this);
    }

    getRandomAnswer() {
        const answers = [
            'Кто здесь?',
            'Давай по существу',
            'Ойвсё',
            'Не пиши сюда',
            'Вызывали?',
            'Купи наконец что-нибудь',
            'Ты купил что-то?',
            'Пока не купишь, не пиши сюда',
        ]

        return answers[Math.floor(Math.random() * answers.length)];
    }
}

const widget1 = new ChatWidget(document.querySelector('.chat-widget'));