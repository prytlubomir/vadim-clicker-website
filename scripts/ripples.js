
const svg = document.querySelector('.bg-svg');
const ripplesGroup = document.getElementById('cursor-ripples');
let lastPos = { x: 50, y: 50 };
let active = false;

// convert client coords to SVG viewBox coords (0..100)
function clientToViewBox(cx, cy){
    const pt = svg.createSVGPoint();
    pt.x = cx;
    pt.y = cy;
    const screenCTM = svg.getScreenCTM();
    if(screenCTM){
        const invCTM = screenCTM.inverse();
        const transformed = pt.matrixTransform(invCTM);
        return { x: transformed.x, y: transformed.y };
    }
    // fallback if getScreenCTM fails
    const rect = svg.getBoundingClientRect();
    const x = (cx - rect.left) / rect.width * 100;
    const y = (cy - rect.top) / rect.height * 100;
    return { x, y };
}

// spawn a ripple at viewBox coords
function spawnRippleAt(vx, vy){
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx', vx);
    c.setAttribute('cy', vy);
    c.setAttribute('r', 1.6);
    c.classList.add('cursor-ripple');
    ripplesGroup.appendChild(c);
    // remove after animation
    c.addEventListener('animationend', ()=> c.remove());
}

// track pointer
window.addEventListener('pointermove', (e)=>{
    const p = clientToViewBox(e.clientX, e.clientY);
    lastPos = p;
    active = true;
});
window.addEventListener('pointerleave', ()=> active = false);
window.addEventListener('pointerdown', ()=> active = true);

// spawn at an interval while pointer is active; faster speed ~160ms
const SPAWN_MS = 160;
setInterval(()=>{
    if(active && ripplesGroup){
        spawnRippleAt(lastPos.x, lastPos.y);
    }
}, SPAWN_MS);

// touch support: update last pos on touchmove
window.addEventListener('touchmove',(e)=>{
    const t = e.touches[0];
    if(t) {
        const p = clientToViewBox(t.clientX, t.clientY);
        lastPos = p;
        active = true;
    }
}, {passive:true});

// stop spawning when user prefers reduced motion
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
function handleReduced(){
    if(mq.matches){
        active = false;
        // clear existing ripples
        ripplesGroup.innerHTML = '';
    }
}
mq.addEventListener?.('change', handleReduced);
handleReduced();
