var staticObjects = [];
var movingObjects = [];
var playerObjects = [];
var uiLogPanel;
var camera;

var map = [
    { x: -100, y: 500, w: 100, h: 100 },
    { x: -200, y: 600, w: 100, h: 100 },
    { x: -300, y: 700, w: 100, h: 100 },
    { x: -400, y: 800, w: 100, h: 100 },
    { x: -500, y: 900, w: 100, h: 100 },
    { x: -600, y: 1000, w: 100, h: 100 },
    { x: -700, y: 1100, w: 100, h: 100 },
    { x: -800, y: 1200, w: 100, h: 100 },
    { x: -100, y: 500, w: 100, h: 100 },
    { x: -200, y: 400, w: 100, h: 100 },
    { x: -300, y: 300, w: 100, h: 100 },
    { x: -400, y: 200, w: 100, h: 100 },
    { x: -500, y: 100, w: 100, h: 100 },
    { x: -600, y: 0, w: 100, h: 100 },
    { x: -700, y: -100, w: 100, h: 100 },
    { x: -800, y: -200, w: 100, h: 100 },
    { x: -900, y: -300, w: 100, h: 100 },
    { x: -1000, y: -400, w: 100, h: 100 },
    { x: -1100, y: -500, w: 100, h: 100 },
    { x: -1200, y: -600, w: 100, h: 100 },

    { x: 0, y: 500, w: 100, h: 100 },
    { x: 100, y: 500, w: 100, h: 100 },
    { x: 200, y: 500, w: 100, h: 100 },
    { x: 300, y: 500, w: 100, h: 100 },
    { x: 400, y: 500, w: 100, h: 100 },
    { x: 500, y: 500, w: 100, h: 100 },
    { x: 600, y: 500, w: 100, h: 100 },
    { x: 700, y: 500, w: 100, h: 100 },
    { x: 800, y: 500, w: 100, h: 100 },
    { x: 1000, y: 500, w: 100, h: 100 },
    { x: 1100, y: 500, w: 100, h: 100 },
    { x: 600, y: 400, w: 100, h: 100 },
    { x: 600, y: 300, w: 100, h: 100 },
    { x: 700, y: 400, w: 100, h: 100 },
    { x: 800, y: 300, w: 100, h: 100 },
    { x: 900, y: 400, w: 100, h: 100 },
];

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

    let index = 0;
    for (const mapItem of map) {
        let newObject = new StaticObject(
            new Vector(mapItem.x, mapItem.y),
            new Vector(mapItem.w, mapItem.h),
            "green",
            "static-object-" + index++
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
        new Vector(3, 0),
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
        new Vector(11, 11),
        new Vector(0, 1)
    );

    newObjectPlayer.addStyle("moving-object-mario-standing");

    playerObjects.push(newObjectPlayer);

    let screen = document.getElementById("game");
    camera = new Camera(
        new Vector(screen.clientWidth, screen.clientHeight),
        new Vector(0,0),
        newObjectPlayer
    );
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

    for (const enemy of movingObjects) {

        let enemyIsOnGround = false;
        for (const mapItem of staticObjects) {
            let collision = enemy.isCollide(mapItem);
            if (collision.collide) {
                uiLogPanel.updateText([`Enemy (` + enemy.id + `) collided with static (` + mapItem.id + `)`, ...collision.collisions]);

                if (collision.collisions.find(i => i == "from-top") != undefined) {
                    playerIsOnGround = true;
                    var event = new CustomEvent("touch-ground-event" + enemy.id, {
                        detail: {
                            obj1: mapItem,
                            obj2: enemy
                        }
                    });
                    document.dispatchEvent(event);
                }
            }
        }

        if (enemyIsOnGround == false) {
            var event = new CustomEvent("object-is-falling-event" + enemy.id, {
                detail: {
                    obj: enemy
                }
            });
            document.dispatchEvent(event);
        }
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
                    var event = new CustomEvent("touch-ground-event" + player.id, {
                        detail: {
                            obj1: static,
                            obj2: player
                        }
                    });
                    document.dispatchEvent(event);
                }

            }
        }

        if (playerIsOnGround == false) {
            playerIsOnGround = true;
            var event = new CustomEvent("object-is-falling-event" + player.id, {
                detail: {
                    obj: player
                }
            });
            document.dispatchEvent(event);
        }
    }

    camera.update();
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

    camera.render();
}