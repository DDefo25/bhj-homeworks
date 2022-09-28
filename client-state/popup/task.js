class SubscribeModal {
    constructor(container, param) {
        this.container = container;
        this.param = param ? param : {};

        if (this.param.show) {
            this.show();
        }

        this.registerEvent();
    }

    registerEvent() {
        this.container.querySelector('.modal__close').onclick = this.hide.bind(this);
    }

    show() {
        if (!this.getCookie('subscribe-modal')) {
            this.container.classList.add('modal_active');
            this.param.show = true;  
        } else {
            return false;
        }
    }

    hide() {
        this.container.classList.remove('modal_active');
        this.setCookie('subscribe-modal', 'hide')
        this.param.show = false;
    }

    getCookie( name ) {
        const cookie = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
        return cookie ? decodeURIComponent(cookie[1]) : undefined;
    }

    setCookie( name, value ) {
        document.cookie = `${name}=${encodeURIComponent(value)}`
    }
}

const modal = new SubscribeModal(document.querySelector('#subscribe-modal'), {show: true});