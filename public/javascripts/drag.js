let W = 1200; // background canvas width
let H = 500; // background canvas height
let Wsim = W * 0.69; // sim canvas width
let Hsim = H; // sim canvas height
let Wplot = 0.25 * W; // plotting canvas width
let Hplot = 0.875 * H; // plotting canvas height

let scale = 200; //scaling factor for display on canvas ( 1 meter = x pixels)

function setup() {
  let bgCanvas = createCanvas(W, H);
  bgCanvas.parent("simwrapper"); //wrapping the canvas so elements appear relative to canvas and not the webpage.

  let dd = makeDropdown(bgCanvas);
  dd.parentElement.children[1].innerHTML = "Options";
  let dd1 = makeItem(dd);
  dd1.parentElement.children[1].innerHTML = "Parameters";
}

function draw() {
  background(20);

  //drawing outer rectangle
  simCanvas.clear();
  simCanvas.stroke(255);
  simCanvas.strokeWeight(2);
  simCanvas.noFill();
  simCanvas.rect(10, 10, Wsim - 20, Hsim - 20);
}
