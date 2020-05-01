const staticObjects = [];
const movingObjects = [];

function initWorld() {

    //Add static objects (bricks)
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

    //Add one moving object 
    let width = 100;
    let height = 100;

    let newObject = new MovingObject(
        new Vector(100, 300),
        new Vector(width, height),
        "green",
        "moving-object-mario-1",
        1,
        new Vector(1, 0)
    );

    newObject.addStyle("moving-object-mario-standing");
    
    movingObjects.push(newObject);
}

function actionsInEveryFrame() {
    update();
    render()
}

function update() {
    for (const item of staticObjects) {
        item.update();
    }

    for (const item of movingObjects) {
        item.update();
    }
}

function render() {
    for (const item of staticObjects) {
        item.render();
    }

    for (const item of movingObjects) {
        item.render();
    }
}