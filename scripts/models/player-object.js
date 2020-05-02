class PlayerObject extends MovingObject {
    constructor(position, dimension, className, id, horizontalSpeed, movingDirection) {
        super(position, dimension, className, id, horizontalSpeed, movingDirection);

        document.addEventListener("keydown", (event) => {
            this.checkKey(event);
        });
    }

    checkKey(e) {
        console.log(e);
        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
            // left arrow
            this.movingDirection.x = -1;
        }
        else if (e.keyCode == '39') {
            // right arrow
            this.movingDirection.x = 1;
        }
    }
}