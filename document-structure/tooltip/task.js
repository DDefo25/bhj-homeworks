class Tooltips {
    constructor( container, position = 'bottom' ) {
        this.container = container;
        this.position = position;
        this.hasTooltips = container.querySelectorAll('.has-tooltip');
        this.display = false;

        window.addEventListener('load', () => {
            this.renderTooltips();
            this.registerEvent();
        }, { once: true })
    }

    registerEvent() {
        window.addEventListener('scroll', () => [...this.hasTooltips].forEach(() => this.hideAll()));

        [...this.hasTooltips].forEach(el => {
            el.addEventListener('click', event => {
                event.preventDefault();
                this.showTooltip(event.target);
            })
        })

    }

    renderTooltips() {
        [...this.hasTooltips].forEach(el => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.title;
            tooltip.dataset.position = this.position;
            el.insertAdjacentElement('afterend', tooltip);
        });
    }

    setPosition( tooltip, ownerTooltip ) {
        const pos = tooltip.dataset.position; 
        let shiftY = ( pos === 'top' ) ? -tooltip.offsetHeight : ( pos === 'bottom' ) ? ownerTooltip.offsetHeight : 0;
        let shiftX = ( pos === 'left' ) ? -tooltip.offsetWidth : ( pos === 'right' ) ? ownerTooltip.offsetWidth : 0;
        tooltip.style.top = `${ ownerTooltip.offsetTop - scrollY + shiftY }px`;
        tooltip.style.left = `${ ownerTooltip.offsetLeft - scrollX + shiftX }px`;
    }

    showTooltip( el ) {
        this.hideAll();
        const tooltip = el.nextElementSibling;

        if (this._display === true) {
            tooltip.classList.toggle('tooltip_active');
        }

        this.setPosition(tooltip, el);
    }

    hideAll() {
        [...this.hasTooltips].forEach(el => el.nextElementSibling.classList.remove('tooltip_active'))
    }
    
    get display() {
        return this._display;
    }

    set display(status) {
        this._display = status;
    }
}

const tooltip1 = new Tooltips(document.querySelector('body'), 'top');
tooltip1.display = true;