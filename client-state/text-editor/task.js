class TextEditor {
    constructor(container) {
        this.container = container;
        this.text = container.querySelector('#editor');

        this.registerEvent();
        this.getLocalStorage( 'textEditor' );
    }

    registerEvent() {
        this.text.addEventListener('change', e => {
            localStorage.setItem( 'textEditor', e.target.value.trim() )
        })

        this.text.addEventListener('input', e => {
            if (e.target.value.trim()) {
                this.showBtn();
            } else {
                this.removeBtn();
            }
        })
    }

    getLocalStorage( key ) {
        if( localStorage[key] ) {
            this.text.value = localStorage.getItem(key);
            this.showBtn();
        }
    }

    showBtn() {
        if ( !this.container.querySelector('.button') ) {
            const btn = document.createElement( 'button' );
            btn.classList = 'button';
            btn.textContent = 'Очистить';
            btn.onclick = this.cleanAll.bind(this);
    
            this.container.append( btn );
        }
    }

    removeBtn() {
        const btn = this.container.querySelector('.button'); 
        if ( btn ) {
            btn.remove();
        }
    }

    cleanAll() {
        localStorage.clear();
        this.text.value = '';
        this.removeBtn();
    }
}

const textEditor = new TextEditor(document.querySelector('.card'));