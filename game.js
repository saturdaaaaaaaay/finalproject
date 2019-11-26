/*
 * Planilandia - a friend-making RPG
 */

// Loader
thingsToLoad = [
    "maps/building.json",
    "images/tileset_1.1.png",
    "maps/world_map_1.1.json"
  ];

  //Create a new Hexi instance, and start it.
  g = hexi(WIDTH, HEIGHT, setup, thingsToLoad);

  //Start Hexi
  g.start();

  //The setup function to initialize the application
  function setup() {
    world_state = "world"

    // Make a map of inside a building
    building_world = g.makeTiledWorld(
        "maps/building.json",
        "images/tileset_1.1.png"
    );
    outside_world = g.makeTiledWorld(
        "maps/world_map_1.1.json",
        "images/tileset_1.1.png"
    );
    world = outside_world;

    //call setup methods
    setupSprites();
    setupDialogue();
    setupItems();
    setupQuests();
    setupNPCs();
    setupScenes();

    // Add a world camera to follow the player
    camera = g.worldCamera(world, world.worldWidth, world.worldHeight);
    camera.centerOver(player);

    // Get data from the map
    wallMapArray = world.getObject("wallLayer").data;
    npcArray = world.getObject("npcLayer").data;
	itemLayerArray = world.getObject("itemLayer").data;
    doorMapArray = world.getObject("doorLayer").data;
	itemMapArray = world.getObject("itemLayer").data;

    //Give the `player` a `direction` property
    player.direction = "";

    // Set directional objects
    leftArrow = g.keyboard(KEY_LEFT);
    upArrow = g.keyboard(KEY_UP);
    rightArrow = g.keyboard(KEY_RIGHT);
    downArrow = g.keyboard(KEY_DOWN);
    interact = g.keyboard(ACTION_KEY);
    questkey = g.keyboard(QUEST_KEY);

    //Program the keyboard objects; moves while the key is pressed, stops when released
    leftArrow.press = () => player.direction = "left";
    upArrow.press = () => player.direction = "up";
    rightArrow.press = () => player.direction = "right";
    downArrow.press = () => player.direction = "down";

    // Stop the player when the button is released
    leftArrow.release = () => player.direction = "none";
    upArrow.release = () => player.direction = "none";
    rightArrow.release = () => player.direction = "none";
    downArrow.release = () => player.direction = "none";

    // Player attempts interaction
    interact.press = function() {
      console.log("interaction");
      checkForDoor();
    };

    //pull up quests page by pressing 'q'
    questkey.press = function() {
      console.log("quests");
      dispQuestList();
    };

    //Change the game state to `play`
    g.state = dispTitle;
  }


  function setupSprites()
  {
    // Get references to objects
    player = world.getObject("player");
    quest_NPC = world.getObject("quest_NPC");
    reg_NPC = world.getObject("reg_NPC");
    item = world.getObject("item");
    doors = world.getObjects("door");

    // setup trigger NPC's
    setupTriggers();
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
    item1 = new Item("Gloves", item);
	itemArray.push(item1);
  }

  //set up quest objects
  function setupQuests()
  {
    quest1 = new Quest (item1, QUEST_AVAILABLE);
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


    //make all scenes but title scene invisible
    titleScene.visible = true;
    dialogueScene.visible = false;
    menuScene.visible = false;
    questListScene.visible = false;
    gameScene.visible = false;

    //call methods to set up each scene graph
    setupTitleScene();
    setupGameScene();
    setupMenuScene();
    setupQuestListScene();
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
    if (questArray.length > 0)
    {
      var i;
      for (i = 0; i < questArray.length; i++)
      {
        questTextArray.push(g.text(questArray[i].display(), "18px Futura", "red", 20, 20));
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

    exitText = g.text("Exit", "18px Futura", "white", 20, 20);
    exitText.x = 750;
    exitText.y = 500;

    dialogueScene.addChild(backgroundRect);
    dialogueScene.addChild(exitText);
    dialogueScene.addChild(dialogueText);
    dialogueScene.addChild(npcNameText);

    exitText.interactive = true;
    exitText.buttonMode = true;

    exitText.on('mousedown', dispGame);

    document.addEventListener("keydown", event =>
    {
      if (event.isComposing || event.keyCode != null)
      {
        document.removeEventListener("keydown", event);
        dispGame();
      }
    });
  }

  function dispTitle()
  {
    g.state = dispTitle;
    titleScene.visible = true;

    gameScene.visible = false;
    menuScene.visible = false;
  }

  function dispGame()
  {
    g.state = play;
    gameScene.visible = true;

    menuScene.visible = false;
    dialogueScene.visible = false;
    titleScene.visible = false;
  }

  function dispMenu()
  {
    g.state = dispMenu;
    menuScene.visible = true;

    dialogueScene.visible = false;
    gameScene.visible = false;
    questListScene.visible = false;
  }

  function dispQuestList()
  {
    g.state = dispQuestList;

    setupQuestListScene();
    questListScene.visible = true;

    menuScene.visible = false;
    dialogueScene.visible = false;
    gameScene.visible = false;
  }

  function dispDialogue()
  {
    g.state = dispDialogue;
    dialogueScene.visible = true;
  }


  function checkForDoor()
  {
    let playerVsDoor = g.hitTestTile(player, doorMapArray, 3, world, "center");
    if (playerVsDoor.hit) {
      switch(world_state) {
        case "building":
          world_state = "world";
          break;
        case "world":
          world_state = "building";
          break;
      }
      loadMap(world_state);
    }
  }

  function loadMap(MAP) {
    world.visible = false;
    switch(MAP) {
      case "building":
        world = building_world;
        break;
      case "world":
        world = outside_world;
        break;
    }
    world.visible = true;
    // Setup the player
    player = world.getObject("player");
    //Give the `player` a `direction` property
    player.direction = "";

    // Add a camera to follow the player in both outside and inside worlds
    camera = g.worldCamera(world, world.worldWidth, world.worldHeight);
    camera.centerOver(player);

    loadWallsAndDoors(world);
  }

function loadWallsAndDoors(MAP) {
  wallMapArray = MAP.getObject("wallLayer").data;
  doorMapArray = MAP.getObject("doorLayer").data;
  doors = MAP.getObjects("door");
}


  //The `play` function contains all the game logic and runs in a loop
  function play() {

    // Handle player movement
    if (Math.floor(player.x) % world.tilewidth === 0 && Math.floor(player.y) % world.tileheight === 0) {
      switch (player.direction) {
        case "up":
          player.vy = -MOVE_SPEED;
          player.vx = 0;
          break;
        case "down":
          player.vy = MOVE_SPEED;
          player.vx = 0;
          break;
        case "left":
          player.vx = -MOVE_SPEED;
          player.vy = 0;
          break;
        case "right":
          player.vx = MOVE_SPEED;
          player.vy = 0;
          break;
        case "none":
          player.vx = 0;
          player.vy = 0;
          break;
      }
    }

    //Move the player and camera
    g.move(player);
    camera.follow(player);

    //checks for collision with wall, NPC, item, or trigger
    playerVsFloor = g.hitTestTile(player, wallMapArray, 0, world, "every");
    playerVsNPC = g.hitTestTile(player, npcArray, 0, world, "every");
	playerVsItem = g.hitTestTile(player, itemLayerArray, 0, world, "every");
	playerVsTrigger = playerTriggerHitTest();


    checkForNPC();
	checkForItem();

    tempItem = null; //reset tempItem
    /*
    //display quests
    if (questArray.length > 0 && counter == 0)
    {
      var i;
      for (i = 0; i < questArray.length; i++)
      {
        console.log(questArray[i].display());
      }
      counter = 1;
    }
    */
  }
