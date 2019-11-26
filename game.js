/*
Learn how to import and use data from Tiled Editor.

Hexi supports game maps and levels created using the popular Tiled
Editor level designer:

www.mapeditor.org
*/

// Loader
thingsToLoad = [
    "maps/building.json",
    "images/tileset_1.1.png",
    "maps/world_map_1.1.json"
  ];

  //Create a new Hexi instance, and start it.
  g = hexi(WIDTH, HEIGHT, setup, thingsToLoad);

  //Set the background color and scale the canvas
  //g.backgroundColor = "black";
  //g.scaleToWindow();

  //Start Hexi
  g.start();

  //The `setup` function to initialize your application
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

    /*
    Each Tiled Editor layer has a `name` that can be accessed in your
    game code using
    `world.getObject` Tiled Editor's `tilelayers` have a `data` property
    that is an array containing all the grid index numbers (`gid`) of
    the tiles in that array. In this example we want to access all the
    wall sprites. In Tiled Editor, all the wall sprites were added to
    a tile layer called `wallLayer`. We can access the `wallLayer`'s
    `data` array of sprites like this:
    */

    wallMapArray = world.getObject("wallLayer").data;
    npcArray = world.getObject("npcLayer").data;

    /*
    We also need a reference to the bomb layer. All Tiled Editor layers are
    created as `groups` by Hexi's `makeTiledWorld` method. That means they
    all have a `children` array that lets' you access all the sprites on
    that layer, if you even need to do that.
    */
    doorMapArray = world.getObject("doorLayer").data;

    /*
    You can use `world.getObjects` (with an "s") to get an array of all
    the things in the world that have the same `name` properties. There
    are 5 bombs in the world, all which have share the same `name`
    property: "bomb". Here's how you can access to all of them in an
    array:
    */



    //Give the `player` a `direction` property
    player.direction = "";

    //Configure Hexi's built in arrow keys to assign the player a direction
    //Create some keyboard objects
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
      console.log("go inside building");
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

    //Change the player's direction only if it's at an intersection
    //(This keeps it aligned to the grid cells. You don't have to do
    //this but it's a nice effect that you might want to use in your
    //own games at some point.)

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

    //Keep the player contained inside the canvas
    //g.contain(player, g.stage);

    //checks for collision with wall or NPC
    playerVsFloor = g.hitTestTile(player, wallMapArray, 0, world, "every");
    playerVsNPC = g.hitTestTile(player, npcArray, 0, world, "every");

    //If every corner point on the player isn't touching a floor tile (array gridIDNumber: 0) then
    //prevent the player from moving
    //

    checkForNPC();

    tempItem = null; //reset tempItem

    checkGameOver();
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

  function checkGameOver()
  {
    var i, current, counter = 0;
    for (i = 0; i < questArray.length; i++)
    {
      current = questArray[i];

      if (current.questState == QUEST_COMPLETE)
      {
        counter++;
      }
    }

    if (counter == questArray.length)
    {
      dispGameOver();
    }
  }
