let Element = {
  nothing: 0,
  sand: 1,
  water: 2,
  fire: 3,
  wood: 4,
  oil: 5,
  vapour: 6,
};
let E_Color = {
  sand: "#C2B280",
  water: () => {
    if (Math.random() < 0.7) return "#3D5A85";
    else return "#4a73b1";
  },
  fire: () => {
    if (Math.random() > 0.7) return "#B62203";
    else if (Math.random() > 0.5) return "#FC6400";
    else return "#FAC000";
  },
  wood: "#432200",
  oil: "#005f6a",
  vapour: () => (Math.random() > 0.5 ? "white" : "gray"),
};
function ElementOptions(c, w, h) {
  this.c = c;
  this.w = w;
  this.h = h;
  this.DrawText = () => {
    this.c.fillStyle = "rgba(255,255,255,100%)";
    this.c.fillRect(0, 0, this.w, this.h);
    this.c.font = "bold 20px Comic Sans MS";
    this.c.fillStyle = "black";
    this.c.textAlign = "center";
    this.c.fillText("SELECT: ", 50, 20, 100);
  };
  this.DrawOptions = (selected) => {
    for (let i = 0; i < 5; i++) {
      if (i + 1 === selected) {
        this.c.beginPath();
        this.c.rect(120 * i + 98, 0, 110, 25);
        this.c.fillStyle = "black";
        this.c.fill();
        this.c.closePath();
      } else {
        this.c.beginPath();
        this.c.rect(120 * i + 98, 0, 110, 25);
        this.c.fillStyle = "white";
        this.c.fill();
        this.c.closePath();
      }
      this.c.beginPath();
      this.c.rect(100 + 3 + 120 * i, 3, 100, 21);
      switch (i + 1) {
        case Element.sand:
          this.c.fillStyle = E_Color.sand;
          break;
        case Element.water:
          this.c.fillStyle = "#3D5A85";
          break;
        case Element.fire:
          this.c.fillStyle = "#B62203";
          break;
        case Element.wood:
          this.c.fillStyle = E_Color.wood;
          break;
        case Element.oil:
          this.c.fillStyle = E_Color.oil;
          break;
        default:
          break;
      }
      this.c.fill();
      this.c.closePath();
    }
  };
}
