const staticObjects = [];

function initWorld() {


    for (let index = 0; index < 10; index++) {
        let width = 100;
        let height = 100;

        let newObject = new StaticObject(
            new Vector(width * index, 500),
            new Vector(width, height),
            "green",
            "static-object-" + index
        );

        newObject.addStyle("static-object-brick");

        staticObjects.push(newObject);
    }


}

function render() {

}