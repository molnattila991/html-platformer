class Camera {
    viewPort;
    position;
    player;

    gameScreenHtml;
    margin;

    movingRect = new Vector(200, 200);

    constructor(viewPort, position, player) {
        this.viewPort = viewPort;
        this.position = position;
        this.player = player;
        this.margin = new Vector(0, 0);
        this.gameScreenHtml = document.getElementById("game");
    }

    update() {



        if (this.player.position.x - this.movingRect.x < this.position.x) {
            this.position.x += (this.player.position.x - this.movingRect.x - this.position.x);
        }

        if (this.player.position.x + this.player.dimension.x - this.movingRect.x > this.position.x + this.viewPort.x) {
            let pix = (this.player.position.x + this.player.dimension.x - this.movingRect.x) - (this.position.x + this.viewPort.x);
            this.position.x += (pix);
        }

        if (this.player.position.y - this.movingRect.y < this.position.y) {
            this.position.y += (this.player.position.y - this.movingRect.y - this.position.y);
        }

        if (this.player.position.y + this.player.dimension.y + this.movingRect.y > this.position.y + this.viewPort.y) {
            let pix = (this.player.position.y + this.player.dimension.y + this.movingRect.y) - (this.position.y + this.viewPort.y);
            this.position.y += (pix);
        }
    }

    render() {
        this.gameScreenHtml.style.marginLeft = -this.position.x + `px`;
        this.gameScreenHtml.style.marginTop = -this.position.y + `px`;
    }

}