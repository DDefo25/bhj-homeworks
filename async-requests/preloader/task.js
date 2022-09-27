class ExchangeRates {
    constructor(container, url) {
        this.container = container;
        this.url = url;
        this.itemsEl = document.querySelector('#items');
        this.currencies = window.localStorage;

        this.renderExchangeRates();
        this.registerEvent();
    }

    registerEvent() {
        const requestCurrencies = this.getRequest( this.url );
        requestCurrencies.addEventListener('readystatechange', () => {
            if (requestCurrencies.readyState === requestCurrencies.DONE) {
                this.currencies.setItem('currencies', JSON.stringify(requestCurrencies.response));
                this.renderExchangeRates();
            }
        });
    }

    getRequest( url ) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        return xhr;
    }

    renderExchangeRates() {
        this.itemsEl.innerHTML = '';
        const currenciesValute = JSON.parse(this.currencies.getItem('currencies'));

        if(currenciesValute) {
            for (let currency of Object.values(currenciesValute.response['Valute'])){
                this.createCurrencyItem(currency['CharCode'], currency['Value'])
            };
            this.container.querySelector('#loader').classList.remove('loader_active');
        }  
    }

    createCurrencyItem(code, value) {
        const currencyEl = this.createElement('div', 'item');
        currencyEl.append(this.createElement('div', 'item__code', code));
        currencyEl.append(this.createElement('div', 'item__value', value));
        currencyEl.append(this.createElement('div', 'item__currency', 'руб.'));
        this.itemsEl.append(currencyEl);
    }

    createElement(tag, _class, textContent) {
        const el = document.createElement(tag);
        el.classList = _class;
        el.textContent = textContent;
        return el;
    }
}

const exchangeRates1 = new ExchangeRates(document.querySelector('.card'), 'https://netology-slow-rest.herokuapp.com');