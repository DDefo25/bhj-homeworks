const dropdownValueEl = document.getElementsByClassName('dropdown__value');
const dropdownItemEl = document.getElementsByClassName('dropdown__item');

Array.from(dropdownValueEl, el => {
    el.onclick = event => {
        event.target.parentElement.querySelector('.dropdown__list').classList.add('dropdown__list_active');
    }
});

Array.from(dropdownItemEl, el => {
    el.onclick = event => {
        event.currentTarget.closest('.dropdown').querySelector('.dropdown__value').textContent = event.target.textContent;
        event.currentTarget.parentElement.classList.remove('dropdown__list_active');
        return false;
    }
})
