(function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleNum = 100;
    const lineDistance = 120;
    const colorRGB = '254, 250, 224';
    const particles = [];
    let interactionParticle = null;

    class Particle {
        constructor(x, y, velocityX, velocityY, size, color) {
            this.x = x;
            this.y = y;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x < 0 || this.x > canvas.width) {
                this.velocityX *= -1;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.velocityY *= -1;
            }
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.draw();
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticles() {
        for (let i = 0; i < particleNum; i++) {
            let size = getRandomArbitrary(1, 3);
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let velocityX = getRandomArbitrary(-2, 2);
            let velocityY = getRandomArbitrary(-2, 2);
            let color = `rgba(${colorRGB}, ${1 - size / 3})`;
            particles.push(
                new Particle(x, y, velocityX, velocityY, size, color)
            );
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
        });
        connect();
    }

    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                let distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
                );
                if (distance < lineDistance) {
                    ctx.strokeStyle = `rgba(${colorRGB}, ${
                        1 - distance / lineDistance
                    })`;
                    ctx.beginPath();
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    function bindEvents() {
        canvas.addEventListener('mouseover', e => {
            if (!interactionParticle) {
                interactionParticle = new Particle(
                    e.x,
                    e.y,
                    0,
                    0,
                    2,
                    `rgba(${colorRGB}, 1)`
                );
                particles.push(interactionParticle);
            }
        });
        canvas.addEventListener('mousemove', e => {
            interactionParticle.x = e.x;
            interactionParticle.y = e.y;
        });
        canvas.addEventListener('mouseout', e => {
            interactionParticle.x = null;
            interactionParticle.y = null;
        });
    }

    createParticles();
    animate();
    bindEvents();
})();
