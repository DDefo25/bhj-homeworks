const sliderArrowsEl = document.getElementsByClassName('slider__arrow');
const sliderItemsEl = document.getElementsByClassName('slider__item');
const sliderItemsArr = Array.from(sliderItemsEl);
const sliderDotsEl = document.getElementsByClassName('slider__dot');

function changeSlider(number) {
    let activeSliderIndex = sliderItemsArr.findIndex(el => el.classList.contains('slider__item_active'));

    sliderItemsEl[activeSliderIndex].classList.remove('slider__item_active');
    sliderDotsEl[activeSliderIndex].classList.remove('slider__dot_active');

    let nextActiveSliderIndex = number;
    if (number >= sliderItemsArr.length) {
        nextActiveSliderIndex = 0;
    } else if (number < 0) {
        nextActiveSliderIndex = sliderItemsArr.length - 1;
    }

    sliderItemsEl[nextActiveSliderIndex].classList.add('slider__item_active');
    sliderDotsEl[nextActiveSliderIndex].classList.add('slider__dot_active');
}

Array.from(sliderArrowsEl, el => {
    el.onclick = () => {
        let activeSliderIndex = sliderItemsArr.findIndex(el => el.classList.contains('slider__item_active'));
        if (el.classList.contains('slider__arrow_next')) {
            changeSlider(activeSliderIndex + 1);
        } else if (el.classList.contains('slider__arrow_prev')) {
            changeSlider(activeSliderIndex - 1);        
        }
    }
});

Array.from(sliderDotsEl).forEach(el => {
    el.onclick = () => {
        changeSlider(Array.from(sliderDotsEl).indexOf(el));
    }
});