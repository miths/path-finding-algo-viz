// import { newGrid } from "./sketch.js";
// console.log(walls.findIndex([0, 3]));
function sketch_bfs(p) {
  //   var lgrid = grid.slice();
  console.log(grid);
  //   console.log(grid.slice());
  //   var cols = 10;
  //   var rows = 10;
  var grid = new Array(cols);
  var openSet = [];
  var closedSet = [];
  var start;
  var end;
  //   var w;
  //   var h;
  var path = [];
  //   var queue = [];
  // var noSolution = false;

  p.heuristic = function (a, b) {
    var d = p.dist(a.i, a.j, b.i, b.j);
    // console.log(d);
    //   var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  };

  p.spot = function (i, j) {
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.parent = undefined;
    this.wall = false;
    this.run = false;
    this.cost = 1;

    if (this.wall) {
      p.fill(0);
      p.noStroke();
      // fillc;
      p.ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    }
    this.show = function (color) {
      // fill(color);
      if (this.wall) {
        p.fill(0);
        p.noStroke();
        // fillc;
        p.ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
      }
      // else {
      //   fill(150);
      //   rect(this.i * w, this.j * h, w - 1, h - 1);
      // }
    };

    this.addNeighbors = function (grid) {
      var i = this.i;
      var j = this.j;
      var wall = this.wall;
      var run = this.run;
      var WALL_COLOR = 0;
      var RUN_COLOR = 255;

      if (i < cols - 1) {
        this.neighbors.push(grid[i + 1][j]);
        if (wall == true && grid[i + 1][j].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, j * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i + 1][j].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, j * h + h / 2);
          p.endShape();
        }
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);

        if (wall == true && grid[i - 1][j].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, j * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i - 1][j].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, j * h + h / 2);
          p.endShape();
        }
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j + 1]);

        if (wall == true && grid[i][j + 1].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex(i * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i][j + 1].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex(i * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        }
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
        if (wall == true && grid[i][j - 1].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex(i * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i][j - 1].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex(i * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        }
      }
      if (i > 0 && j > 0) {
        this.neighbors.push(grid[i - 1][j - 1]);
        if (wall == true && grid[i - 1][j - 1].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();

          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i - 1][j - 1].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        }
      }
      if (i < cols - 1 && j > 0) {
        this.neighbors.push(grid[i + 1][j - 1]);

        if (wall == true && grid[i + 1][j - 1].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i + 1][j - 1].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        }
      }
      if (i > 0 && j < rows - 1) {
        this.neighbors.push(grid[i - 1][j + 1]);
        if (wall == true && grid[i - 1][j + 1].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i - 1][j + 1].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        }
      }
      if (
        i < cols - 1 &&
        j < rows - 1 &&
        (!grid[i][j + 1].wall || !grid[i + 1][j].wall)
      ) {
        this.neighbors.push(grid[i + 1][j + 1]);

        if (wall == true && grid[i + 1][j + 1].wall == true) {
          p.stroke(WALL_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        } else if (run == true && grid[i + 1][j + 1].run == true) {
          p.stroke(RUN_COLOR);
          p.noFill();
          // fill(0);
          p.strokeWeight(w * 0.75);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        }
      }
    };
  };

  p.setup = function () {
    st = performance.now();
    console.log(grid);
    //   let renderer = createCanvas(600, 600);
    //   background(170);
    //   renderer.parent("aStar");
    p.createCanvas(600, 600);
    p.background(150);

    console.log("bfs");

    //   createCanvas(400, 400);
    //   background(270);

    w = p.width / cols;
    h = p.height / rows;

    for (var i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j] = new p.spot(i, j);
      }
    }

    for (var i = 0; i < walls.length; i++) {
      grid[walls[i][0]][walls[i][1]].wall = true;
      grid[walls[i][0]][walls[i][1]].cost = 3;
      p.fill(0);
      p.noStroke();
      // fillc;
      p.ellipse(
        walls[i][0] * w + w / 2,
        walls[i][1] * h + h / 2,
        w * 0.75,
        h * 0.75
      );
    }
    for (var i = 0; i < runs.length; i++) {
      grid[runs[i][0]][runs[i][1]].run = true;
      grid[runs[i][0]][runs[i][1]].cost = -2;
      p.fill(255);
      p.noStroke();
      // fillc;
      p.ellipse(
        runs[i][0] * w + w / 2,
        runs[i][1] * h + h / 2,
        w * 0.75,
        h * 0.75
      );
    }

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    p.noStroke();
    p.fill(p.color(255, 0, 0));
    p.rect(0 * w, 0 * h, w - 1, h - 1);
    p.fill(p.color(255, 0, 0));
    p.rect((cols - 1) * w, (rows - 1) * h, w - 1, h - 1);

    openSet.push(start);
    console.log(grid);
  };

  p.draw = function () {
    if (openSet.length > 0) {
      //   we can keep going
      var current = openSet[0];

      if (current == end) {
        path = [];
        var path_cost = 0;
        var temp = current;
        while (temp) {
          path.push(temp);
          path_cost += temp.cost;
          temp = temp.parent;
        }
        var explored = Math.round((closedSet.length / (cols * rows)) * 100.0);
        end = performance.now();
        console.log(explored);
        document.getElementById("bfs_text").innerHTML =
          "Graph explored: " +
          explored +
          "%" +
          "<br />" +
          "Path Cost: " +
          path_cost +
          "<br/>" +
          "Time: " +
          (end - st).toFixed(2) +
          " ms";

        //   console.log(path);
        p.stroke(0, 255, 0);
        p.noFill();
        p.strokeWeight(w * 0.25);
        p.beginShape();

        for (var i = 0; i < path.length; i++) {
          p.vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
        }

        p.endShape();
        p.noLoop(); // to stop looping when done
        console.log("end");
        return;
      }

      // openSet.remove(current);
      // var idxToRemove = openSet.findIndex(current);
      //   openSet.splice(0, 1);
      openSet.shift();
      closedSet.push(current);
      //   console.log(current);
      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        if (
          !closedSet.includes(neighbors[i]) &&
          !openSet.includes(neighbors[i])
        ) {
          openSet.push(neighbors[i]);
          neighbors[i].parent = current;
        }
        // console.log(current);
      }
      //   console.log(openSet.length + " openset");
      //   console.log(closedSet.length + " closedset");
    } else {
      // noSolution = true;
      p.noLoop();
      return;
      //   no solution
    }

    //   if (!noSolution) {
    path = [];
    var temp = current;
    while (temp) {
      path.push(temp);
      temp = temp.parent;
      //   console.log(" here");
    }

    //   }
    // for (var i = 0; i < path.length; i++) {
    //   path[i].show(p.color(0, 0, 255));
    // }
    // console.log(path.length);
    p.stroke(176, 64, 0);
    p.noFill();
    p.strokeWeight(w * 0.15);
    p.beginShape();

    for (var i = 0; i < path.length; i++) {
      p.vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    p.endShape();

    //   console.log(grid);
  };
}
new p5(sketch_bfs, "BFS");
