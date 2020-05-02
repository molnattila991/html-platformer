class StaticObject {
    position;
    dimension;
    id;
    htmlElement;
    class;
    boundingRectangle;

    constructor(position, dimension, className, id) {
        this.position = position;
        this.dimension = dimension;
        this.id = id;
        this.class = className;

        this.boundingRectangle = new BoundingRectangle(this.position, this.dimension);

        this.init();
    }

    init() {
        this.htmlElement = document.getElementById(this.id);

        if (this.htmlElement == undefined) {
            this.htmlElement = document.createElement("DIV");
            this.htmlElement.style.position = "absolute";
            this.htmlElement.style.left = this.position.x + `px`;
            this.htmlElement.style.top = this.position.y + `px`;
            this.htmlElement.style.width = this.dimension.x + `px`;
            this.htmlElement.style.height = this.dimension.y + `px`;

            this.addStyle(this.className);

            let screenHtmlElement = document.getElementById("screen");
            screenHtmlElement.appendChild(this.htmlElement);
        }
    }

    addStyle(styleName) {
        this.htmlElement.classList.add(styleName);
    }

    removeClass(className) {
        this.htmlElement.classList.remove(className);
    }

    update() {

    }

    render() {

    }
}