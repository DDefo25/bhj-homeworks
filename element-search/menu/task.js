const menuLinkEl = document.getElementsByClassName('menu__link');
 
Array.from(menuLinkEl, el => {
    el.onclick = () => {
        let menuSubEl = el.closest('.menu__item').querySelector('.menu_sub');
        let menuActiveEl = document.querySelector('.menu_main .menu_active');

        if (menuSubEl !== null) {
            if (menuSubEl.matches('.menu_active')) {
                menuSubEl.classList.remove('menu_active');
            } else {
                if (menuActiveEl !== null) {
                    menuActiveEl.classList.remove('menu_active');
                }
                menuSubEl.classList.add('menu_active');
            }
            return false
        }
    };
})  