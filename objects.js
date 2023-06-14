const basket = document.getElementById('basket');
const basketPos = document.getElementById('basket-pos');

const basketBall = document.getElementById('basket-Ball');
const ballPos = document.getElementById('ball-pos');
(function () {
    const mousePosText = document.getElementById('mouse-pos');

    let mousePos = { x: undefined, y: undefined };

    basketPos.textContent = `(${basket.offsetLeft}, ${basket.offsetTop})`;
    ballPos.textContent = `(${basketBall.offsetLeft}, ${basketBall.offsetTop})`;
    window.addEventListener('mousemove', (event) => {
        mousePos = { x: event.clientX, y: event.clientY };
        mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
    });
})();

dragElement(basketBall);

function dragElement(element) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        ballPos.textContent = `(${basketBall.offsetLeft}, ${basketBall.offsetTop})`;
    }

    function closeDragElement(e) {
        let windowHeight = window.innerHeight
        let elementPos = element.offsetTop + element.offsetHeight
        while (windowHeight > elementPos) {
            element.style.top = (element.offsetTop + 1) + "px";
            elementPos = element.offsetTop + element.offsetHeight
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }
}