const modalMainEl = document.getElementById('modal_main');
const modalSuccess = document.getElementById('modal_success');

const modalCloseEl = document.getElementsByClassName('modal__close');
const showSuccessEl = document.getElementsByClassName('show-success');

modalMainEl.classList.add('modal_active');

Array.from(modalCloseEl, el => {
    el.onclick = () => {
        el.closest('.modal').classList.remove('modal_active');
    }
});

Array.from(showSuccessEl, el => {
    el.onclick = () => {
        modalMainEl.classList.remove('modal_active');
        modalSuccess.classList.add('modal_active');
    }
});
