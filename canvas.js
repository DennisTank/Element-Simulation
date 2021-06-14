const canvas = document.getElementById("window");
const c = canvas.getContext("2d");
const optionsC = document.getElementById("options");
const o_c = optionsC.getContext("2d");

const screen = { w: window.innerWidth - 10, h: window.innerHeight - 40 };
canvas.width = screen.w;
canvas.height = screen.h;
optionsC.width = screen.w;
optionsC.height = 25;

let TIME = 0;
let FRAME = 0;

let screenGrid;
let cellSize = 0;
let Entities = [];
let E_Options;
let currentType;
let Draw = false;

canvas.addEventListener("mousedown", (e) => {
  Draw = true;
});
window.addEventListener("mouseup", (e) => {
  Draw = false;
});
canvas.addEventListener("mousemove", (e) => {
  if (!Draw) return;
  let swapPos = {
    x: Math.round(e.x / cellSize) - 5,
    y: Math.round(e.y / cellSize) - 15,
  };
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        screenGrid.GetGrid(swapPos.x + i, swapPos.y + j) !== Element.nothing ||
        screenGrid.GetGrid(swapPos.x + i, swapPos.y + j) === null
      )
        continue;
      Entities.push(
        new Cell(swapPos.x + i, swapPos.y + j, currentType, screenGrid, TIME)
      );
    }
  }
});
optionsC.addEventListener("pointerdown", (e) => {
  if (e.x >= 103 && e.x <= 203) {
    currentType = Element.sand;
  } else if (e.x >= 223 && e.x <= 323) {
    currentType = Element.water;
  } else if (e.x >= 343 && e.x <= 443) {
    currentType = Element.fire;
  } else if (e.x >= 463 && e.x <= 563) {
    currentType = Element.wood;
  } else if (e.x >= 583 && e.x <= 683) {
    currentType = Element.oil;
  }
});

function TimeHandler() {
  if (FRAME === 100) {
    TIME++;
    FRAME = 0;
  } else FRAME++;
}

function Start() {
  E_Options = new ElementOptions(o_c, optionsC.width, optionsC.height);
  currentType = Element.sand;
  screenGrid = new GridPlan(
    screen.w,
    screen.h,
    Math.round(screen.h / cellSize),
    Math.round(screen.w / cellSize),
    Entities
  );
}
function Loop() {
  TimeHandler();

  c.fillStyle = "rgba(28,28,28,100%)";
  c.fillRect(0, 0, Math.round(screen.w), Math.round(screen.h));

  E_Options.DrawText();

  screenGrid.DrawGrid(c);
  let l = Entities.length;
  for (let i = 0; i < l; i++) {
    if (Entities[i] !== null) Entities?.[i]?.Simulate(TIME);
  }

  E_Options.DrawOptions(currentType);
}

// intructions
alert(
  "1. Select an element.  [ SAND, WATER, FIRE, WOOD, OIL ].\n2. Click on the gray space and move the mouse.\nHave Fun!!"
);
while (cellSize === 0) {
  cellSize = prompt(
    "Enter pixel size between [ 1 - 5 ]\nNOTE: 5-Better Performance & 1-Finer Quality)"
  );
  cellSize = cellSize % 6;
}

// initiate
Start();
var interver = setInterval(Loop, 10);
