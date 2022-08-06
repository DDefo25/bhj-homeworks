const sliderArrowsEl = document.getElementsByClassName('slider__arrow');
const sliderItemsEl = document.getElementsByClassName('slider__item');
const sliderDotsEl = document.getElementsByClassName('slider__dot');

const sliderItemsArr = Array.from(sliderItemsEl);

Array.from(sliderArrowsEl, el => {
    el.onclick = () => {
        if (el.classList.contains('slider__arrow_prev')) {
            changeSliderByArrow('prev');
        } else if (el.classList.contains('slider__arrow_next')) {
            changeSliderByArrow('next');           
        }
    }
})

Array.from(sliderDotsEl, el => {
    el.onclick = () => changeSliderByDot(el);
})

function changeSliderByArrow(direction) {
    let activeSliderIndex = sliderItemsArr.findIndex(el => el.classList.contains('slider__item_active'));
    sliderItemsEl[activeSliderIndex].classList.remove('slider__item_active');

    if (direction === 'next') {
        activeSliderIndex = ( activeSliderIndex === sliderItemsArr.length - 1 ) ? -1 : activeSliderIndex;
        sliderItemsEl[activeSliderIndex + 1].classList.add('slider__item_active');
    } else if (direction === 'prev') {
        activeSliderIndex = ( activeSliderIndex === 0 ) ? sliderItemsArr.length : activeSliderIndex;
        sliderItemsEl[activeSliderIndex - 1].classList.add('slider__item_active');
    }
}

function changeSliderByDot(el) {
    const activeDotsEl = document.querySelector('.slider__dot_active');
    if (activeDotsEl !== null) {
        activeDotsEl.classList.remove('slider__dot_active');
    }

    el.classList.add('slider__dot_active');
    
    const activeSliderIndex = sliderItemsArr.findIndex(el => el.classList.contains('slider__item_active'));
    const activeDotIndex = Array.from(sliderDotsEl).findIndex(el => el.classList.contains('slider__dot_active'));

    sliderItemsEl[activeSliderIndex].classList.remove('slider__item_active');
    sliderItemsEl[activeDotIndex].classList.add('slider__item_active');
}