const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const accuracy = document.getElementById('accuracy');
const titimerme = document.getElementById('timer');

let score = 0;
let targets = [];

function drawTarget(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
};

function isClickInsideTarget(clickX, clickY, targetX, targetY) {
    const distance = Math.sqrt(Math.pow(clickX - targetX, 2) + Math.pow(clickY - targetY, 2));
    return distance <= 22;
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width - 40)) + 20;
    const y = Math.floor(Math.random() * (canvas.height - 40)) + 20;
    return { x, y };
}

function startGame() {
    let timeElapsed = 0;

    const interval = setInterval(() => {
        timer.innerText = `Time: ${60-timeElapsed.toFixed(0)}s`;
        accuracy.innerText = `Accuracy: ${score / 60 * 100}%`;
        if (timeElapsed >= 60) {
            clearInterval(interval);
        } else {
            canvas.onclick = function (e) {
                const clickX = e.clientX - canvas.offsetLeft;
                const clickY = e.clientY - canvas.offsetTop;

                for (let i = 0; i < targets.length; i++) {
                    const target = targets[i];
                    if (isClickInsideTarget(clickX, clickY, target.x, target.y)) {
                        score += 1;
                        ctx.clearRect(target.x - 22, target.y - 22, 44, 44);
                        targets.splice(i, 1);
                    }
                }
            };
            const { x, y } = getRandomPosition();
            drawTarget(x, y);


            targets.push({ x, y });



            const randomTimeout = Math.floor(Math.random() * (1000) + 1000); 
            setTimeout(() => {

                ctx.clearRect(x - 22, y - 22, 44, 44); 
            }, randomTimeout);

            timeElapsed += 0.5;
        }
    }, 200);
}
