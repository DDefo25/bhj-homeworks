class Tooltips {
    constructor( container, position = 'bottom' ) {
        this.container = container;
        this.position = position;
        this.hasTooltips = container.querySelectorAll('.has-tooltip');
        this._display = false;

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
                if (this._display === true) {
                    this.showTooltip(event.target);
                }
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
        const tooltip = el.nextElementSibling;
        
        if (!tooltip.classList.contains('tooltip_active')) {
            this.hideAll();
            tooltip.classList.add('tooltip_active');
        } else {
            this.hideAll();            
        }

        this.setPosition(tooltip, el);
    }

    hideAll() {
        [...this.hasTooltips].forEach(el => el.nextElementSibling.classList.remove('tooltip_active'))
    }

    display(status) {
        this._display = status;
    }
}

const tooltip = new Tooltips(document.querySelector('body'), 'top');
tooltip.display(true);