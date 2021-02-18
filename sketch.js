var cols = 50;
var rows = 60;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w;
var h;
var path = [];
var walls = [];
var runs = [];
var st;

// var commonGrid;
// var noSolution = false;

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  //   var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function spot(i, j) {
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.i = i;
  this.j = j;
  this.neighbors = [];
  this.parent = undefined;
  this.wall = false;
  this.run = false;
  this.cost = 1;

  var r = random(1);
  var WALL_COLOR = 0;
  var RUN_COLOR = 255;

  if (r < 0.25) {
    this.wall = true;
    walls.push([i, j]);
    this.cost = 3;
    fill(0);
    noStroke();
    // fillc;
    ellipse(i * w + w / 2, j * h + h / 2, w * 0.75, h * 0.75);
    // console.log(walls);
  } else if (r < 0.4) {
    this.run = true;
    runs.push([i, j]);
    this.cost = 0;
    fill(255);
    noStroke();
    // fillc;
    ellipse(i * w + w / 2, j * h + h / 2, w * 0.75, h * 0.75);
  }

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
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, j * h + h / 2);
        endShape();
      } else if (run == true && grid[i + 1][j].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, j * h + h / 2);
        endShape();
      }
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);

      if (wall == true && grid[i - 1][j].wall == true) {
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, j * h + h / 2);
        endShape();
      } else if (run == true && grid[i - 1][j].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, j * h + h / 2);
        endShape();
      }
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);

      if (wall == true && grid[i][j + 1].wall == true) {
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex(i * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      } else if (run == true && grid[i][j + 1].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex(i * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      }
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
      if (wall == true && grid[i][j - 1].wall == true) {
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex(i * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      } else if (run == true && grid[i][j - 1].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex(i * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      }
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
      if (wall == true && grid[i - 1][j - 1].wall == true) {
        stroke(WALL_COLOR);
        noFill();

        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      } else if (run == true && grid[i - 1][j - 1].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      }
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);

      if (wall == true && grid[i + 1][j - 1].wall == true) {
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      } else if (run == true && grid[i + 1][j - 1].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      }
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
      if (wall == true && grid[i - 1][j + 1].wall == true) {
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      } else if (run == true && grid[i - 1][j + 1].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      }
    }
    if (
      i < cols - 1 &&
      j < rows - 1 &&
      (!grid[i][j + 1].wall || !grid[i + 1][j].wall)
    ) {
      this.neighbors.push(grid[i + 1][j + 1]);

      if (wall == true && grid[i + 1][j + 1].wall == true) {
        stroke(WALL_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      } else if (run == true && grid[i + 1][j + 1].run == true) {
        stroke(RUN_COLOR);
        noFill();
        // fill(0);
        strokeWeight(w * 0.75);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      }
    }
  };
}

function setup() {
  st = performance.now();
  let renderer = createCanvas(600, 600);
  background(150);
  renderer.parent("aStar");
  //   createCanvas(600, 600);

  console.log("A*1");

  //   createCanvas(400, 400);
  //   background(270);

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new spot(i, j);
    }
  }

  //   commonGrid = grid.slice();

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  end.cost = -5;
  noStroke();
  fill(color(255, 0, 0));
  rect(0 * w, 0 * h, w - 1, h - 1);
  fill(color(255, 0, 0));
  rect((cols - 1) * w, (rows - 1) * h, w - 1, h - 1);

  openSet.push(start);
  console.log(grid);
  //   commonGrid = grid.slice();
  //   console.log(commonGrid);
}

function draw() {
  if (openSet.length > 0) {
    //   we can keep going

    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
    if (current == end) {
      var path_cost = 0;
      path = [];
      var temp = current;
      while (temp) {
        path.push(temp);
        path_cost += temp.cost;
        temp = temp.parent;
      }
      var explored = Math.round((closedSet.length / (cols * rows)) * 100.0);
      end = performance.now();
      console.log(explored);
      document.getElementById("aStar_text").innerHTML =
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
      console.log(st);
      stroke(0, 255, 0);
      noFill();
      strokeWeight(w / 3);
      beginShape();

      for (var i = 0; i < path.length; i++) {
        vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
      }

      endShape();

      noLoop(); // to stop looping when done
      console.log("end");
      return;
    }

    // openSet.remove(current);
    // var idxToRemove = openSet.findIndex(current);
    openSet.splice(winner, 1);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + neighbor.cost;
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
          newPath = true;
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  } else {
    // noSolution = true;
    noLoop();
    return;
    //   no solution
  }

  path = [];
  var temp = current;
  while (temp) {
    path.push(temp);
    temp = temp.parent;
  }
  //   }
  // for (var i = 0; i < path.length; i++) {
  //   path[i].show(color(0, 0, 255));
  // }

  stroke(176, 64, 0);
  noFill();
  strokeWeight(w * 0.15);
  beginShape();

  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();

  //   console.log(grid);
}
// export { newGrid };
console.log(walls);
