// Alias Declarations
let AnimatedSprite = PIXI.AnimatedSprite;
let Container = PIXI.Container;
let Loader = PIXI.Loader;
let Sprite = PIXI.Sprite;
let sound = PIXI.sound;
let Texture = PIXI.Texture;


class NPC
{
  constructor(name, object, dialogue)
  {
    this.name = name;
    this.object = object;
    this.dialogue = dialogue;
  }
  interact()
  {
    console.log("hi");
  }
}

class QuestNPC extends NPC
{
  constructor(name, object, dialogue)
  {
    super(name, object, dialogue);
    //this.quest = quest;
    //this.item = item;
  }
  interact()
  {
    console.log(this.dialogue.greeting);
    console.log(this.dialogue.needExp);
  }
  checkIfQuestActive()
  {
    //if item is active
    //display needExp
    //if item is not active
    //display greeting + needExp
    //if item is completed
    //display thanks
  }
}

class RegNPC extends NPC
{
  constructor(name, object, dialogue)
  {
    super(name, object);
  }
}

class Item
{
  constructor(name, object, state)
  {
    this.name = name;
    this.object = object;
    this.state = state;
  }
  interact()
  {
    console.log("hi");
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
