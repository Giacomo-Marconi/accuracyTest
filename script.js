const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const accuracy = document.getElementById('accuracyProgress');
const titimerme = document.getElementById('timer');

let score = 0;
let targets = [];
let generated = 0;

function drawTarget(x, y) {
    generated += 1;
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

function isOverlapping(x, y) {
    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        const distance = Math.sqrt(Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2));
        if (distance < 60) {  
            return true;
        }
    }
    return false;
}

function showResults(finalAccuracy) {
    const overlay = document.createElement('div');
    overlay.id = 'resultOverlay';

    const line = document.createElement('div');
    line.id = 'resultline';

    const accuracyText = document.createElement('div');
    accuracyText.textContent = `Accuracy: ${finalAccuracy}%`;

    const progressBar = document.createElement('div');
    progressBar.id = 'resultBar';

    const progress = document.createElement('div');
    progress.style.width = `${finalAccuracy}%`;
    progressBar.appendChild(progress);

    line.appendChild(accuracyText);
    line.appendChild(progressBar);
    overlay.appendChild(line);
    document.body.appendChild(overlay);
}

function startGame() {
    let timeElapsed = 0;

    const interval = setInterval(() => {
        timer.innerText = `Time: ${20 - timeElapsed.toFixed(0)}s`;
        
        const val = Math.floor(score / generated * 100);
        accuracy.value = isNaN(val) ? 0 : val;

        if (timeElapsed >= 20) {
            clearInterval(interval);

            const finalAccuracy = Math.floor((score / generated) * 100) || 0;
            showResults(finalAccuracy);
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

            let x, y;
            do {
                const position = getRandomPosition();
                x = position.x;
                y = position.y;
            } while (isOverlapping(x, y));

            drawTarget(x, y);
            targets.push({ x, y });

            const randomTimeout = Math.floor(Math.random() * 1000 + 1000);
            setTimeout(() => {
                ctx.clearRect(x - 22, y - 22, 44, 44);
            }, randomTimeout);

            timeElapsed += 0.5;
        }
    }, 500);
}


