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
    this.defaultDisplay = null;
    this.completedDisplay = null;
    this.currentSprite = null;
    this.in_world = null;
  }
  
  changeDisplaySprite(NEW_DISPLAY)
  {
    if (this.currentSprite != null)
    {
      g.remove(this.currentSprite);
    }
    this.currentSprite = replaceWithAnimatedSprite(this.object, NEW_DISPLAY);
    this.in_world.add(this.currentSprite);
  }

  dispDialogue()
  {
    var state = this.quest.questState;
    this.counter++;

    if (this.counter === 3)
    {
      this.quest.changeState(QUEST_ACTIVE);
    }

    if (state === QUEST_AVAILABLE)
    {
      //this.quest.changeState(QUEST_ACTIVE);
      return this.dialogue.greeting + "\n" + this.dialogue.needExp;
    }
    else if (state === QUEST_ACTIVE)
    {
      return this.dialogue.needExp;
    }
    else if (state === QUEST_COMPLETE)
    {
      return this.dialogue.thanks;
    }
    return "";
  }

  interact()
  {
    var display = this.dispDialogue();

    console.log(display);

    if (this.quest.questState === QUEST_AVAILABLE)
    {
      console.log("quest added");
      return this.quest;
    }
  }

  receive()
  {
    var i, currentItem;

    for (i = 0; i < inventory.length; i++)
    {
      currentItem = inventory[i];

      if (this.quest.checkMatchingItem(currentItem))
      {
        this.changeDisplaySprite(this.completedDisplay);
      };
    }
  }
  
  setDisplays(ARRAY_1, ARRAY_2)
  {
    this.defaultDisplay = ARRAY_1;
    this.completedDisplay = ARRAY_2;
    this.changeDisplaySprite(this.defaultDisplay);
  }
  
  setWorld(WORLD)
  {
    this.in_world = WORLD;
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
    this.dialogue.playSound();
    console.log(this.dialogue.greeting);
  }

  dispDialogue()
  {
    return this.dialogue.greeting;
  }
}
