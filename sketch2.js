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

  if (random(1) < 0.3) {
    this.wall = true;
  }

  if (this.wall) {
    fill(0);
    noStroke();
    // fillc;
    ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
  }
  this.show = function (color) {
    // fill(color);
    if (this.wall) {
      fill(0);
      noStroke();
      // fillc;
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
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

    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
      if (wall == true && grid[i + 1][j].wall == true) {
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, j * h + h / 2);
        endShape();
      }
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
      if (wall == true && grid[i - 1][j].wall == true) {
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, j * h + h / 2);
        endShape();
      }
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
      if (wall == true && grid[i][j + 1].wall == true) {
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex(i * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      }
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
      if (wall == true && grid[i][j - 1].wall == true) {
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex(i * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      }
    }
    if (i > 0 && j > 0 && (!grid[i][j - 1].wall || !grid[i - 1][j].wall)) {
      this.neighbors.push(grid[i - 1][j - 1]);
      if (wall == true && grid[i - 1][j - 1].wall == true) {
        // grid[i - 1][j].wall = true;
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i - 1) * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      }
    }
    if (
      i < cols - 1 &&
      j > 0 &&
      (!grid[i][j - 1].wall || !grid[i + 1][j].wall)
    ) {
      this.neighbors.push(grid[i + 1][j - 1]);
      if (wall == true && grid[i + 1][j - 1].wall == true) {
        // grid[i][j - 1] = true;
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, (j - 1) * h + h / 2);
        endShape();
      }
    }
    if (
      i > 0 &&
      j < rows - 1 &&
      (!grid[i][j + 1].wall || !grid[i - 1][j].wall)
    ) {
      this.neighbors.push(grid[i - 1][j + 1]);
      if (wall == true && grid[i - 1][j + 1].wall == true) {
        // grid[i][j + 1] = true;
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
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
        // grid[i + 1][j] = true;
        stroke(0);
        noFill();
        // fill(0);
        strokeWeight(w / 2);
        beginShape();
        vertex(i * w + w / 2, j * h + h / 2);
        vertex((i + 1) * w + w / 2, (j + 1) * h + h / 2);
        endShape();
      }
    }
  };
}

function setup() {
  let renderer1 = createCanvas(600, 600);
  renderer1.parent("aStar2");
  //   createCanvas(600, 600);
  renderer1.background(170);
  console.log("A*2");

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

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  noStroke();
  fill(color(255, 0, 0));
  rect(0 * w, 0 * h, w - 1, h - 1);
  fill(color(255, 0, 0));
  rect((cols - 1) * w, (rows - 1) * h, w - 1, h - 1);

  openSet.push(start);
  console.log(grid);
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
      path = [];
      var temp = current;
      while (temp) {
        path.push(temp);
        temp = temp.parent;
      }
      //   console.log(path);
      stroke(0, 255, 0);
      noFill();
      strokeWeight(w / 2);
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

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;
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
  //   background(170);
  //   for (var i = 0; i < cols; i++) {
  //     for (var j = 0; j < rows; j++) {
  //       grid[i][j].show(color(255));
  //     }
  //   }

  //   for (var i = 0; i < closedSet.length; i++) {
  //     closedSet[i].show(color(255, 0, 0));
  //   }

  //   for (var i = 0; i < openSet.length; i++) {
  //     openSet[i].show(color(0, 255, 0));
  //   }

  //   if (!noSolution) {
  path = [];
  var temp = current;
  while (temp) {
    path.push(temp);
    temp = temp.parent;
  }
  //   }
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

  stroke(255, 0, 200);
  noFill();
  strokeWeight(w / 2);
  beginShape();

  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();

  //   console.log(grid);
}
