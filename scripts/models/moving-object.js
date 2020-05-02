class MovingObject extends StaticObject {
    speed;
    movingDirection;
    gravitation = 2;
    onGround = false;

    constructor(position, dimension, className, id, speed, movingDirection) {
        super(position, dimension, className, id);

        this.speed = speed;
        this.movingDirection = movingDirection;

        document.addEventListener('touch-ground-event', (e) => {
            if (e.detail.obj2.id == this.id) {
                this.onGround = true;
                this.speed.y = 0;
                this.movingDirection.y = 0;
                this.position.y = e.detail.obj1.position.y - this.dimension.y;
            }
        }, false);

        document.addEventListener('object-is-falling-event', (e) => {
            if (e.detail.obj.id == this.id) {
                this.onGround = false;
                this.movingDirection.y = 1;
            }
        }, false);
    }

    update() {
        if (this.onGround == false && this.speed.y <= 10) {
            this.speed.y += 2;
        }

        this.position.x += this.movingDirection.x * this.speed.x;
        this.position.y += this.movingDirection.y * this.speed.y;
        //this.position.y += this.movingDirection.y;

        this.boundingRectangle.setPosition(this.position);
    }

    render() {
        this.htmlElement.style.left = this.position.x + `px`;
        this.htmlElement.style.top = this.position.y + `px`;
    }
}