// Alias Declarations
let AnimatedSprite = PIXI.AnimatedSprite;
let Container = PIXI.Container;
let Loader = PIXI.Loader;
let Sprite = PIXI.Sprite;
let sound = PIXI.sound;
let Texture = PIXI.Texture;
let itemList = [];

class Item
{
  constructor(name, object)
  {
    this.name = name;
    this.object = object;
    this.button =  g.text(this.name, "18px Futura", "white", 20, 20);
    this.button.interactive = true;
    this.button.buttonMode = true;

    console.log(this.name);

    this.button.on('mousedown', this.interact);
  }
  interact()
  {
    console.log(this.name);
  }
  getName()
  {
    return this.name;
  }
}

class Dialogue
{
  constructor(greeting, needExp, thanks)
  {
    this.greeting = greeting;
    this.needExp = needExp;
    this.thanks = thanks;
  }
}
