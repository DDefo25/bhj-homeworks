const fontSizeEl = document.querySelectorAll('.font-size');

fontSizeEl.forEach(el => {
    el.addEventListener('click', event => {
        changeFontSize(el);
        event.preventDefault();
    })
})

function changeFontSize(el) {
    [...fontSizeEl].find(el => el.classList.toggle('font-size_active', false));
    el.classList.add('font-size_active');

    const bookEl = el.closest('.book');

    if (bookEl.classList.contains('book_fs-big')) {
        bookEl.classList.remove('book_fs-big');
    } else if (bookEl.classList.contains('book_fs-small')) {
        bookEl.classList.remove('book_fs-small');
    }

    if (el.classList.contains('font-size_big')) {
        bookEl.classList.add('book_fs-big');
    } else if (el.classList.contains('font-size_small')) {
        bookEl.classList.add('book_fs-small');        
    }
};