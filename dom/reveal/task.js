const revealEl = document.querySelector('.reveal');

document.addEventListener('scroll', () => {
    let { top, bottom } = revealEl.getBoundingClientRect();
    if ( top > 0 && bottom < window.innerHeight ) {
        revealEl.classList.add('reveal_active');
    }
})