class Card {
    constructor(container) {
        this.container = container;
        this.interestEl = this.container.querySelector('.interests_main');

        this.interestEl.addEventListener('change', this);
    }

    handleEvent(event) {
        switch(event.type) {
            case 'change' :
                this.changeCheckbox(event);
                break;
        }
    }
        
    changeCheckbox(event) {
        const checkboxStatus = event.target.checked;

        if (this.childCheckboxes(event.target)) {
            this.childCheckboxes(event.target).forEach(el => {
                el.checked = checkboxStatus;
            })
        }

        this.changeParentCheckbox(event.target);
    }

    parentCheckbox(el) {
        if (el.closest('.interests_active')) {
            return el.closest('.interests_active').closest('.interest').querySelector('.interest__check');
        } else return false
    }

    childCheckboxes(el) {
        if (el.closest('.interest').querySelector('.interests_active')) {
            return el.closest('.interest').querySelector('.interests_active').querySelectorAll('.interest__check');
        } else return false
    }

    changeParentCheckbox(el) {
        let parentCheckboxEl = this.parentCheckbox(el);
        while (parentCheckboxEl) {
            if ([...this.childCheckboxes(parentCheckboxEl)].every(el => el.checked)) {
                parentCheckboxEl.checked = true;
                parentCheckboxEl.indeterminate = false;
            } else if ([...this.childCheckboxes(parentCheckboxEl)].some(el => el.checked)) {
                parentCheckboxEl.checked = false;
                parentCheckboxEl.indeterminate = true;
            } else {
                parentCheckboxEl.checked = false;
                parentCheckboxEl.indeterminate = false;
            }
            parentCheckboxEl = this.parentCheckbox(parentCheckboxEl);
        }
    } 
}

new Card(document.querySelector('.card'));

