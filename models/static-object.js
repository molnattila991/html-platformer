class StaticObject {
    position;
    dimension;
    id;
    htmlElement;
    color;

    constructor(position, dimension, color, id) {
        this.position = position;
        this.dimension = dimension;
        this.id = id;
        this.color = color;

        this.init();
    }

    init() {
        this.htmlElement = document.getElementById(this.id);

        if (this.htmlElement == undefined) {
            this.htmlElement = document.createElement("DIV");
            this.htmlElement.setAttribute("left", this.position.x + "px");
            this.htmlElement.setAttribute("top", this.position.y + "px");
            this.htmlElement.setAttribute("style",
                `background-color:` + this.color + `;
                 width: ` + this.dimension.x + `;
                 height: ` + this.dimension.y + `;
                `
            );

            let screenHtmlElement = document.getElementById("screen");
            screenHtmlElement.appendChild(this.htmlElement);
        }
    }

    update() {

    }

    render() {
        
    }
}