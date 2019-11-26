// Alias Declarations
let AnimatedSprite = PIXI.AnimatedSprite;
let Container = PIXI.Container;
let Loader = PIXI.Loader;
let Sprite = PIXI.Sprite;
let sound = PIXI.sound;
let Texture = PIXI.Texture;

class Item
{
  constructor(name, object)
  {
    this.name = name;
    this.object = object;
  }
  interact()
  {
    console.log(this.name);
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
