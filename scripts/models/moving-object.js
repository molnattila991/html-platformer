class MovingObject extends StaticObject {
    horizontalSpeed;
    movingDirection;

    constructor(position, dimension, className, id, horizontalSpeed, movingDirection) {
        super(position, dimension, className, id);

        this.horizontalSpeed = horizontalSpeed;
        this.movingDirection = movingDirection;
    }

    update() {
        this.position.x += this.movingDirection.x * this.horizontalSpeed;
        //this.position.y += this.movingDirection.y;
    }

    render() {
        this.htmlElement.style.left = this.position.x + `px`;
        this.htmlElement.style.top = this.position.y + `px`;
    }
}