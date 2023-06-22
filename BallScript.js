let speed;
let maxSpeed = { x: 0, y: 0 };
let isDragging = false;
let bollFalling = false;
let alreadyPointed = false;
const basket = document.getElementById('basket');
const basketPos = document.getElementById('basket-pos');

const basketBall = document.getElementById('basket-Ball');
const ballPos = document.getElementById('ball-pos');

const playerScore = document.getElementById('player-score');
(function () {
    const mousePosText = document.getElementById('mouse-pos');
    const mouseVelText = document.getElementById('mouse-vel');
    const mouseMaxVel = document.getElementById('mouse-max-vel');
    let mousePos = { x: undefined, y: undefined };

    basketPos.textContent = `(${basket.offsetLeft}, ${basket.offsetTop})`;
    ballPos.textContent = `(${basketBall.offsetLeft}, ${basketBall.offsetTop})`;
    window.addEventListener('mousemove', (event) => {
        mousePos = { x: event.clientX, y: event.clientY };
        mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
        speed = { x: event.movementX, y: event.movementY };

        if (speed.x > maxSpeed.x) {
            maxSpeed.x = speed.x;
        };
        if (speed.y > maxSpeed.y) {
            maxSpeed.y = speed.y;
        }
        if (speed.x < 0) {
            if (speed.x < maxSpeed.x) {
                maxSpeed.x = speed.x;
            }
        };
        if (speed.y < 0) {
            if (speed.y < maxSpeed.y) {
                maxSpeed.y = speed.y;
            }
        };
        mouseVelText.textContent = `(${speed.x}, ${speed.y})`;
        mouseMaxVel.textContent = `(${maxSpeed.x}, ${maxSpeed.y})`;
    });
    basketBall.addEventListener('mouseup', toggleBollMoveTrue);
    basketBall.addEventListener('mousedown', toggleBollMoveFalse);
})();


function toggleBollMoveTrue() {
    bollFalling = true;
    isDragging = false;
}
function toggleBollMoveFalse() {
    dragElement(basketBall);
    bollFalling = false;
}

function dragElement(element) {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    if (!element) {
        return;
    }
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
        bollFallingDown(basketBall.offsetLeft, basketBall.offsetTop);
    }
}
function bollFallingDown(x, y) {
    const gravity = 0.1;
    let position = { x: x, y: y };
    let velocity = { x: maxSpeed.x, y: maxSpeed.y };
    const speedScale = 0.5;
    bollFalling = true;
    update(basketBall, gravity, position, velocity, speedScale);
}
function update(object, gravity, position, velocity, speedScale) {
    ballPos.textContent = `(${basketBall.offsetLeft}, ${basketBall.offsetTop})`;
    if (!bollFalling) {
        dragElement(object);
        return;
    }
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
    let basketHeightReference = position.y >= basket.offsetTop && position.y <= (basket.offsetTop + basket.offsetHeight) ? true : false;
    let basketWidthReference = position.x >= basket.offsetLeft && position.x <= (basket.offsetLeft + basket.offsetWidth) ? true : false;
    if (basketHeightReference && basketWidthReference) {
        if (!alreadyPointed) {
            alreadyPointed = true;
            playerScore.textContent++;
        }
    }
    if (!basketHeightReference) {
        if (alreadyPointed) {
            alreadyPointed = false;
        }
    }
    position.x += velocity.x * speedScale;
    position.y += velocity.y * speedScale;

    velocity.y += gravity;

    if ((position.y + object.offsetHeight) >= window.innerHeight) {
        velocity.y *= -0.8;

        position.y = window.innerHeight - object.offsetHeight;
    }
    if (position.y <= 0) {
        velocity.y *= -0.8;

        position.y = 0;
    }
    if ((position.x + object.offsetWidth) >= window.innerWidth) {
        velocity.x *= -0.8;

        position.x = window.innerWidth - object.offsetWidth;
    }
    if (position.x <= 0) {
        velocity.x *= -0.8;

        position.x = 0;
    }

    object.style.top = position.y + "px";
    object.style.left = position.x + "px";

    bollFalling = true;
    requestAnimationFrame(() => update(object, gravity, position, velocity, speedScale));
}
update();