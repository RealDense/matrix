let matrix = [];
let width = 1200;
let height = 600;
let allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?!@#$%&";

let letters = function(x, y, falling, size){
  let letter = allLetters[floor(random(0,allLetters.length))];
  let speed = 1;
  let trail = [];
  if(size == null){
    size = floor(random(5, 13));
  }
  if(falling){
    for(let i = 0; i < random(8,14); i ++){
      trail.push(letters(x, y - 15 * i,false, size));
    }
  }

  function updateGrid(){
    y += (size);
    // y += 16;
  }

  function update(){
    y += speed;
    if(y%6 == 0){
      letter = allLetters[floor(random(0,allLetters.length))];
    }
    if(y%size == 0){
      for(let i = 0; i < trail.length; i++){
        trail[i].updateGrid();
      }
    }
    if(y > height*1.25){
      trail = []
      return false;
    }
    return true;
  }

  function render(){

    for(let i = 0; i < trail.length; i++){
      trail[i].renderGrid((trail.length - i)*20);
    }
    // console.log(textSize())
    // fill(color(0,143,17))
    // ellipse(x,y,16)
    // text(letter, x, y)
    fill(color(0,255,65))
    textSize(size);
    text(letter, x, y)
    
  }

  function renderGrid(a){
    fill(color(1,143,17,a))
    textSize(size);
    text(letter, x, y)

  }

  let api = {
    update: update,
    updateGrid: updateGrid,
    render: render,
    renderGrid: renderGrid
  }

  return api;
}


function setup() {
  createCanvas(width, height);
  // for(let i = 0; i < 10; i++){
  //   matrix.push(letters(random(0, width), 0, true));
  // }
}



function draw() {
  background(0);
  // console.log(matrix.length)
  if(random(0,10) < 1){
    matrix.push(letters(random(0, width), 0, true));
  }
  for(let i = matrix.length-1; i >= 0; i--){
    if(matrix[i].update()){
      matrix[i].render();
    }else{
      matrix.splice(i,1);
    }
  }
}
