class BaseEnemyObject extends MovingObject {
    constructor(position, dimension, className, id, speed, movingDirection) {
        super(position, dimension, className, id, speed, movingDirection);

    }

    update() {
        let screen = document.getElementById("screen");
        console.log(screen.offsetWidth);
        if (this.position.x + this.dimension.x >= screen.offsetWidth) {
            this.movingDirection.x *= -1;
        }

        if (0 > this.position.x) {
            this.movingDirection.x *= -1;
        }

        super.update();
    }
}