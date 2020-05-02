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
            this.htmlElement.setAttribute("style",
                `background-color:` + this.color + `;
                 position: absolute;
                 left: ` + this.position.x + `px;
                 top: ` + this.position.y + `px;
                 width: ` + this.dimension.x + `px;
                 height: ` + this.dimension.y + `px;
                `
            );

            let screenHtmlElement = document.getElementById("screen");
            screenHtmlElement.appendChild(this.htmlElement);
        }
    }

    addStyle(styleName) {
        this.htmlElement.setAttribute("class", styleName);
    }

    update() {

    }

    render() {
        
    }
}