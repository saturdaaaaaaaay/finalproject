//set up gameport, renderer, and stage
var gameport = document.getElementById("gameport");
var app = new PIXI.Application({width: 800, height: 500, backgroundColor: 0xffffff});
gameport.appendChild(app.view);

//animates the stage
function animate()
{
  requestAnimationFrame(animate);
}
animate();
