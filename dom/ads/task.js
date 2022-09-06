class Rotator {
    constructor(container) {
        this.container = container;
        this.rotatorCaseEl = container.getElementsByClassName('rotator__case');
        this.rotatorId;
    }

    get activeCase() {
        return [...this.rotatorCaseEl].find(el => el.classList.contains('rotator__case_active'));
    }

    get changeSpeed() {
        return +this.activeCase.dataset.speed;
    }

    changeCaseColor() {
        this.activeCase.style.color = this.activeCase.dataset.color;
    }

    nextActiveCase() {
        let num = [...this.rotatorCaseEl].indexOf(this.activeCase);
        this.activeCase.classList.remove('rotator__case_active');
        num = (++num > this.rotatorCaseEl.length - 1) ? 0 : num;
        this.rotatorCaseEl[num].classList.add('rotator__case_active');
        this.changeCaseColor();
    }

    startRotator() {
        this.changeCaseColor();
        let startTimeout = () => {
            this.nextActiveCase();
            this.rotatorId = setTimeout(startTimeout, this.changeSpeed);
        };

        this.rotatorId = setTimeout(startTimeout, this.changeSpeed);

    }
}

const rotator1 = new Rotator(document.querySelector('.rotator'));
rotator1.startRotator();
