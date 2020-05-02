class MovingObject extends StaticObject {
    speed;
    movingDirection;

    constructor(position, dimension, className, id, speed, movingDirection) {
        super(position, dimension, className, id);

        this.speed = speed;
        this.movingDirection = movingDirection;
    }

    update() {
        this.position.x += this.movingDirection.x * this.speed.x;
        this.position.y += this.movingDirection.y * this.speed.y;
        //this.position.y += this.movingDirection.y;
    }

    render() {
        this.htmlElement.style.left = this.position.x + `px`;
        this.htmlElement.style.top = this.position.y + `px`;
    }
}