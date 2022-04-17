const orig_points = [
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
];
const delayInMilliseconds = 10;
const canvas = document.getElementById("myCanvas");

let points = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
let rotated_3d_points = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]; // eight 3D points - rotated around Y axis

let angle_deg = 60.0; // rotation around the Y axis
let z_offset = -4.0; // offset on Z axis
let cube_size = 70; // cube size (multiplier)
let time_frame = 0; // ever increasing time value

window.onload = function () {
  setInterval(function () {
    drawCube();
  }, delayInMilliseconds);
};

function calcCubePoints() {
  time_frame++;
  cube_size = 500 + Math.sin(time_frame * 0.005) * 450; // oscilate cube size between values 30 - 70

  if (angle_deg < 360 - 5) {
    angle_deg = angle_deg + 0.5;
  } else {
    angle_deg = 0;
  }

  // calculate the points
  for (let i = 0; i < 8; i++) {
    // rotate 3d points around the Y axis (rotating X nad Z positions)
    rotated_3d_points[i][0] =
      orig_points[i][0] * Math.cos(degrees_to_radians(angle_deg)) -
      orig_points[i][2] * Math.sin(degrees_to_radians(angle_deg));

    rotated_3d_points[i][1] = orig_points[i][1];

    rotated_3d_points[i][2] =
      orig_points[i][0] * Math.sin(degrees_to_radians(angle_deg)) +
      orig_points[i][2] * Math.cos(degrees_to_radians(angle_deg)) +
      z_offset;

    // project 3d points into 2d space with perspective divide -- 2D x = x/z,   2D y = y/z
    points[i][0] =
      500 + (rotated_3d_points[i][0] / rotated_3d_points[i][2]) * cube_size;

    points[i][1] =
      500 + (rotated_3d_points[i][1] / rotated_3d_points[i][2]) * cube_size;
  }
}

function drawCube() {
  var c = document.getElementById("myCanvas");

  var ctx = c.getContext("2d");

  ctx.clearRect(0, 0, 1000, 1000);
  calcCubePoints();

  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    ctx.lineTo(points[1][0], points[1][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[1][0], points[1][1]);
    ctx.lineTo(points[2][0], points[2][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[2][0], points[2][1]);
    ctx.lineTo(points[3][0], points[3][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[3][0], points[3][1]);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[4][0], points[4][1]);
    ctx.lineTo(points[5][0], points[5][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[5][0], points[5][1]);
    ctx.lineTo(points[6][0], points[6][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[6][0], points[6][1]);
    ctx.lineTo(points[7][0], points[7][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[7][0], points[7][1]);
    ctx.lineTo(points[4][0], points[4][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[4][0], points[4][1]);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[1][0], points[1][1]);
    ctx.lineTo(points[5][0], points[5][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[2][0], points[2][1]);
    ctx.lineTo(points[6][0], points[6][1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[3][0], points[3][1]);
    ctx.lineTo(points[7][0], points[7][1]);
    ctx.stroke();
  }
}

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
