const dropdownValueEl = document.getElementsByClassName('dropdown__value');
const dropdownItemEl = document.getElementsByClassName('dropdown__item');

Array.from(dropdownValueEl, el => {
    el.onclick = event => {
        event.target.nextElementSibling.classList.add('dropdown__list_active');
    }
});

Array.from(dropdownItemEl, el => {
    el.onclick = event => {
        event.currentTarget.parentElement.previousElementSibling.textContent = event.target.textContent;
        event.currentTarget.parentElement.classList.remove('dropdown__list_active');
        return false;
    }
})
