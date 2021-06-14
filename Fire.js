function Fire(cell, currentTime) {
  this.fullLife = cell.fireLife;
  this.midLife = Math.round(this.fullLife * 0.5);
  if (currentTime - cell.BT > this.fullLife) {
    cell.type = Element.vapour;
    cell.gp.SetGrid(cell.x, cell.y, cell.type);
    return;
  }
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
  // All Bellow
  this.CheckBelow = () => {
    if (cell.gp.GetGrid(cell.x, cell.y + 1) === Element.wood) {
      if (currentTime - cell.BT > this.midLife) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          Element.fire,
          cell.x,
          cell.y + 1,
          cell.type
        );
      }
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x, cell.y + 1) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x,
        cell.y + 1,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x, cell.y + 1) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x,
        cell.y + 1,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
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
    if (cell.gp.GetGrid(cell.x + 1, cell.y + 1) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x + 1,
        cell.y + 1,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x + 1, cell.y + 1) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x + 1,
        cell.y + 1,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
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
    if (cell.gp.GetGrid(cell.x - 1, cell.y + 1) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x - 1,
        cell.y + 1,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x - 1, cell.y + 1) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x - 1,
        cell.y + 1,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
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
  // All Above
  this.CheckAbove = () => {
    if (cell.gp.GetGrid(cell.x, cell.y - 1) === Element.nothing) {
      if (Math.random() < 0.1 && Math.sin(Math.random() * 75) > 0.5) {
        cell.gp.cells.push(
          new Cell(cell.x, cell.y - 1, Element.vapour, cell.gp, currentTime)
        );
      }
      return;
    }
    if (cell.gp.GetGrid(cell.x, cell.y - 1) === Element.wood) {
      if (currentTime - cell.BT > this.midLife) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          Element.fire,
          cell.x,
          cell.y - 1,
          cell.type
        );
      }
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x, cell.y - 1) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x,
        cell.y - 1,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x, cell.y - 1) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x,
        cell.y - 1,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x, cell.y - 1) === Element.sand) {
      cell.type = Element.vapour;
      cell.gp.SetGrid(cell.x, cell.y, cell.type);
      this.offsetY = 0;
      return;
    }
  };
  this.CheckAboveRight = () => {
    if (cell.gp.GetGrid(cell.x + 1, cell.y - 1) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x + 1,
        cell.y - 1,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x + 1, cell.y - 1) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x + 1,
        cell.y - 1,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x + 1, cell.y - 1) === Element.sand) {
      cell.type = Element.vapour;
      cell.gp.SetGrid(cell.x, cell.y, cell.type);
      this.offsetY = 0;
      return;
    }
  };
  this.CheckAboveLeft = () => {
    if (cell.gp.GetGrid(cell.x - 1, cell.y - 1) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x - 1,
        cell.y - 1,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x - 1, cell.y - 1) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x - 1,
        cell.y - 1,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x - 1, cell.y - 1) === Element.sand) {
      cell.type = Element.vapour;
      cell.gp.SetGrid(cell.x, cell.y, cell.type);
      this.offsetY = 0;
      return;
    }
  };
  // All Side Ways
  this.CheckRight = () => {
    if (cell.gp.GetGrid(cell.x + 1, cell.y) === Element.wood) {
      if (currentTime - cell.BT > this.midLife) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          Element.fire,
          cell.x + 1,
          cell.y,
          cell.type
        );
      }
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x + 1, cell.y) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x + 1,
        cell.y,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x + 1, cell.y) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x + 1,
        cell.y,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
  };
  this.CheckLeft = () => {
    if (cell.gp.GetGrid(cell.x - 1, cell.y) === Element.wood) {
      if (currentTime - cell.BT > this.midLife) {
        cell.gp.swapCells(
          cell.x,
          cell.y,
          Element.fire,
          cell.x - 1,
          cell.y,
          cell.type
        );
      }
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x - 1, cell.y) === Element.water) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        Element.vapour,
        cell.x - 1,
        cell.y,
        Element.vapour
      );
      this.offsetY = 0;
      return;
    }
    if (cell.gp.GetGrid(cell.x - 1, cell.y) === Element.oil) {
      cell.gp.swapCells(
        cell.x,
        cell.y,
        cell.type,
        cell.x - 1,
        cell.y,
        cell.type
      );
      this.offsetY = 0;
      return;
    }
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
      //just check and turn vapour
      this.CheckRight();
      this.CheckLeft();
      this.CheckAbove();
      this.CheckAboveRight();
      this.CheckAboveLeft();
    }
  }
}
