const tabEl = document.getElementsByClassName('tab');
const tabContentEl = document.getElementsByClassName('tab__content');

[...tabEl].forEach(el => {
    el.addEventListener('click', () => {
        changeTab([...tabEl].indexOf(el))
    })
})

function changeTab(index) {
    const activeTabIndex = [...tabEl].findIndex(el => el.classList.contains('tab_active'));
    tabEl[activeTabIndex].classList.remove('tab_active');
    tabContentEl[activeTabIndex].classList.remove('tab__content_active');

    tabEl[index].classList.add('tab_active');
    tabContentEl[index].classList.add('tab__content_active');
}