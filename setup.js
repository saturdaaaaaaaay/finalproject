function setupSprites()
{
  // player sprite
  player = world.getObject("player");

  // npc sprites
  thomas = outside_world.getObject("thomas");
  replaceWithAnimatedSprite(thomas, ["reindeer_1.png", "reindeer_2.png"], outside_world)

  rebecca = outside_world.getObject("rebecca");
  replaceWithAnimatedSprite(rebecca, ["rebecca.png"], outside_world);

  elie = outside_world.getObject("elie");
  replaceWithAnimatedSprite(elie, ["bill-1.png", "bill-2.png"], outside_world);

  patrick = building_world.getObject("patrick");
  replaceWithAnimatedSprite(patrick, ["cat_1.png", "cat_2.png"], building_world);

  seth = outside_world.getObject("seth");
  replaceWithAnimatedSprite(seth, ["mog_left-1.png", "mog_left-2.png", "mog_left-3.png", "mog_left-4.png"], outside_world);

  snowy = outside_world.getObject("snowy");
  replaceWithAnimatedSprite(snowy, ["owl_1.png", "owl_2.png"], outside_world);
  
  pepe = outside_world.getObject("pepe");
  replaceWithAnimatedSprite(pepe, ["pepe-1.png", "pepe-2.png"], outside_world);

  // item sprites
  gloves = outside_world.getObject("gloves");
  redherring = outside_world.getObject("redherring");

  // doors from the world
  doors = world.getObjects("door");
}

// The NPC texture from the map is transparent.
// Show the animated textures instead.
function replaceWithAnimatedSprite(SPRITE, FRAMES, WORLD) {
  let animSprite = g.sprite(FRAMES);

  animSprite.position = SPRITE.position;
  animSprite.index = SPRITE.index;
  animSprite.animationSpeed = ANIM_SPEED;
  animSprite.play();

  WORLD.addChild(animSprite);
}
//sets up dialogue for NPCs
function setupDialogue()
{
  thomasDiag = new Dialogue("Hey little dude! Welcome to our town. My name is Thomas.",
        "Man, my hands are so cold. I wish I hadn’t left my gloves at home.",
        "Thank you so much little dude! I actually found my gloves, but I could still use these.");
  miaDiag = new Dialogue("¿TRES leches? ¿En esta economia?", "", "");
  snowyDialog = new Dialogue("...sigh...\nI'm so bored.",
        "I wish I had something pretty to look at.",
        "What beautiful flowers! They're not my favorite but they will do for now.");
  patrickDialog = new Dialogue("I've always dreamt of being a witch, flying around to different cities.",
        "Do you think you can find something to help me become a witch?",
        "Wow! This is exactly what I wanted! ありがとう");
  sethDialog = new Dialogue("Actually my dream is to own a minimalistic farm.", "", "");
  rebeccaDialog = new Dialogue("Have you seen any delicious bugs around?", "", "");
  elieDialog = new Dialogue("Let's be friends.", "", "");
  pepeDialog = new Dialogue("Hexi stinks!\nWhat's Hexi? I have no idea...", "", "");
}

//set up item objects
function setupItems()
{
  itemGloves = new Item("Gloves", gloves);
  itemArray.push(itemGloves);
  itemRedHerring = new Item("Red Herring", redherring);
  itemArray.push(itemRedHerring);
  itemFlowers = new Item("Flowers", null);
  itemArray.push(itemFlowers);
  itemPerfume = new Item("Perfume", null);
  itemArray.push(itemPerfume);
  itemBroom = new Item("Broom", null);
  itemArray.push(itemBroom);
  itemWand = new Item("Magic Wand", null);
  itemArray.push(itemWand);
}

//set up quest objects
function setupQuests()
{
  quest1 = new Quest (itemGloves, QUEST_AVAILABLE);
  quest2 = new Quest (itemBroom, QUEST_AVAILABLE);
  quest3 = new Quest (itemFlowers, QUEST_AVAILABLE);
  allQuestsArray.push(quest1);
  allQuestsArray.push(quest2);
  allQuestsArray.push(quest3);
}

//set up NPC objects
function setupNPCs()
{
  npcThomas = new QuestNPC("Thomas", thomas, thomasDiag, quest1);
  npcPatrck = new QuestNPC("Patrick", patrick, patrickDialog, quest2);
  npcSnowy = new QuestNPC("Snowy", snowy, snowyDialog, quest3);

  npcRebecca = new RegNPC("Rebecca", rebecca, rebeccaDialog);
  npcElie = new RegNPC("Elie", elie, elieDialog);
  npcSeth = new RegNPC("Seth", seth, sethDialog);
  npcPepe = new RegNPC("Pepe", pepe, pepeDialog);

  questNPCArray.push(npcThomas);
  questNPCArray.push(npcPatrck);
  questNPCArray.push(npcSnowy);

  regNPCArray.push(npcRebecca);
  regNPCArray.push(npcElie);
  regNPCArray.push(npcSeth);
  regNPCArray.push(npcPepe);
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
  gameOverScene = g.group();
  inventoryScene = g.group();


  //make all scenes but title scene invisible
  titleScene.visible = true;

  dialogueScene.visible = false;
  menuScene.visible = false;
  questListScene.visible = false;
  gameScene.visible = false;
  gameOverScene.visible = false;
  inventoryScene.visible = false;

  //call methods to set up each scene graph
  setupTitleScene();
  setupGameScene();
  setupMenuScene();
  setupQuestListScene();
  setupGameOverScene();
  setupInventoryScene();
}

//set up title scene
function setupTitleScene()
{
  //background
  backgroundRect = g.rectangle(800, 600, "black");

  //creates and positions title text
  titleText = g.text("Planilandia", "18px Futura", "white", 20, 20);
  g.stage.putCenter(titleText);

  //creates and positions play button
  playText = g.text("Play", "18px Futura", "white", 20, 20);
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
  let buttonFunctions = function() {
    sfxPop.play();
    dispGame();
  }
  playText.on('mousedown', buttonFunctions);
}

//set up game scene
function setupGameScene()
{
  //create and position menu text
  menuText = g.text("Menu", "18px Futura", "white", 20, 20);
  menuText.x = 750;
  menuText.y = 0;//g.canvas.height / 2 - 18;

  //add menu text to game scene
  gameScene.addChild(menuText);

  //creates menu button
  menuText.interactive = true;
  menuText.buttonMode = true;

  //when clicked, will display menu scene
  let buttonFunctions = function() {
    sfxPop.play();
    dispMenu();
  }
  menuText.on('mousedown', buttonFunctions);
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
  questListText = g.text("Quest List", "18px Futura", "white", 20, 20);
  questListText.x = g.canvas.width/2;
  questListText.y = g.canvas.height / 2 - 18;
  inventoryText = g.text("Inventory", "18px Futura", "white", 20, 20);
  inventoryText.x = g.canvas.width/2;
  inventoryText.y = g.canvas.height / 2;
  cancelText = g.text("Cancel", "18px Futura", "white", 20, 20);
  cancelText.x = 400;
  cancelText.y = 400;

  //add text to scene
  menuScene.addChild(backgroundRect);
  menuScene.addChild(questListText);
  menuScene.addChild(inventoryText);
  menuScene.addChild(cancelText);

  //create buttons
  questListText.interactive = true;
  questListText.buttonMode = true;
  inventoryText.interactive = true;
  inventoryText.buttonMode = true;
  cancelText.interactive = true;
  cancelText.buttonMode = true;

  //when clicked, will display quest list scene
  let buttonFunctions = function() {
    sfxPop.play();
    dispQuestList();
  }
  questListText.on('mousedown', buttonFunctions);
  //when clicked, will display game scene
  buttonFunctions = function() {
    sfxClose.play();
    dispGame();
  }
  cancelText.on('mousedown', buttonFunctions);

  buttonFunctions = function() {
    sfxClose.play();
    dispInventory();
  }
  inventoryText.on('mousedown', buttonFunctions);
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
  if (questArray.length > 0)
  {
    var i;
    for (i = 0; i < questArray.length; i++)
    {
      questTextArray.push(g.text(questArray[i].display(), "18px Futura", "white", 20, 20));
    }
    var currentQuest;
    //console.log("quest array length: " + questTextArray.length);
    for (i = 0; i < questTextArray.length; i++)
    {
      currentQuest = questTextArray[i];
      //console.log("quest: " + i);
      questListScene.addChild(currentQuest);
      //g.stage.putCenter(currentQuest, 0, -100);
      currentQuest.x = 300;
      currentQuest.y = 200 + (i * 50);
    }

    questTextArray = [];
  }
  else //if no quests, display unavailable text
  {
    emptyQuestText = g.text("No quests available", "18px Futura", "white", 20, 20);

    questListScene.addChild(emptyQuestText);
    emptyQuestText.x = 300;
    emptyQuestText.y = 300;
  }

  //cancel button
  cancelText = g.text("Cancel", "18px Futura", "white", 20, 20);
  cancelText.x = 400;
  cancelText.y = 400;

  questListScene.addChild(cancelText);

  cancelText.interactive = true;
  cancelText.buttonMode = true;

  //when clicked, will display menu scene
  let buttonFunctions = function() {
    sfxClose.play();
    dispMenu();
  }
  cancelText.on('mousedown', buttonFunctions);
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

  exitText = g.text("Exit", "18px Futura", "white", 20, 20);
  exitText.x = 750;
  exitText.y = 500;

  dialogueScene.addChild(backgroundRect);
  dialogueScene.addChild(exitText);
  dialogueScene.addChild(dialogueText);
  dialogueScene.addChild(npcNameText);

  exitText.interactive = true;
  exitText.buttonMode = true;

  let buttonFunctions = function() {
    sfxClose.play();
    dispGame();
  }
  exitText.on('mousedown', buttonFunctions);

  document.addEventListener("keydown", event =>
  {
    if (event.isComposing || event.keyCode != null)
    {
      document.removeEventListener("keydown", event);
      dispGame();
    }
  });
}

function setupGameOverScene()
{
  backgroundRect = g.rectangle(g.canvas.width, g.canvas.height, "black");
  gameOverText =  g.text("Game Over", "18px Futura", "white", 20, 20);
  startOverText =  g.text("Start Over", "18px Futura", "white", 20, 20);

  gameOverScene.addChild(backgroundRect);
  gameOverScene.addChild(gameOverText);
  gameOverScene.addChild(startOverText);

  g.stage.putCenter(startOverText);

  startOverText.interactive = true;
  startOverText.buttonMode = true;

  //when clicked, will display menu scene
  let buttonFunctions = function() {
    sfxClose.play();
    reset();
    //dispTitle();
  }
  startOverText.on('mousedown', buttonFunctions);
}

function setupInventoryScene()
{
  backgroundRect2 = g.rectangle(g.canvas.width, g.canvas.height/5, "black");
  backgroundRect2.x = 0;
  backgroundRect2.y = 0;

  inventoryScene.addChild(backgroundRect2);

  cancelText = g.text("Cancel", "18px Futura", "white", 20, 20);
  cancelText.x = 0;
  cancelText.y = g.canvas.height/5 - 20;

  if (inventory.length > 0)
  {
    var currentItem, i;

    for (i = 0; i < inventory.length; i++)
    {
      currentItem = g.text(inventory[i].name, "18px Futura", "white", 20, 20);
      inventoryScene.addChild(currentItem);

      currentItem.x = 50 + 20 * i;
      currentItem.y = g.canvas.height/10;
    }
  }
  else
  {
    inventoryScene.addChild(g.text("No items", "18px Futura", "white", 20, 20));
  }

  inventoryScene.addChild(cancelText);

  cancelText.interactive = true;
  cancelText.buttonMode = true;

  //when clicked, will display menu scene
  let buttonFunctions = function() {
    sfxClose.play();
    dispMenu();
  }
  cancelText.on('mousedown', buttonFunctions);
}
