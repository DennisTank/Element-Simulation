function Vapour(cell) {
  if (cell.y <= 1) {
    cell.gp.SetGrid(cell.x, cell.y, Element.nothing);
    cell.gp.cells[cell.index] = null;
    return;
  }
  /*--------place conformations---------- */
  this.offsetY;
  this.offsetX;
  /*----BorderChck-----*/
  this.setOSY_Up = () => {
    this.offsetY = cell.velocity();
    if (cell.y - this.offsetY <= 0) {
      this.offsetY += cell.y - this.offsetY;
    }
  };
  this.setOSX_Right = () => {
    this.offsetX = Math.round(cell.velocity() / 2);
    if (this.offsetX + cell.x > cell.gp.coloum - 1) {
      this.offsetX -= (this.offsetX + cell.x) % cell.gp.coloum;
    }
  };
  this.setOSX_Left = () => {
    this.offsetX = Math.round(cell.velocity() / 2);
    if (cell.x - this.offsetX <= 0) {
      this.offsetX += cell.x - this.offsetX;
    }
  };
  /*------------*/
  this.CheckAbove = () => {
    this.setOSY_Up();
    let t = 1;
    while (t <= this.offsetY) {
      if (cell.gp.GetGrid(cell.x, cell.y - t) === Element.nothing) {
        t++;
      } else {
        this.offsetY = t - 1;
        return;
      }
    }
    return;
  };
  this.CheckAboveRight = () => {
    this.setOSY_Up();
    this.setOSX_Right();
    this.offsetY = Math.min(this.offsetX, this.offsetY);
    let t = 1;
    while (t <= this.offsetY) {
      if (cell.gp.GetGrid(cell.x + t, cell.y - t) === Element.nothing) {
        t++;
      } else {
        this.offsetY = t - 1;
        return;
      }
    }
    return;
  };
  this.CheckAboveLeft = () => {
    this.setOSY_Up();
    this.setOSX_Left();
    this.offsetY = Math.min(this.offsetX, this.offsetY);
    let t = 1;
    while (t <= this.offsetY) {
      if (cell.gp.GetGrid(cell.x - t, cell.y - t) === Element.nothing) {
        t++;
      } else {
        this.offsetY = t - 1;
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
  this.AllCheckToFloat = () => {
    //above
    if (
      cell.gp.GetGrid(cell.x, cell.y - 1) !== Element.wood &&
      cell.gp.GetGrid(cell.x, cell.y - 1) !== Element.nothing
    ) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x,
        cell.y - 1,
        cell.gp.GetGrid(cell.x, cell.y - 1)
      );
      return;
    }
    //above right
    if (
      cell.gp.GetGrid(cell.x + 1, cell.y - 1) !== Element.wood &&
      cell.gp.GetGrid(cell.x + 1, cell.y - 1) !== Element.nothing
    ) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x + 1,
        cell.y - 1,
        cell.gp.GetGrid(cell.x + 1, cell.y - 1)
      );
      return;
    }
    //above left
    if (
      cell.gp.GetGrid(cell.x - 1, cell.y - 1) !== Element.wood &&
      cell.gp.GetGrid(cell.x - 1, cell.y - 1) !== Element.nothing
    ) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x - 1,
        cell.y - 1,
        cell.gp.GetGrid(cell.x - 1, cell.y - 1)
      );
      return;
    }
    // right
    if (
      cell.gp.GetGrid(cell.x + 1, cell.y) !== Element.wood &&
      cell.gp.GetGrid(cell.x + 1, cell.y) !== Element.nothing
    ) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x + 1,
        cell.y,
        cell.gp.GetGrid(cell.x + 1, cell.y)
      );
      return;
    }
    // left
    if (
      cell.gp.GetGrid(cell.x - 1, cell.y) !== Element.wood &&
      cell.gp.GetGrid(cell.x - 1, cell.y) !== Element.nothing
    ) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x - 1,
        cell.y,
        cell.gp.GetGrid(cell.x - 1, cell.y)
      );
      return;
    }
  };
  /*--------------------------- */
  /* Main  */
  if (cell.y > 0 && cell.x >= 0 && cell.x < cell.gp.coloum) {
    if (Math.random() > 0.5) {
      this.CheckAbove();
      if (this.offsetY !== 0) {
        cell.GoUp(this.offsetY);
        return;
      }
    }
    if (Math.random() > 0.5) {
      this.CheckAboveRight();
      if (this.offsetY !== 0) {
        cell.GoUpRight(this.offsetY);
        return;
      }
    } else {
      this.CheckAboveLeft();
      if (this.offsetY !== 0) {
        cell.GoUpLeft(this.offsetY);
        return;
      }
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
    this.AllCheckToFloat();
  }
}
