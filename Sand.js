function Sand(cell) {
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
      } else if (cell.gp.GetGrid(cell.x + t, cell.y + t) === Element.water) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          cell.type,
          cell.x + t,
          cell.y + t,
          Element.water
        );
        this.offsetX = 0;
        return;
      } else if (cell.gp.GetGrid(cell.x + t, cell.y + t) === Element.oil) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          cell.type,
          cell.x + t,
          cell.y + t,
          Element.oil
        );
        this.offsetX = 0;
        return;
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
      } else if (cell.gp.GetGrid(cell.x - t, cell.y + t) === Element.water) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          cell.type,
          cell.x - t,
          cell.y + t,
          Element.water
        );
        this.offsetX = 0;
        return;
      } else if (cell.gp.GetGrid(cell.x - t, cell.y + t) === Element.oil) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          cell.type,
          cell.x - t,
          cell.y + t,
          Element.oil
        );
        this.offsetX = 0;
        return;
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
    }
  }
}
