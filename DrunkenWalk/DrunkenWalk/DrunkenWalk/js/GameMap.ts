class GameMap {
    private grid: Array<Array<string>>;
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.grid = new Array();
        for (var i = 0; i < width; i++) {
            this.grid[i] = new Array();
            for (var j = 0; j < height; j++) {
                this.grid[i][j] = '#000';
            }
        }
    }

    addLine(x0: number, y0: number, x1: number, y1: number, data) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;

        while (true) {
            this.setElement(x0, y0, data);

            if ((x0 == x1) && (y0 == y1)) break;
            var e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 < dx) { err += dx; y0 += sy; }
        }
    }

    /*
     * Sets the data in the grid at the specified indices to the given data
     */
    setElement(x: number, y: number, data) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height)
                return;
        this.grid[x][y] = data;
    }

    /*
     * Returns the data in the grid at the given indices
     */
    getElement(x: number, y: number) {
        return grid[x][y];
    }

    draw() {
        var size = $("#scale").val() * 5;
        var canv = document.createElement("canvas");
        canv.width = this.width * size;
        canv.height = this.height * size;
        var ctx = canv.getContext("2d");
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                //console.log(i + " " + j + " " + this.grid[i][j]);
                ctx.fillStyle = this.grid[i][j];
                ctx.fillRect(i * size, (this.height - j - 1) * size, size, size);
            }
        }
        $("#canvasHolder").html("");
        $("#canvasHolder").append(canv);
    }

    /**
     * Removes all islands equal to or below the maxSize
     */
    removeIslands(maxSize: number) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
            }
        }
    }
}