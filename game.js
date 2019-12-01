/*
 * Planilandia - a friend-making RPG
 */

// Loader
thingsToLoad = [
    "maps/building.json",
    "images/assets.json",
    "images/tileset.png",
    "maps/world.json",
    "audio/bloop.mp3",
    "audio/close.mp3",
    "audio/gibberish.mp3",
    "audio/lose.wav",
    "audio/pop.mp3",
    "audio/step.mp3",
    "audio/win.wav"
  ];

  //Create a new Hexi instance, and start it.
  g = hexi(WIDTH, HEIGHT, setup, thingsToLoad);

  //Start Hexi
  g.start();

  //The setup function to initialize the application
  function setup() {
    sfxBloop = g.sound("audio/bloop.mp3");
    sfxClose = g.sound("audio/close.mp3");
    sfxGibberish = g.sound("audio/gibberish.mp3");
    sfxLose = g.sound("audio/lose.wav");
    sfxPop = g.sound("audio/pop.mp3");
    sfxStep = g.sound("audio/step.mp3");
    sfxWin = g.sound("audio/win.wav");

    world_state = "world";

    // Make a map of inside a building
    building_world = g.makeTiledWorld(
        "maps/building.json",
        "images/tileset.png"
    );
    outside_world = g.makeTiledWorld(
        "maps/world.json",
        "images/tileset.png"
    );
    world = outside_world;

    //call setup methods
    setupSprites();
    setupItems();
    setupDialogue();
    // setup trigger NPC's
    setupTriggers();

    setupQuests();
    setupNPCs();
    setupScenes();
    
    // Setup player sprite that is visible
    player_tex = g.sprite("penguin_1.png");
    player_tex.position = player.position;
    world.addChild(player_tex);

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
    menukey = g.keyboard(MENU_KEY);
    inventorykey = g.keyboard(INVENTORY_KEY);

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

    inventorykey.press = function() {
      console.log("quests");
      dispInventory();
    };

    menukey.press = function() {
      console.log("quests");
      dispMenu();
    };

    //Change the game state to `play`
    g.state = dispTitle;
  }

  function checkForDoor()
  {
    let playerVsDoor = g.hitTestTile(player, doorMapArray, 9, world, "center");
    if (playerVsDoor.hit) {
      player.vx = 0;
      player.vy = 0;
      player.direction = "none";

      switch(world_state) {
        case "building":
          player.position.y = Math.floor(player.position.y / TILE_SIZE) * TILE_SIZE;
          world_state = "world";
          break;
        case "world":
          player.position.y = Math.floor(player.position.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
          world_state = "building";
          break;
      }
      loadMap(world_state);
    }
  }

  function checkGameOver()
  {
    var i, count = 0;
    for (i = 0; i < allQuestsArray.length; i++)
    {
      if (allQuestsArray[i].questState === QUEST_COMPLETE)
      {
        count++;
        console.log("completed: " + count);
      }
    }

    if (count === allQuestsArray.length)
    {
      console.log("game over");
      dispGameOver();
    }
  }

  function reset()
  {
    questArray = [];
    allQuestsArray = [];
    questNPCArray = [];
    regNPCArray = [];
    questTextArray = [];
    itemArray = [];
    inventory = [];
    worldTriggerArray = [];
    buildingTriggerArray = [];

    g.remove(gameScene);
    g.remove(dialogueScene);
    g.remove(menuScene);
    g.remove(questListScene);
    g.remove(titleScene);
    g.remove(inventoryScene);
    g.remove(gameOverScene);

    setup();
    g.state = play;
    //g.resume();
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

    world.addChild(player_tex);
    player_tex.position = player.position;
    updatePlayerTexture();
    
    // Add a camera to follow the player in both outside and inside worlds
    camera = g.worldCamera(world, world.worldWidth, world.worldHeight);
    camera.centerOver(player);

    loadWallsAndDoors(world);
  }

function loadWallsAndDoors(MAP) {
  wallMapArray = MAP.getObject("wallLayer").data;
  doorMapArray = MAP.getObject("doorLayer").data;
  npcArray = MAP.getObject("npcLayer").data;
  doors = MAP.getObjects("door");
}


  //The `play` function contains all the game logic and runs in a loop
  function play() {

    // Handle player movement
    player_tex.position = player.position;
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
      updatePlayerTexture();
    }

    //Move the player and camera
    g.move(player);
    camera.follow(player);

    //checks for collision with wall, NPC, item, or trigger
    playerVsFloor = g.hitTestTile(player, wallMapArray, 0, world, "every");
    playerVsNPC = g.hitTestTile(player, npcArray, 0, world, "every");
	playerVsItem = g.hitTestTile(player, itemLayerArray, 0, world, "every");
	playerVsTrigger = playerTriggerHitTest();

    checkForDoor();
    checkForNPC();
  	checkForItem();

    if (g.state != dispDialogue)
    {
      checkGameOver();
    }

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

  function updatePlayerTexture() {
    player_tex.vx = player.vx;
    player_tex.vy = player.vy;
  }
