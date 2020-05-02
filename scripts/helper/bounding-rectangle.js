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
        this.topRightPoint.x = this.position.x + this.dimension.x;
        this.topRightPoint.y = this.position.y;
        this.bottomLeftPoint.x = this.position.x;
        this.bottomLeftPoint.y = this.position.y + this.dimension.y;
        this.bottomRightPoint.x = this.position.x + this.dimension.x;
        this.bottomRightPoint.y = this.position.y + this.dimension.x;
    }

    isCollide(otherBoundingRectangle) {
        let collide = false;

        if (this.isPointInRectangle(otherBoundingRectangle.topRightPoint)
            || this.isPointInRectangle(otherBoundingRectangle.topLeftPoint)
            || this.isPointInRectangle(otherBoundingRectangle.bottomRightPoint)
            || this.isPointInRectangle(otherBoundingRectangle.bottomLeftPoint)
            ) {
                collide = true;
        }

        return collide;
    }

    isPointInRectangle(point) {
        return point.x >= this.topLeftPoint.x
            && point.x <= this.bottomRightPoint.x
            && point.y >= this.topLeftPoint.y
            && point.y <= this.bottomRightPoint.y;
    }
}