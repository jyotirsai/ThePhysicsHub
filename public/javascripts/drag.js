let W = 1200; //background canvas width
let H = 500; //background canvas height
let Wsim = W * 0.69; //sim canvas width
let Hsim = H; //sim canvas height
let Wplot = 0.25 * W; //plotting canvas width
let Hplot = 0.875 * H; //plotting canvas height

let scale = 200; //scaling factor for display on canvas ( 1 meter = x pixels)

let timestep = 0; //number of timesteps progressed
let numP = 0; //keeping track of number of points on plot
let dd14; //display row for length
let plot1, plot2; //energy plot, phase plot
let plot2Point; //latest point to be added to phase plot

let tSlider,
  mSlider,
  FSlider,
  wSlider,
  gSlider,
  bSlider,
  pSlider,
  checkbox1,
  sSlider,
  fSlider; //all elements in dropdown

let par = {
  d_river: 80, // river width (m)
  v_river: 20, // river velocity (m/s)
  v_boat: 10, // boat velocity (m/s)
  boat_angle: 1.57, // boat angle (rad)
};

function setup() {
  let bgCanvas = createCanvas(W, H);
  bgCanvas.parent("simwrapper"); //wrapping the canvas so elements appear relative to canvas and not the webpage.

  // --constructing the dropdown menu--

  let dd = makeDropdown(bgCanvas);
  dd.parentElement.children[1].innerHTML = "Options";
  let dd1 = makeItem(dd);
  dd1.parentElement.children[1].innerHTML = "Parameters";

  //River Width
  dd14 = makeRow(dd1);
  dd14.innerHTML = "River Width (m) = " + Number(par.d_river).toFixed(2);

  //River Velocity
  let dd11 = makeRow(dd1);
  let mSliderContainer = makeSlider(dd11);
  mSlider = mSliderContainer["slider"];
  mSliderContainer["valueLabel"].innerHTML = mSlider.value;
  mSliderContainer["label"].innerHTML = "River Velocity";
  [mSlider.min, mSlider.max, mSlider.step, mSlider.value] = [0, 100, 10, 20];
  mSlider.oninput = () => {
    mSliderContainer["valueLabel"].innerHTML = Number(mSlider.value).toFixed(2);
    par.v_river = mSlider.value;
  };

  //Boat Velocity
  let dd12 = makeRow(dd1);
  let gSliderContainer = makeSlider(dd12);
  gSlider = gSliderContainer["slider"];
  gSliderContainer["valueLabel"].innerHTML = gSlider.value;
  gSliderContainer["label"].innerHTML = "Boat Velocity";
  [gSlider.min, gSlider.max, gSlider.step, gSlider.value] = [0, 100, 10, 10];
  gSlider.oninput = () => {
    gSliderContainer["valueLabel"].innerHTML = Number(gSlider.value).toFixed(2);
    par.v_boat = gSlider.value;
  };

  //Angle
  let dd13 = makeRow(dd1);
  let bSliderContainer = makeSlider(dd13);
  bSlider = bSliderContainer["slider"];
  bSliderContainer["valueLabel"].innerHTML = bSlider.value;
  bSliderContainer["label"].innerHTML = "Boat Angle";
  [bSlider.min, bSlider.max, bSlider.step, bSlider.value] = [
    0,
    3.14,
    0.01,
    1.57,
  ];
  bSlider.oninput = () => {
    bSliderContainer["valueLabel"].innerHTML = Number(bSlider.value).toFixed(2);
    par.boat_angle = bSlider.value;
  };

  setPedroStyle(bgCanvas); //applies styling to dropdown menu.

  //--end construction of dropdown menu--

  simCanvas = createGraphics(Wsim, Hsim);

  //drawing static grid over simCanvas
  gridCanvas = createGraphics(Wsim, Hsim);
  let nDiv = 8; // #gridlines

  gridCanvas.clear();
  gridCanvas.stroke(150);
  gridCanvas.strokeWeight(1);
  for (let i = 0; i < nDiv; i++) {
    gridCanvas.line(
      10 + (i * Wsim) / nDiv,
      10,
      10 + (i * Wsim) / nDiv,
      Hsim - 10
    );
    gridCanvas.line(
      10,
      10 + (i * Hsim) / nDiv,
      Wsim - 10,
      10 + (i * Hsim) / nDiv
    );
  }
}

function draw() {
  background(20);

  //drawing outer rectangle
  simCanvas.clear();
  simCanvas.stroke(255);
  simCanvas.strokeWeight(2);
  simCanvas.noFill();
  simCanvas.rect(10, 10, Wsim - 20, Hsim - 20);

  //grid lines
  image(gridCanvas, 0, 0);
  //sim canvas
  image(simCanvas, 0, 0);
}
