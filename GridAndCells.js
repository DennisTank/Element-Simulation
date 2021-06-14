function GridPlan(w, h, r, c, cells) {
  /*----------constructor--------*/
  this.coloum = c;
  this.rows = r;
  this.cellW = w / c;
  this.cellH = h / r;
  this.grid = new Array();
  this.cells = cells;
  for (let x = 0; x < this.coloum; x++) {
    this.grid[x] = new Array();
    for (let y = 0; y < this.rows; y++) {
      this.grid[x][y] = Element.nothing;
    }
  }
  /*--------------------- */
  this.SetGrid = (x, y, type) => {
    this.grid[x][y] = type;
  };
  this.GetGrid = (x, y) => {
    return this.grid?.[x]?.[y];
  };
  this.swapCells = (x1, y1, type1, x2, y2, type2) => {
    this.grid[x1][y1] = type2;
    this.grid[x2][y2] = type1;
  };
  this.DrawGrid = (c) => {
    for (let x = 0; x < this.coloum; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.grid[x][y] === Element.nothing) continue;
        c.beginPath();
        c.rect(x * this.cellW, y * this.cellH, this.cellW, this.cellH);
        switch (this.grid[x][y]) {
          case Element.sand:
            c.fillStyle = E_Color.sand;
            break;
          case Element.water:
            c.fillStyle = E_Color.water();
            break;
          case Element.fire:
            c.fillStyle = E_Color.fire();
            break;
          case Element.wood:
            c.fillStyle = E_Color.wood;
            break;
          case Element.oil:
            c.fillStyle = E_Color.oil;
            break;
          case Element.vapour:
            c.fillStyle = E_Color.vapour();
            break;
          default:
            break;
        }

        c.fill();
        c.closePath();
      }
    }
  };
}
// delete the cell if type is nothing
function Cell(x, y, type, gridPlan, bornTime) {
  /*----------constructor--------*/
  this.index = gridPlan.cells.length;
  this.x = x;
  this.y = y;
  this.gp = gridPlan;
  this.type = type;
  this.PreType = type;
  this.BT = bornTime;
  this.fireLife = Math.floor(Math.random() * (12 - 6 + 1) + 6);
  this.gp.SetGrid(this.x, this.y, this.type);
  /*--------------------- */
  this.velocity = () => {
    switch (this.type) {
      case Element.sand:
        return 10;
      case Element.water:
        return 10;
      case Element.fire:
        return 15;
      case Element.vapour:
        return 2;
      case Element.oil:
        return 15;
      default:
        return 0;
    }
  };
  this.Simulate = (currentTime) => {
    this.type = this.gp.GetGrid(this.x, this.y);
    if (this.PreType !== this.type) {
      if (this.PreType === Element.oil && this.type === Element.fire) {
        this.fireLife = 0;
      }
      this.PreType = this.type;
      this.BT = currentTime;
    }
    switch (this.type) {
      case Element.nothing:
        //delete me
        break;
      case Element.sand:
        Sand(this);
        break;
      case Element.water:
        Water(this);
        break;
      case Element.fire:
        Fire(this, currentTime);
        break;
      case Element.wood:
        break;
      case Element.oil:
        Oil(this);
        break;
      case Element.vapour:
        Vapour(this);
        break;
      default:
        break;
    }
  };

  this.GoUp = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.y -= offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoUpRight = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.y -= offset;
    this.x += offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoUpLeft = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.y -= offset;
    this.x -= offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoRight = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.x += offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoLeft = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.x -= offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoDown = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.y += offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoDownRight = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.y += offset;
    this.x += offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
  this.GoDownLeft = (offset) => {
    this.gp.SetGrid(this.x, this.y, Element.nothing);
    this.y += offset;
    this.x -= offset;
    this.gp.SetGrid(this.x, this.y, this.type);
  };
}
