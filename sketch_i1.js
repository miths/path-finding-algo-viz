// import { newGrid } from "./sketch.js";
// console.log(walls.findIndex([0, 3]));
function sketch_astar(p) {
  //   var lgrid = grid.slice();
  console.log(grid);
  //   console.log(grid.slice());
  // var cols = 50;
  // var rows = 60;
  var grid = new Array(cols);
  var openSet = [];
  var closedSet = [];
  var start;
  var end;
  // var w;
  // var h;
  var path = [];
  // var noSolution = false;

  p.heuristic = function (a, b) {
    var d = p.dist(a.i, a.j, b.i, b.j);
    // console.log(d);
    //   var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
  };

  p.spot = function (i, j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.parent = undefined;
    this.wall = false;

    // if (p.random(1) < 0.3) {
    //   this.wall = true;
    // }
    // if (walls.findIndex([i, j]) != -1) {
    //   this.wall = true;
    // }

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

      if (i < cols - 1) {
        this.neighbors.push(grid[i + 1][j]);
        if (wall == true && grid[i + 1][j].wall == true) {
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, j * h + h / 2);
          p.endShape();
        }
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
        if (wall == true && grid[i - 1][j].wall == true) {
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, j * h + h / 2);
          p.endShape();
        }
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j + 1]);
        if (wall == true && grid[i][j + 1].wall == true) {
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex(i * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        }
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
        if (wall == true && grid[i][j - 1].wall == true) {
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex(i * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
        }
      }
      if (i > 0 && j > 0 && (!grid[i][j - 1].wall || !grid[i - 1][j].wall)) {
        this.neighbors.push(grid[i - 1][j - 1]);
        if (wall == true && grid[i - 1][j - 1].wall == true) {
          // grid[i - 1][j].wall = true;
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i - 1) * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
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
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, (j - 1) * h + h / 2);
          p.endShape();
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
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
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
          // grid[i + 1][j] = true;
          p.stroke(0);
          p.noFill();
          // fill(0);
          p.strokeWeight(w / 2);
          p.beginShape();
          p.vertex(i * w + w / 2, j * h + h / 2);
          p.vertex((i + 1) * w + w / 2, (j + 1) * h + h / 2);
          p.endShape();
        }
      }
    };
  };

  p.setup = function () {
    console.log(grid);
    //   let renderer = createCanvas(600, 600);
    //   background(170);
    //   renderer.parent("aStar");
    p.createCanvas(600, 600);
    p.background(170);

    console.log("A*1");

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
      p.fill(0);
      p.noStroke();
      // fillc;
      p.ellipse(walls[i][0] * w + w / 2, walls[i][1] * h + h / 2, w / 2, h / 2);
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
        p.stroke(0, 255, 0);
        p.noFill();
        p.strokeWeight(w / 2);
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
              //   console.log(tempG + " " + neighbor.g + "1st if stat");
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            // console.log(tempG + " 2nd if stat");
            neighbor.g = tempG;
            openSet.push(neighbor);
            newPath = true;
          }
          if (newPath) {
            // console.log("new path!!!");
            neighbor.h = p.heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            // console.log(neighbor.f);
            neighbor.parent = current;
          }
        }
      }
      //   console.log(openSet);
    } else {
      // noSolution = true;
      p.noLoop();
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
      path[i].show(p.color(0, 0, 255));
    }

    p.stroke(255, 0, 200);
    p.noFill();
    p.strokeWeight(w / 2);
    p.beginShape();

    for (var i = 0; i < path.length; i++) {
      p.vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    p.endShape();

    //   console.log(grid);
  };
}
new p5(sketch_astar, "aStar2");
