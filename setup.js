function setupSprites()
{
  /*
  Get a reference to sprites.
  Use `world.getObject` to do this. `getObject` searches for and
  returns a sprite in the `world` that has a `name` property that
  matches the string in the argument.
  */
  player = world.getObject("player");

  quest_NPC = world.getObject("quest_NPC");
  reg_NPC = world.getObject("reg_NPC");
  item = world.getObject("item");

  doors = world.getObjects("door");
}

//sets up dialogue for NPCs
function setupDialogue()
{
  thomasDiag = new Dialogue("Hey little dude! Welcome to our town. My name is Thomas.",
        "Man, my hands are so cold. I wish I hadn’t left my gloves at home.",
        "Thank you so much little dude! I actually found my gloves, but I could still use these.");
  miaDiag = new Dialogue("¿TRES leches? ¿En esta economia?", "", "");
}

//set up item objects
function setupItems()
{
  //button1 = g.text("Gloves", "18px Futura", "white", 20, 20);
  //button2 g.text("Flower", "18px Futura", "white", 20, 20);

  //button1.interact = true;
  //button2.interact = true;

  item1 = new Item("Gloves", item);
  item2 = new Item("Flower", item);

  inventory.push(item1);
  inventory.push(item2);
}

//set up quest objects
function setupQuests()
{
  quest1 = new Quest (item1, QUEST_AVAILABLE);

  questArray.push(quest1);
}

//set up NPC objects
function setupNPCs()
{
  qNPC = new QuestNPC("Thomas", quest_NPC, thomasDiag, quest1);
  rNPC = new RegNPC("Mia", reg_NPC, miaDiag);

  questNPCArray.push(qNPC);
  regNPCArray.push(rNPC);
}

//set up scene graphs
function setupScenes()
{
  //create scenes
  gameScene = g.group();
  menuScene = g.group();
  dialogueScene = g.group();
  questListScene = g.group();
  titleScene = g.group();
  popupScene = g.group();
  gameOverScene = g.group();
  inventoryScene = g.group();


  //make all scenes but title scene invisible
  titleScene.visible = true;

  dialogueScene.visible = false;
  menuScene.visible = false;
  questListScene.visible = false;
  gameScene.visible = false;
  popupScene.visible = false;
  gameOverScene.visible = false;
  inventoryScene.visible = false;

  //call methods to set up each scene graph
  setupTitleScene();
  setupGameScene();
  setupMenuScene();
  setupQuestListScene();
  setupPopUpScene();
  setupGameOverScene();
  setupInventoryScene();
}

//set up title scene
function setupTitleScene()
{
  //background
  backgroundRect = g.rectangle(800, 600, "black");

  //creates and positions title text
  titleText = g.text("Planilandia", "18px Futura", "red", 20, 20);
  g.stage.putCenter(titleText);

  //creates and positions play button
  playText = g.text("Play", "18px Futura", "red", 20, 20);
  playText.x = 400;
  playText.y = 400;

  //add children to scene
  titleScene.addChild(backgroundRect);
  titleScene.addChild(titleText);
  titleScene.addChild(playText);

  //turns play sprite into button
  playText.interactive = true;
  playText.buttonMode = true;

  //displays game when "play" is pressed
  playText.on('mousedown', dispGame);
}

//set up game scene
function setupGameScene()
{
  //create and position menu text
  menuText = g.text("Menu", "18px Futura", "red", 20, 20);
  menuText.x = 750;
  menuText.y = 0;//g.canvas.height / 2 - 18;

  //add menu text to game scene
  gameScene.addChild(menuText);

  //creates menu button
  menuText.interactive = true;
  menuText.buttonMode = true;

  //when clicked, will display menu scene
  menuText.on('mousedown', dispMenu);
}

//set up menu scene
function setupMenuScene()
{
  //background
  backgroundRect = g.rectangle(300, 300, "black");
  g.stage.putCenter(backgroundRect, 0, 0);
  //backgroundRect.x = g.canvas.width / 2;
  //backgroundRect.y = g.canvas.height / 2;

  //create and add quest list and cancel text
  questListText = g.text("Quest List", "18px Futura", "red", 20, 20);
  questListText.x = g.canvas.width/2;
  questListText.y = g.canvas.height / 2 - 18;
  cancelText = g.text("Cancel", "18px Futura", "red", 20, 20);
  cancelText.x = 400;
  cancelText.y = 400;

  //add text to scene
  menuScene.addChild(backgroundRect);
  menuScene.addChild(questListText);
  menuScene.addChild(cancelText);

  //create buttons
  questListText.interactive = true;
  questListText.buttonMode = true;
  cancelText.interactive = true;
  cancelText.buttonMode = true;

  //when clicked, will display quest list scene
  questListText.on('mousedown', dispQuestList);
  //when clicked, will display game scene
  cancelText.on('mousedown', dispGame);
}

//set up quest list scene
function setupQuestListScene()
{
  questListScene.removeChildren(); //reset scene graph

  //background
  backgroundRect = g.rectangle(300, 300, "black");
  g.stage.putCenter(backgroundRect, 0, 0);

  //add background to scene
  questListScene.addChild(backgroundRect);

  //goes through quest array and adds them to quest scene
  if (pcQuestArray.length > 0)
  {
    var i, currentQuest;
    for (i = 0; i < pcQuestArray.length; i++)
    {
      //questTextArray.push(g.text(pcQuestArray[i].display(), "18px Futura", "red", 20, 20));
      currentQuest = g.text(pcQuestArray[i].display(), "18px Futura", "red", 20, 20);

      questListScene.addChild(currentQuest);
      //g.stage.putCenter(currentQuest, 0, -100);
      currentQuest.x = 300;
      currentQuest.y = 200 + (i * 50);
    }
  }
  else //if no quests, display unavailable text
  {
    emptyQuestText = g.text("No quests available", "18px Futura", "red", 20, 20);

    questListScene.addChild(emptyQuestText);
    emptyQuestText.x = 300;
    emptyQuestText.y = 300;
  }

  //cancel button
  cancelText = g.text("Cancel", "18px Futura", "red", 20, 20);
  cancelText.x = 400;
  cancelText.y = 400;

  questListScene.addChild(cancelText);

  cancelText.interactive = true;
  cancelText.buttonMode = true;

  //when clicked, will display menu scene
  cancelText.on('mousedown', dispMenu);
}

function setupDialogueScene(npc)
{
  npcNameText = g.text(npc.name + ":", "18px Futura", "white", 20, 20);
  npcNameText.y = 475;

  dialogueText = g.text(npc.dispDialogue(), "18px Futura", "white", 20, 20);
  dialogueText.y = 525;

  backgroundRect = g.rectangle(g.canvas.width, g.canvas.height/4, "black");
  backgroundRect.x = 0;
  backgroundRect.y = g.canvas.height/4 * 3;

  /*
  exitText = g.text("Exit", "18px Futura", "white", 20, 20);
  exitText.x = 750;
  exitText.y = 500;
  */

  dialogueScene.addChild(backgroundRect);
  //dialogueScene.addChild(exitText);
  dialogueScene.addChild(dialogueText);
  dialogueScene.addChild(npcNameText);

  /*
  exitText.interactive = true;
  exitText.buttonMode = true;

  exitText.on('mousedown', dispGame);
  */

  document.addEventListener("keydown", event =>
  {
    if (event.isComposing || event.keyCode != null)
    {
      document.removeEventListener("keydown", event);
      dispGame();
    }
  });
}

function setupInventoryScene(location, npc)
{
  g.state = setupInventoryScene;
  inventoryScene.removeChildren();
  backgroundRect2 = g.rectangle(g.canvas.width, g.canvas.height/5, "black");

  inventoryScene.addChild(backgroundRect2);

  backgroundRect2.x = 0;
  backgroundRect2.y = 0;

  var i, currentItem;

  for (i = 0; i < inventory.length; i++)
  {
    //currentItem.push(g.text(inventory[i].name, "18px Futura", "white", 20, 20));
    currentItem = inventory[i].button;
    inventoryScene.addChild(currentItem);

    currentItem.x = 10 + 100 * i;
    currentItem.y = 50;
    /*
    if (location == DIALOGUE)
    {
      currentItem.interactive = true;
      currentItem[i].interact = true;
      currentItem[i].buttonMode = true;

      //console.log("index: " + (i-1));
      console.log("inventory length: " + inventory.length);
    }
    */
  }

}

function setupPopUpScene(title, content)
{
  popupScene.removeChildren();
  backgroundRect = g.rectangle(g.canvas.width/5, g.canvas.height/5, "black");
  popupTitleText = g.text(title, "18px Futura", "white", 20, 20);
  popupContentText = g.text(content, "18px Futura", "white", 20, 20);

  popupScene.addChild(backgroundRect);
  popupScene.addChild(popupTitleText);
  popupScene.addChild(popupContentText);
}

function setupGameOverScene()
{
  gameOverText = g.text("You won!", "18px Futura", "white", 20, 20);

  gameOverScene.addChild(gameOverText);
}
