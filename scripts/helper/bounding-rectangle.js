class BoundingRectangle {
    position;
    dimension;
    topLeftPoint;
    topRightPoint;
    bottomLeftPoint;
    bottomRightPoint;

    constructor(position, dimension) {
        this.dimension = dimension;
        this.position = position;

        this.setPosition(this.position)
    }

    setPosition(position) {
        this.position = position;

        this.setRectanglePoints();
    }

    setRectanglePoints() {
        this.topLeftPoint = this.position;

        this.topRightPoint = Vector.zero();
        this.topRightPoint.x = this.position.x + this.dimension.x;
        this.topRightPoint.y = this.position.y;

        this.bottomLeftPoint = Vector.zero();
        this.bottomLeftPoint.x = this.position.x;
        this.bottomLeftPoint.y = this.position.y + this.dimension.y;

        this.bottomRightPoint = Vector.zero();
        this.bottomRightPoint.x = this.position.x + this.dimension.x;
        this.bottomRightPoint.y = this.position.y + this.dimension.x;
    }

    isCollide(otherBoundingRectangle) {
        let collide = false;
        let collisionDirections = [];

        if (this.isPointInRectangle(otherBoundingRectangle.topRightPoint)
            || this.isPointInRectangle(otherBoundingRectangle.topLeftPoint)
            || this.isPointInRectangle(otherBoundingRectangle.bottomRightPoint)
            || this.isPointInRectangle(otherBoundingRectangle.bottomLeftPoint)
        ) {
            collide = true;
        }

        if (collide) {
            if (otherBoundingRectangle.topLeftPoint.x < this.topLeftPoint.x) {
                collisionDirections.push("from-left");
            }

            if (otherBoundingRectangle.topRightPoint.x >  this.topRightPoint.x) {
                collisionDirections.push("from-right");
            }

            if (otherBoundingRectangle.topRightPoint.y >  this.topRightPoint.y) {
                collisionDirections.push("from-bottom");
            }

            if (otherBoundingRectangle.bottomLeftPoint.y <  this.bottomLeftPoint.y) {
                collisionDirections.push("from-top");
            }
        }

        return { collide: collide, collisions: collisionDirections };
    }

    isPointInRectangle(point) {
        return point.x >= this.topLeftPoint.x
            && point.x <= this.bottomRightPoint.x
            && point.y >= this.topLeftPoint.y
            && point.y <= this.bottomRightPoint.y;
    }
}