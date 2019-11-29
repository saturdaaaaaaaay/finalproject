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
    world_state = "world";

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
