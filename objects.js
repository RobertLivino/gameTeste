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
basketBall.addEventListener('mouseup', bollFallingDown);

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

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;

        if (newTop >= 0 && newTop + element.offsetHeight <= screenHeight) {
            element.style.top = newTop + "px";
        }

        if (newLeft >= 0 && newLeft + element.offsetWidth <= screenWidth) {
            element.style.left = newLeft + "px";
        }

        ballPos.textContent = `(${basketBall.offsetLeft}, ${basketBall.offsetTop})`;
    }


    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        bollFallingDown(pos3, pos4);
    }
}
function bollFallingDown(x, y) {
    const gravity = 0.1;
    let position = { x: x, y: y };
    let velocity = { x: 0, y: 0 };
    const speedScale = 0.5;
    update(basketBall, gravity, position, velocity, speedScale);
}
function update(object, gravity, position, velocity, speedScale) {
    ballPos.textContent = `(${basketBall.offsetLeft}, ${basketBall.offsetTop})`;
    if (!object) {
        return;
    }
    if (!gravity) {
        return;
    }
    if (!position) {
        return;
    }
    if (!velocity) {
        return;
    }

    // Atualize a posição do objeto com base na velocidade
    position.x += velocity.x * speedScale;
    position.y += velocity.y * speedScale;

    // Aplique a gravidade à velocidade
    velocity.y += gravity;

    // Verifique se o objeto atingiu o chão
    if ((position.y + object.offsetTop + object.offsetHeight) >= window.innerHeight) {
        // Inverta a velocidade vertical para simular um efeito de salto
        velocity.y *= -0.8;

        // Mantenha o objeto acima do chão
        position.y = window.innerHeight - object.offsetHeight - object.offsetTop;
    }

    // Atualize a posição do elemento HTML
    object.style.transform = `translate(${position.x}px, ${position.y}px)`;

    // Agende a próxima atualização
    requestAnimationFrame(() => update(object, gravity, position, velocity, speedScale));
}
update();