class Matrix {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
        this.fontSize = 14;
        this.columns = this.canvas.width/this.fontSize;
        this.drops = [];
        this.initialize();
    }

    initialize() {
        for(let x = 0; x < this.columns; x++)
            this.drops[x] = 1;
    }

    draw() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = "#00ff9d";
        this.ctx.font = this.fontSize + "px monospace";

        for(let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i*this.fontSize, this.drops[i]*this.fontSize);
            
            if(this.drops[i]*this.fontSize > this.canvas.height && Math.random() > 0.975)
                this.drops[i] = 0;
            
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix effect
const canvas = document.createElement('canvas');
canvas.classList.add('matrix-bg');
document.querySelector('.hero-background').appendChild(canvas);
const matrix = new Matrix(canvas);
matrix.animate();
