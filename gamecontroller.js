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
    //console.log("hi");
  }
}

class QuestNPC extends NPC
{
  constructor(name, object, dialogue, quest)
  {
    super(name, object, dialogue);
    this.quest = quest;
    this.counter = 0;
  }

  dispDialogue()
  {
    var state = this.quest.questState;
    this.counter++;

    if (this.counter == 2)
    {
      this.quest.changeState(QUEST_ACTIVE);
    }

    if (state == QUEST_AVAILABLE)
    {
      //this.quest.changeState(QUEST_ACTIVE);
      return this.dialogue.greeting + "\n" + this.dialogue.needExp;
    }
    else if (state == QUEST_ACTIVE)
    {
      return this.dialogue.needExp;
    }
    else if (state == QUEST_COMPLETE)
    {
      return this.dialogue.thanks;
    }
    return "";
    //if item is active
    //display needExp
    //if item is not active
    //display greeting + needExp
    //if item is completed
    //display thanks
  }

  interact()
  {
    /*
    console.log(this.dialogue.greeting);
    console.log(this.dialogue.needExp);
    this.quest.getItem().interact();
    */
    var i, tempItem;

    var display = this.dispDialogue();

    console.log(display);

    if (this.quest.questState == QUEST_AVAILABLE)
    {
      console.log("quest added");
      return this.quest;
    }
  }
}

class RegNPC extends NPC
{
  constructor(name, object, dialogue)
  {
    super(name, object, dialogue);
  }

  interact()
  {
    console.log(this.dialogue.greeting);
  }

  dispDialogue()
  {
    return this.dialogue.greeting;
  }
}

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
