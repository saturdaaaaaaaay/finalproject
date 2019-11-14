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
    world_state = "world";
    buildingWorld = g.makeTiledWorld(
        "maps/building.json",
        "images/tileset_1.1.png"
    );
    townSquareWorld = g.makeTiledWorld(
        "maps/world_map_1.1.json",
        "images/tileset_1.1.png"
    );
    loadMap(world_state);
/*
    //Make the world from the Tiled JSON data and the tileset PNG image
    world = g.makeTiledWorld(
      "maps/world_map_1.1.json",
      "images/tileset_1.1.png"
    );
*/

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

    questkey.press = function() {
      console.log("quests");
    };

    //Change the game state to `play`
    g.state = dispTitle;
  }

  function setupSprites()
  {
    /*
    Get a reference to the `player` sprite.
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

  function setupDialogue()
  {
    thomasDiag = new Dialogue("Hey little dude! Welcome to our town. My name is Thomas.",
          "Man, my hands are so cold. I wish I hadn’t left my gloves at home.",
          "Thank you so much little dude! I actually found my gloves, but I could still use these.");
    miaDiag = new Dialogue("¿TRES leches? ¿En esta economia?", "", "");
  }

  function setupItems()
  {
    item1 = new Item("Gloves", item);
  }

  function setupQuests()
  {
    quest1 = new Quest (item1, QUEST_AVAILABLE);
  }

  function setupNPCs()
  {
    qNPC = new QuestNPC("Thomas", quest_NPC, thomasDiag, quest1);
    rNPC = new RegNPC("Mia", reg_NPC, miaDiag);

    questNPCArray.push(qNPC);
    regNPCArray.push(rNPC);
  }

  function setupScenes()
  {
    gameScene = g.group();
    menuScene = g.group();
    dialogueScene = g.group();
    questListScene = g.group();
    titleScene = g.group();

    titleScene.visible = true;
    dialogueScene.visible = false;
    menuScene.visible = false;
    questListScene.visible = false;
    gameScene.visible = false;
    setupTitleScene();
    setupGameScene();
    setupMenuScene();
    setupQuestListScene();
  }

  function setupTitleScene()
  {
    backgroundRect = g.rectangle(800, 600, "black");
    titleText = g.text("Cool title goes here", "18px Futura", "red", 20, 20);
    g.stage.putCenter(titleText);
    playText = g.text("Play", "18px Futura", "red", 20, 20);
    playText.x = 400;
    playText.y = 400;

    titleScene.addChild(backgroundRect);
    titleScene.addChild(titleText);
    titleScene.addChild(playText);

    playText.interactive = true;
    playText.buttonMode = true;

    playText.on('mousedown', dispGame);
  }

  function setupGameScene()
  {
    menuText = g.text("Menu", "18px Futura", "red", 20, 20);
    menuText.x = 750;
    menuText.y = 0;//g.canvas.height / 2 - 18;

    gameScene.addChild(menuText);

    menuText.interactive = true;
    menuText.buttonMode = true;

    //when clicked, will display menu scene
    menuText.on('mousedown', dispMenu);
  }

  function setupMenuScene()
  {
    backgroundRect = g.rectangle(300, 300, "black");
    g.stage.putCenter(backgroundRect, 0, 0);
    //backgroundRect.x = g.canvas.width / 2;
    //backgroundRect.y = g.canvas.height / 2;

    menuScene.addChild(backgroundRect);

    questListText = g.text("Quest List", "18px Futura", "red", 20, 20);
    questListText.x = g.canvas.width/2;
    questListText.y = g.canvas.height / 2 - 18;
    cancelText = g.text("Cancel", "18px Futura", "red", 20, 20);
    cancelText.x = 400;
    cancelText.y = 400;

    menuScene.addChild(questListText);
    menuScene.addChild(cancelText);

    questListText.interactive = true;
    questListText.buttonMode = true;
    cancelText.interactive = true;
    cancelText.buttonMode = true;

    //when clicked, will display menu scene
    questListText.on('mousedown', dispQuestList);
    cancelText.on('mousedown', dispGame);
  }

  function setupQuestListScene()
  {
    questListScene.removeChildren(); //reset scene graph
    backgroundRect = g.rectangle(300, 300, "black");
    g.stage.putCenter(backgroundRect, 0, 0);

    questListScene.addChild(backgroundRect);

    if (questArray.length > 0)
    {
      questTextArray.push(g.text(questArray[0].display(), "18px Futura", "red", 20, 20));

      var i, currentQuest;
      for (i = 0; i < questTextArray.length; i++)
      {
        currentQuest = questTextArray[i];
        questListScene.addChild(currentQuest);
        //g.stage.putCenter(currentQuest, 0, -100);
        currentQuest.x = 300;
        currentQuest.y = 300;
      }
    }
    else
    {
      emptyQuestText = g.text("No quests available", "18px Futura", "red", 20, 20);

      questListScene.addChild(emptyQuestText);
      emptyQuestText.x = 300;
      emptyQuestText.y = 300;
    }

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
      console.log("go inside building");
    }
  }

  function loadMap(MAP) {
  switch(MAP) {
    case "building":
      // Make a map of inside a building
      world = g.makeTiledWorld(
          "maps/building.json",
          "images/tileset_1.1.png"
      );
      break;
    case "world":
      world = g.makeTiledWorld(
          "maps/world_map_1.1.json",
          "images/tileset_1.1.png"
      );

      // Setup the npc and item sprites
      /*
      player = world.getObject("player");
      quest_NPC = world.getObject("quest_NPC");
      reg_NPC = world.getObject("reg_NPC");
      item = world.getObject("item");
      */
      setupSprites();
      break;
  }

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

    /*
    Prevent the player from walking through walls using the
    versatile `hitTestTile` method. `hitTestTile` checks for a
    collision between a sprite and a tile in any map array that you
    specify. It returns a `collision` object.
    `collision.hit` is a Boolean that tells you if a sprite is colliding
    with the tile that you're checking. `collision.index` tells you the
    map array's index number of the colliding sprite. You can check for
    a collision with the tile against "every" corner point on the
    sprite, "some" corner points, or the sprite's "center" point. (Each
    of these three options has a different and useful effect, so experiment with
    them.)

    `hitTestTile` arguments:
    sprite, array, collisionTileGridIdNumber, worldObject, spritesPointsToCheck

    The `world` object (the 4th argument) has to have these properties:
    `tileheight`, `tilewidth`, `widthInTiles`.

    `hitTestTile` will work for any map array, not just those made with
    Tiled Editor. So you can use it with your own game maps in the same way.

    */

    //checks for collision with wall or NPC
    let playerVsFloor = g.hitTestTile(player, wallMapArray, 0, world, "every");
    let playerVsNPC = g.hitTestTile(player, npcArray, 0, world, "every");

    //If every corner point on the player isn't touching a floor tile (array gridIDNumber: 0) then
    //prevent the player from moving
    //
    if (!playerVsFloor.hit || !playerVsNPC.hit) {

      //To prevent the player from moving, subtract its velocity from its position
      player.x -= player.vx;
      player.y -= player.vy;
      player.vx = 0;
      player.vy = 0;
    }

    let tempItem = null; //set up tempItem (catches NPC quest if NPC has a quest)
    //if collided with an NPC...
    if (!playerVsNPC.hit)
    {
      //checks if collided with Quest NPC
      var i = 0;
      var qFound = false;
      while (i < questNPCArray.length && !qFound)
      {
        //compares index of collision object with index of quest sprite
        if (playerVsNPC.index == questNPCArray[i].object.index)
        {
          tempItem = questNPCArray[i].interact();
          qFound = true;
          setupDialogueScene(questNPCArray[i]);
          dispDialogue();
        }
        i++;
      }
      //catches Quest NPC's quest and adds to quest array
      if (tempItem != null)
      {
        questArray.push(tempItem);
      }



      //checks if collided with Regular NPC
      i = 0;
      var rFound = false;
      while (i < regNPCArray.length && !rFound)
      {
        //compares index of collision boject with index of regular sprite
        if (playerVsNPC.index == regNPCArray[i].object.index)
        {
          regNPCArray[i].interact(); //interact with NPC
          rFound = true;
          setupDialogueScene(regNPCArray[i]);
          dispDialogue();
        }
        i++;
      }
      qFound = false;
      rFound = false;
    }

    tempItem = null; //reset tempItem

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

/*
    //Let the player pick up bombs
    let playerVsBomb = g.hitTestTile(player, bombMapArray, 5, world, "every");

    //Find out if the player's position in the bomb array matches a bomb gid number
    if (playerVsBomb.hit) {

      //If it does, filter through the bomb sprites and find the one
      //that matches the player's position
      bombSprites = bombSprites.filter(function(bomb) {

        //Does the bomb sprite have the same index number as the player?
        if (bomb.index === playerVsBomb.index) {

          //If it does, remove the bomb from the
          //`bombMapArray` by setting its gid to `0`
          bombMapArray[bomb.index] = 0;

          //Remove the bomb sprite from its container group
          g.remove(bomb);

          //Alternatively, remove the bomb with `removeChild` on
          //the `bombLayer` group
          //bombLayer.removeChild(bomb);
          //Filter the bomb out of the `bombSprites` array
          return false;
        } else {

          //Keep the bomb in the `bombSprites` array if it doesn't match
          return true;
        }
      });
    }
*/
  }
