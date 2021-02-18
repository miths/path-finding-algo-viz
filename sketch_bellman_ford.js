// import { newGrid } from "./sketch.js";
// console.log(walls.findIndex([0, 3]));

function next_i(i, j) {
  if (i == cols - 1 && j == rows - 1) return 0;
  if (j == rows - 1) {
    return i + 1;
  }
  return i;
}

function next_j(i, j) {
  if (i == cols - 1 && j == rows - 1) return 0;
  if (j == rows - 1) {
    return 0;
  }
  return j + 1;
}

var i = -1;
var j = -1;
console.log(i);

function sketch_bellman_ford(p) {
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

  var graphVisited = 0;
  var path = [];
  // var noSolution = false;
  console.log(i);
  p.heuristic = function (a, b) {
    var d = p.dist(a.i, a.j, b.i, b.j);
    // console.log(d);
    //   var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  };

  p.spot = function (i, j) {
    this.dist = 100000000;
    // this.f = 0;
    // this.g = 0;
    // this.h = 0;
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.parent = undefined;
    this.wall = false;
    this.run = false;
    // this.costTillHere = 0;
    this.visited = 0;
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

    this.addWallsRuns = function (grid) {
      var i = this.i;
      var j = this.j;
      var wall = this.wall;
      var run = this.run;
      var WALL_COLOR = 0;
      var RUN_COLOR = 255;

      if (i < cols - 1) {
        // this.neighbors.push(grid[i + 1][j]);
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
        // this.neighbors.push(grid[i - 1][j]);

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
        // this.neighbors.push(grid[i][j + 1]);

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
        // this.neighbors.push(grid[i][j - 1]);
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
        // this.neighbors.push(grid[i - 1][j - 1]);
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
        // this.neighbors.push(grid[i + 1][j - 1]);

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
        // this.neighbors.push(grid[i - 1][j + 1]);
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
        // this.neighbors.push(grid[i + 1][j + 1]);

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
  console.log(i);
  p.setup = function () {
    st = performance.now();
    console.log(grid);
    p.createCanvas(600, 600);
    p.background(150);

    console.log("bellman ford");

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
      grid[runs[i][0]][runs[i][1]].cost = 0;
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

    start.dist = 0;
    // openSet.push(start);
    end.cost = -5;

    console.log(grid);
  };
  // console.log(i);
  ni = 0;
  nj = -1;

  p.draw = function () {
    i = next_i(ni, nj);
    j = next_j(ni, nj);
    if (i == 0 && j == 0) closedSet = [];
    var current = grid[i][j];
    closedSet.push(current);
    if (current.dist < 100000) {
      var neighbors = current.neighbors;

      for (var k = 0; k < neighbors.length; k++) {
        var neighbor = neighbors[k];
        // console.log("here");
        // if (!closedSet.includes(neighbor)) {
        var tempG = current.dist + neighbor.cost;
        // console.log("tempG");
        if (tempG < neighbor.dist) {
          // console.log("1st if stat");
          neighbor.dist = tempG;
          neighbor.parent = current;
          // console.log("here");
          // newPath = true;
          path = [];
          var temp = neighbor;
          while (temp) {
            path.push(temp);
            temp = temp.parent;
          }

          p.stroke(176, 64, 0);
          p.noFill();
          p.strokeWeight(w * 0.15);
          p.beginShape();

          for (var l = 0; l < path.length; l++) {
            p.vertex(path[l].i * w + w / 2, path[l].j * h + h / 2);
          }
          p.endShape();
        }
        // }
      }
    }
    ni = i;
    nj = j;
    graphVisited += 1;
    if (graphVisited >= cols * rows - 1) {
      console.log(graphVisited);
      path = [];
      var path_cost = 0;
      var temp = grid[cols - 1][rows - 1];
      while (temp) {
        path.push(temp);
        path_cost += temp.cost;
        temp = temp.parent;
      }
      var explored = Math.round((closedSet.length / (cols * rows)) * 100.0);
      end = performance.now();
      console.log(explored);
      document.getElementById("bellman_text").innerHTML =
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

      for (var ii = 0; ii < path.length; ii++) {
        p.vertex(path[ii].i * w + w / 2, path[ii].j * h + h / 2);
      }

      p.endShape();
      p.noLoop(); // to stop looping when done
      console.log("end");
      return;
    }
  };
}
new p5(sketch_bellman_ford, "bellman_ford");
