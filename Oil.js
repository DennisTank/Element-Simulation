function Oil(cell) {
  /*--------place conformations---------- */
  this.offsetY;
  this.offsetX;
  /*----BorderChck-----*/
  this.setOSY_Down = () => {
    this.offsetY = cell.velocity();
    if (this.offsetY + cell.y > cell.gp.rows - 1) {
      this.offsetY -= (this.offsetY + cell.y) % cell.gp.rows;
    }
  };
  this.setOSY_Up = () => {
    this.offsetY = Math.round(cell.velocity() * 0.5);
    if (cell.y - this.offsetY <= 0) {
      this.offsetY += cell.y - this.offsetY;
    }
  };
  this.setOSX_Right = () => {
    this.offsetX = Math.round(cell.velocity() / 5);
    if (this.offsetX + cell.x > cell.gp.coloum - 1) {
      this.offsetX -= (this.offsetX + cell.x) % cell.gp.coloum;
    }
  };
  this.setOSX_Left = () => {
    this.offsetX = Math.round(cell.velocity() / 5);
    if (cell.x - this.offsetX <= 0) {
      this.offsetX += cell.x - this.offsetX;
    }
  };
  /*------------*/
  this.CheckAbove = () => {
    this.setOSY_Up();
    let t = 1;
    while (t <= this.offsetY) {
      if (cell.gp.GetGrid(cell.x, cell.y - t) === Element.water) {
        t++;
      } else {
        t = t - 1;
        cell.gp.swapCells(
          cell.x,
          cell.y,
          cell.type,
          cell.x,
          cell.y - t,
          Element.water
        );
        this.offsetY = 0;
        return;
      }
    }
    return;
  };
  this.CheckBelow = () => {
    this.setOSY_Down();
    let t = 1;
    while (t <= this.offsetY) {
      if (cell.gp.GetGrid(cell.x, cell.y + t) === Element.nothing) {
        t++;
      } else {
        this.offsetY = t - 1;
        return;
      }
    }
    return;
  };
  this.CheckBelowRight = () => {
    this.setOSY_Down();
    this.setOSX_Right();
    this.offsetX = Math.min(this.offsetX, this.offsetY);
    let t = 1;
    while (t <= this.offsetX) {
      if (cell.gp.GetGrid(cell.x + t, cell.y + t) === Element.nothing) {
        t++;
      } else {
        this.offsetX = t - 1;
        return;
      }
    }
    return;
  };
  this.CheckBelowLeft = () => {
    this.setOSY_Down();
    this.setOSX_Left();
    this.offsetX = Math.min(this.offsetX, this.offsetY);
    let t = 1;
    while (t <= this.offsetX) {
      if (cell.gp.GetGrid(cell.x - t, cell.y + t) === Element.nothing) {
        t++;
      } else {
        this.offsetX = t - 1;
        return;
      }
    }
    return;
  };
  this.CheckRight = () => {
    this.setOSX_Right();
    let t = 1;
    while (t <= this.offsetX) {
      if (cell.gp.GetGrid(cell.x + t, cell.y) === Element.nothing) {
        t++;
      } else {
        this.offsetX = t - 1;
        return;
      }
    }
    return;
  };
  this.CheckLeft = () => {
    this.setOSX_Left();
    let t = 1;
    while (t <= this.offsetX) {
      if (cell.gp.GetGrid(cell.x - t, cell.y) === Element.nothing) {
        t++;
      } else {
        this.offsetX = t - 1;
        return;
      }
    }
    return;
  };
  /*--------------------------- */
  /* Main  */
  if (cell.y < cell.gp.rows) {
    this.CheckBelow();
    if (this.offsetY !== 0) {
      cell.GoDown(this.offsetY);
      return;
    }
    if (cell.x >= 0 && cell.x < cell.gp.coloum) {
      //density
      this.CheckAbove();
      //
      this.CheckBelowRight();
      if (this.offsetX !== 0) {
        cell.GoDownRight(this.offsetX);
        return;
      }
      this.CheckBelowLeft();
      if (this.offsetX !== 0) {
        cell.GoDownLeft(this.offsetX);
        return;
      }
      this.CheckRight();
      if (this.offsetX !== 0) {
        cell.GoRight(this.offsetX);
        return;
      }
      this.CheckLeft();
      if (this.offsetX !== 0) {
        cell.GoLeft(this.offsetX);
        return;
      }
    }
  }
}
