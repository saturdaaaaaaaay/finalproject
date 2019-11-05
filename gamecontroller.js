// Alias Declarations
let AnimatedSprite = PIXI.AnimatedSprite;
let Container = PIXI.Container;
let Loader = PIXI.Loader;
let Sprite = PIXI.Sprite;
let sound = PIXI.sound;
let Texture = PIXI.Texture;

class Character
{
  constructor(g)
  {
    this.xPos = 0;
    this.yPos = 0;
    this.sprite = g.rectangle(1500, 1500, "green");
    //this.sprite.texture =
  }
}

class PC extends Character
{
  constructor()
  {

  }
}

class NPC extends Character
{

}

class Item
{
  constructor(itemID)
  {
    this.itemID = itemID;
  }
}

class Dialogue
{

}
