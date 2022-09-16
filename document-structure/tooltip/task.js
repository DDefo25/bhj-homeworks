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
        const tooltipCoord = tooltip.getBoundingClientRect();
        const ownerTooltipCoord = ownerTooltip.getBoundingClientRect();

        let shiftY = ( pos === 'top' ) ? -tooltipCoord.height : ( pos === 'bottom' ) ? ownerTooltipCoord.height : 0;
        let shiftX = ( pos === 'left' ) ? -tooltipCoord.width : ( pos === 'right' ) ? ownerTooltipCoord.width : 0;

        tooltip.style.top = `${ ownerTooltipCoord.y + shiftY }px`;
        tooltip.style.left = `${ ownerTooltipCoord.x + shiftX }px`;
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