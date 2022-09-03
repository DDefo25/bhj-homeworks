const controlFontSizeEl = document.querySelectorAll('.font-size');
const controlColorTextEl = document.querySelectorAll('.book__control_color > .color');
const controlColorBgEl = document.querySelectorAll('.book__control_background > .color');

controlFontSizeEl.forEach(el => {
    el.onclick = () => {
        changeFontSize(el);
        return false;
    }
})

controlColorTextEl.forEach(el => {
    el.onclick = () => {
        changeColorText(el, controlColorTextEl);
        return false;
    }
})

controlColorBgEl.forEach(el => {
    el.onclick = () => {
        changeColorText(el, controlColorBgEl);
        return false;
    }
})

function changeFontSize(el) {
    [...controlFontSizeEl].find(el => el.classList.toggle('font-size_active', false));
    el.classList.add('font-size_active');   

    const bookEl = el.closest('.book');

    const bookElClass = [...bookEl.classList].find(cl => /^book_fs-/.test(cl));

    if (bookElClass !== undefined) {
        bookEl.classList.remove(bookElClass);
    }

    bookEl.classList.add(`book_fs-${el.dataset.size}`);
};

function changeColorText(el, arr) {
    [...arr].find(el => el.classList.toggle(`color_active`, false));
    el.classList.add(`color_active`);

    const bookControl = el.closest('.book__control');
    let targetDataSet;

    if (bookControl.classList.contains('book__control_color')) {
        targetDataSet = ['color', 'textColor'];
    } else if (bookControl.classList.contains('book__control_background')) {
        targetDataSet = ['bg', 'bgColor'];
    }

    const bookEl = el.closest('.book');
    const re = new RegExp(`^book_${targetDataSet[0]}`);
    const bookElClass = [...bookEl.classList].find(class_ => re.test(class_));

    if (bookElClass !== undefined) {
        bookEl.classList.remove(bookElClass);
    }

    bookEl.classList.add(`book_${targetDataSet[0]}-${el.dataset[targetDataSet[1]]}`);
};