//<reference path="jquery.d.ts"/>
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

function drunkenWalk(posX, posY, numSteps, centralization, grid) {
    if (grid == undefined)
        grid = getEmptyGrid(stats.gridWidth, stats.gridHeight);
else
        grid = grid;

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
        grid[posX][posY] = '#444';
    }
    return grid;
}

/*
* eq should be an equation in the
* from of y=f(x);
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

function addPathToGrid(grid, path) {
    for (var x = 0; x < path.length; x++) {
        grid[x][path[x]] = "#ff0000";
    }
    return grid;
}

function addPathDrunkenlyToGrid(grid, path) {
    for (var x = 0; x < path.length; x++) {
        grid = drunkenWalk(x, path[x], 100, 0, grid);
    }
    return grid;
}

function getEmptyGrid(width, height) {
    var grid = new Array();
    for (var i = 0; i < width; i++) {
        grid[i] = new Array();
        for (var j = 0; j < height; j++) {
            grid[i][j] = '#000';
        }
    }
    return grid;
}

function drawGrid(grid) {
    var size = $("#scale").val() * 5;

    //drawing
    var canv = document.createElement("canvas");
    canv.width = stats.gridWidth * size;
    canv.height = stats.gridHeight * size;
    var ctx = canv.getContext("2d");
    for (var i = 0; i < stats.gridWidth; i++) {
        for (var j = 0; j < stats.gridHeight; j++) {
            //console.log(i + " " + j + " " + grid[i][j]);
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * size, (stats.gridHeight - j - 1) * size, size, size);
        }
    }
    $("#canvasHolder").html("");
    $("#canvasHolder").append(canv);
}

updateStats();

//drawGrid(drunkenWalk(stats.gridWidth/2, stats.gridHeight/2, stats.numSteps, stats.centralization));
var grid = getEmptyGrid(stats.gridWidth, stats.gridHeight);
grid = addPathDrunkenlyToGrid(grid, getPathFromEq("y=x", 0, stats.gridWidth));
drawGrid(grid);
//# sourceMappingURL=DrunkenWalk.js.map
