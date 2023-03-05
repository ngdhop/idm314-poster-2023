/* globals SVG, saveAs */

const IDMColors = {
  indigo: '#0066b3',
  green: '#00a651',
  yellow: '#ffcb05',
  red: '#ed1c24',
  blue: '#00aeef',
  purple: '#7670b3',
  lgreen: '#a6ce39',
  fucsia: '#c657a0',
  orange: '#f58220',
};

// Poster size
const A3_WIDTH = 841.9;
const A3_HEIGHT = 1190.6;
const WIDTH = A3_WIDTH;
const HEIGHT = A3_HEIGHT;

// Return a random color from the list of IDM colors
function randomColor() {
  const keys = Object.keys(IDMColors);
  const index = Math.floor(Math.random() * keys.length);
  return IDMColors[keys[index]];
}

function seqColor() {
  if (this.lastColor === undefined) {
    this.lastColor = 0;
  }

  this.lastColor += 1;
  return IDMColors[Object.keys(IDMColors)[this.lastColor % Object.keys(IDMColors).length]];
}

// Create the SVG element
const draw = SVG().addTo('.svg-container').size(WIDTH, HEIGHT).viewbox(0, 0, WIDTH, HEIGHT);

const circles = draw.group();

let radius = HEIGHT;
for (let i = 0; i < 9; i += 1) {
  radius = Math.pow(Math.pow(radius, 1/3) * 0.926, 3);
  let size = radius / 5 - (i * 2);
  let opac = i-7/8-2*Math.floor(i/2-7/16);
  for (let j=0; j<24; j+=1) {
    const angle = (j + 0.5 * (i % 2)) * (Math.PI * 2 / 24);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    circles
      .circle(size)
      .center(WIDTH / 2 + x, HEIGHT / (Math.PI * 2) + y)
      .attr({ fill: seqColor() })
      .attr({'fill-opacity': opac});
  }
}

// Playing with text
const text1 = draw.text(
    function(add){
      add.tspan("TOÁN HỌC").newLine().fill("black")
    }
  )
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT / (Math.PI * 2))
  .font({
    family: 'Helvetica',
    size:   89,
    anchor: 'middle',
    weight: 'normal',
    style:  'normal'
  })
;

const text1a = draw.text(
    function(add){
      add.tspan("CHO").newLine().fill("black")
    }
  )
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT / (Math.PI * 1.6))
  .font({
    family: 'Helvetica',
    size:   48,
    anchor: 'middle',
    weight: 'normal',
    style:  'normal'
  })
;

const text2 = draw.text(
    function(add){
  add.tspan("MỌI NGƯỜI").newLine().fill("black")
    }
  )
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT / (Math.PI * 1.2))
  .font({
    family: 'Helvetica',
    size:   80,
    anchor: 'middle',
    weight: 'bold',
    style:  'normal'
  })
;


const text3 = draw.text(
    function(add){
      add.tspan("Bài giảng đại chúng").newLine().fill("purple")
      add.tspan("Ngô Trung Hiếu & Nguyễn Quý Hà").newLine().fill("purple")
    }                  
  )
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT / (Math.PI * 0.64))
  .font({
    family: 'Helvetica',
    size:   40,
    anchor: 'middle',
    weight: 'bold',
    style:  'normal'
  })
;

const text4 = draw.text(
    function(add){
      add.tspan("Triển lãm poster").newLine().fill("green")
      add.tspan("Mathematical Moments").newLine().fill("green")
    }                  
  )
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT / (Math.PI * 0.39))
  .font({
    family: 'Helvetica',
    size:   40,
    anchor: 'middle',
    weight: 'bold',
    style:  'normal'
  })
;

const text5 = draw.text(
    function(add){
      add.tspan("Viện Toán học").newLine().fill("blue")
    }                  
  )
  .attr("x", WIDTH / 1.2)
  .attr("y", HEIGHT / (Math.PI * 0.34))
  .font({
    family: 'Helvetica',
    size:   33,
    anchor: 'middle',
    weight: 'normal',
    style:  'normal'
  })
;

const text6 = draw.text(
    function(add){
      add.tspan("26/03/2023").newLine().fill("blue")
    }                  
  )
  .attr("x", WIDTH / 1.2)
  .attr("y", HEIGHT / (Math.PI * 0.326))
  .font({
    family: 'Helvetica',
    size:   40,
    anchor: 'middle',
    weight: 'normal',
    style:  'normal'
  })
;

// Add the download button handler
document.getElementById('download').addEventListener('click', () => {
  // Extract the SVG data and send it to the browser as a fake file download
  const svgData = document.getElementsByTagName('svg')[0].innerHTML;
  const fullSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
\t viewBox="0 0 ${A3_WIDTH} ${A3_HEIGHT}">
${svgData}
</svg>`;
  const blob = new Blob([fullSVG], { type: 'image/svg+xml' });
  saveAs(blob, 'poster-background.svg');
});

