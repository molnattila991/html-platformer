class PlayerObject extends MovingObject {
    constructor(position, dimension, className, id, speed, movingDirection) {
        super(position, dimension, className, id, speed, movingDirection);

        this.addEventListeners();
    }

    releaseKey(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            this.movingDirection.y = 0;
        }
        else if (e.keyCode == '40') {
            this.movingDirection.y = 0;
        }
        else if (e.keyCode == '37') {
            // left arrow
            this.movingDirection.x = 0;
        }
        else if (e.keyCode == '39') {
            // right arrow
            this.movingDirection.x = 0;
        }
    }

    checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            this.movingDirection.y = -1;
        }
        else if (e.keyCode == '40') {
            // down arrow
            this.movingDirection.y = 1;
        }
        else if (e.keyCode == '37') {
            // left arrow
            this.movingDirection.x = -1;
        }
        else if (e.keyCode == '39') {
            // right arrow
            this.movingDirection.x = 1;
        }

        else if (e.keyCode == '32') {
            if (this.onGround) {
                this.movingDirection.y = 1;
                this.speed.y = -30;
            }
        }
    }

    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            this.checkKey(event);
        });

        document.addEventListener("keyup", (event) => {
            this.releaseKey(event);
        });

        document.addEventListener('mario-die-event', (e) => {
            var x = document.getElementById("mariod-die-sound-effect");
            x.play();
        }, false);
    }
}