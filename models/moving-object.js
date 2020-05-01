class MovingObject extends StaticObject {
    horizontalSpeed;
    movingDirection;

    constructor(position, dimension, color, id, horizontalSpeed, movingDirection) {
        super(position, dimension, color, id);

        this.horizontalSpeed = horizontalSpeed;
        this.movingDirection = movingDirection;
    }

    update() {
        this.position.x += this.movingDirection.x * this.horizontalSpeed;
        //this.position.y += this.movingDirection.y;
    }

    render() {
        this.htmlElement.setAttribute("style",
            `background-color:` + this.color + `;
             position: absolute;
             left: ` + this.position.x + `px;
             top: ` + this.position.y + `px;
             width: ` + this.dimension.x + `px;
             height: ` + this.dimension.y + `px;
            `
        );
    }
}