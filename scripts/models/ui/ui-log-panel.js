class UiLogPanel {
    htmlElement;

    constructor() {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add("ui-log-panel");

        this.screenHtmlElement = document.getElementById("debug");
        this.screenHtmlElement.appendChild(this.htmlElement);
    }

    updateText(textArray) {
        let htmlList = document.createElement("ul");

        for (const text of textArray) {
            let htmlListElement = document.createElement("li");
            htmlListElement.innerText = text;
            htmlList.appendChild(htmlListElement);
        }

        this.htmlElement.appendChild(htmlList);
    }

    clearContent() {
        this.htmlElement.innerHTML = '';
    }
}