var staticObjects = [];
var movingObjects = [];
var playerObjects = [];
var uiLogPanel;

function reset() {
    staticObjects = [];
    movingObjects = [];
    playerObjects = [];
    uiLogPanel = new UiLogPanel();
}

function initWorld() {
    this.reset();

    let width = 100;
    let height = 100;

    //Add static objects (bricks)
    for (let index = 0; index < 10; index++) {
        let newObject = new StaticObject(
            new Vector(width * index, 500),
            new Vector(width, height),
            "green",
            "static-object-" + index
        );

        newObject.addStyle("static-object-brick");

        staticObjects.push(newObject);
    }

    for (let index = 0; index < 10; index++) {
        let platformIndex = index + 10;
        let newObject = new StaticObject(
            new Vector(width * index, 600),
            new Vector(width, height),
            "green",
            "static-object-" + platformIndex
        );

        newObject.addStyle("static-object-brick");

        staticObjects.push(newObject);
    }



    //Add one moving object 
    let newObject = new BaseEnemyObject(
        new Vector(100, 360),
        new Vector(width, height),
        "green",
        "moving-object-mario-1",
        new Vector(10, 0),
        new Vector(1, 0)
    );

    newObject.addStyle("moving-object-mario-standing");

    movingObjects.push(newObject);


    //Add player moving object
    let newObjectPlayer = new PlayerObject(
        new Vector(400, 300),
        new Vector(width, height),
        "green",
        "player-object-mario-1",
        new Vector(15, 15),
        new Vector(0, 1)
    );

    newObjectPlayer.addStyle("moving-object-mario-standing");

    playerObjects.push(newObjectPlayer);
}

function actionsInEveryFrame() {
    update();
    render()
}

function update() {
    uiLogPanel.clearContent();

    for (const item of staticObjects) {
        item.update();
    }

    for (const item of movingObjects) {
        item.update();
    }

    for (const item of playerObjects) {
        item.update();
    }

    for (const player of playerObjects) {
        for (const enemy of movingObjects) {
            let collision = player.isCollide(enemy);
            if (collision.collide) {
                uiLogPanel.updateText([`Player (` + player.id + `) collided with enemy (` + enemy.id + `)`, ...collision.collisions]);

                if (collision.collisions.find(i => i == "from-top") == undefined)
                    document.dispatchEvent(eventMarioDie);
            }
        }

        let playerIsOnGround = false;
        for (const static of staticObjects) {
            let collision = player.isCollide(static);

            if (collision.collide) {
                uiLogPanel.updateText([`Player (` + player.id + `) collided with static object (` + static.id + `)`, ...collision.collisions]);

                if (collision.collisions.find(i => i == "from-top") != undefined) {
                    playerIsOnGround = true;
                    var event = new CustomEvent("touch-ground-event", {
                        detail: {
                            obj1: static,
                            obj2: player
                        }
                    });
                    document.dispatchEvent(event);
                }

            }
        }

        if(playerIsOnGround == false) {
            playerIsOnGround = true;
                    var event = new CustomEvent("object-is-falling-event", {
                        detail: {
                            obj: player
                        }
                    });
                    document.dispatchEvent(event);
        }
    }
}

function render() {
    for (const item of staticObjects) {
        item.render();
    }

    for (const item of movingObjects) {
        item.render();
    }

    for (const item of playerObjects) {
        item.render();
    }
}