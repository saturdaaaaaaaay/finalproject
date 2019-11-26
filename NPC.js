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

    if (this.counter == 3)
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
  }

  interact()
  {
    var display = this.dispDialogue();

    console.log(display);

    if (this.quest.questState == QUEST_AVAILABLE)
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

      (this.quest.checkMatchingItem(currentItem))
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
