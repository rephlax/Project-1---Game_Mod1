const hammer = document.getElementById('hammer');

const hammerOffsetX = 5;
const hammerOffsetY = -80;

export function followCursor(event) {
    const x = event.clientX;
    const y = event.clientY;
    
    hammer.style.left = `${x + hammerOffsetX}px`;
    hammer.style.top = `${y + hammerOffsetY}px`;
}

export function animateHammer() {
    hammer.classList.remove('hammer-animation');
    
    // this is all making sure that when a click happens the animation gets removed.
    void hammer.offsetWidth;
    
    hammer.classList.add('hammer-animation');
}

document.addEventListener('mousemove', followCursor);
document.addEventListener('click', animateHammer);