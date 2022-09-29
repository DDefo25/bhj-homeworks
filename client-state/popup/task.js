class SubscribeModal {
    constructor(container, param = {}) {
        this.container = container;
        this.param = param;

        this.init();
        this.registerEvent();
    }

    init() {
        if (this.param.show) {
            this.show();
        }
    }

    registerEvent() {
        this.container.querySelector('.modal__close').onclick = this.hide.bind(this);
    }

    show() {
        if (!Cookie.get('subscribe-modal')) {
            this.container.classList.add('modal_active');
            this.param.show = true;  
        } else {
            return false;
        }
    }

    hide() {
        this.container.classList.remove('modal_active');
        Cookie.set('subscribe-modal', 'hide')
        this.param.show = false;
    }


}

class Cookie {
    static get( name ) {
        const cookie = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
        return cookie ? decodeURIComponent(cookie[1]) : undefined;
    }

    static set( name, value, options = {} ) {
        let cookie = `${name}=${encodeURIComponent(value)}`

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        for (let option in options) {
            cookie += "; " + option;
            let value = options[option];
            if (value !== true) {
              cookie += "=" + value;
            }
          }

        document.cookie = cookie;
    }

    static delete( name ) {
        this.set( name, '', {'max-age': -1})
    }
}

const modal = new SubscribeModal(document.querySelector('#subscribe-modal'), {show: true});