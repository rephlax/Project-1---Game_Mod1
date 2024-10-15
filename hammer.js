const hammer = document.getElementById('hammer');

// preset offset, I didn't go with a responsive design as I couldn't figure out the maths for this on my own :(
const hammerOffsetX = 5;
const hammerOffsetY = -80;

export function followCursor(event) {
    // get the mouse location
    const x = event.clientX;
    const y = event.clientY;
    // offset the hammer to the mouse location
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