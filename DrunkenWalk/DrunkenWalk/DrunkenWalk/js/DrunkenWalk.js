//<reference path="jquery.d.ts"/>
//<reference path="GameMap.ts"/>
var stats = {
    gridHeight: 0,
    gridWidth: 0,
    numSteps: 0,
    centralization: 0
};

function updateStats() {
    stats.gridHeight = $("#gridHeight").val();
    stats.gridWidth = $("#gridWidth").val();
    stats.numSteps = $("#numSteps").val();
    stats.centralization = $("#centralization").val();
}

/**
*
*/
function drunkenWalk(posX, posY, numSteps, centralization, map) {
    if (map == undefined)
        map = new GameMap(stats.gridWidth, stats.gridHeight);

    var size = $("#scale").val() * 5;
    var pi = 3 + 1 / 7;

    //var targetX = stats.gridWidth/2;
    //var targetY = stats.gridHeight/2;
    var targetX = stats.gridWidth / 2;
    var targetY = stats.gridHeight / 2;

    for (var i = 0; i < numSteps; i++) {
        var angle = Math.random() * 2 * pi;

        //need to get the vector to the center
        var deltaX = targetX - posX;
        var deltaY = targetY - posY;
        var angleToCenter = Math.atan(deltaY / deltaX);
        if (posX > targetX)
            angleToCenter += pi;

        //console.log(" tX: " + targetX + " tY: " + targetY + " pX: " + posX + " pY: " + posY + " angle: " + angleToCenter);
        //console.log(angleToCenter);
        var distToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        var rand = Math.random();
        var dirX = Math.random() * 2 - 1;
        var dirY = Math.random() * 2 - 1;

        if (!isNaN(angleToCenter)) {
            dirX += Math.cos(angleToCenter) * distToCenter / stats.gridWidth / 2 * centralization;
            dirY += Math.sin(angleToCenter) * distToCenter / stats.gridHeight / 2 * centralization;
        }

        if (Math.abs(dirX) > Math.abs(dirY)) {
            if (dirX > 0) {
                if (posX < stats.gridWidth - 1)
                    posX++;
            } else {
                if (posX > 0)
                    posX--;
            }
        } else {
            if (dirY > 0) {
                if (posY < stats.gridHeight - 1)
                    posY++;
            } else {
                if (posY > 0)
                    posY--;
            }
        }

        //console.log(posX + " " + posY);
        map.setElement(posX, posY, '#444');
    }
    return map;
}

/**
* Returns a continuous path, using the given equation
*/
function getPathFromEq(eq, startX, endX) {
    var path = new Array();
    var y;
    for (var x = startX; x < endX; x++) {
        eval(eq);
        path[x] = Math.floor(y);
    }
    return path;
}

function addPathToMap(map, path) {
    for (var x = 0; x < path.length; x++) {
        map.setElement(x, path[x], "#ff0000");
    }
    return map;
}

function addPathDrunkenlyToMap(map, path) {
    for (var x = 0; x < path.length; x++) {
        if (x != 0) {
            map.addLine(x - 1, path[x - 1], x, path[x], "#ff0000");
            map.addLine(x, path[x - 1], x + 1, path[x], "#ff0000");
        }
        map = drunkenWalk(x, path[x], 100, 0, map);
    }
    return map;
}

updateStats();

//drawGrid(drunkenWalk(stats.gridWidth/2, stats.gridHeight/2, stats.numSteps, stats.centralization));
var grid = new GameMap(stats.gridWidth, stats.gridHeight);
grid = addPathDrunkenlyToMap(grid, getPathFromEq("y=x", 0, stats.gridWidth));
grid.draw();
//# sourceMappingURL=DrunkenWalk.js.map
