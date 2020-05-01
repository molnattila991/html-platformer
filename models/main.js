const staticObjects = [];

function initWorld() {

    let newObject = new StaticObject(
        new Vector(10, 10),
        new Vector(100, 100),
        "green",
        "static-object-1"
    );

    newObject.addStyle("static-object-brick");

    staticObjects.push(newObject);
}

function render() {

}