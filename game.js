/*

*/

// Loader
thingsToLoad = [
    "maps/building.json",
    "images/tileset_1.1.png",
    "maps/world_map_1.1.json"
  ];

  // Create a new Hexi instance, and start it.
  g = hexi(WIDTH, HEIGHT, setup, thingsToLoad);

  // Start Hexi
  g.start();

  // Setup the app
  function setup() {
    world_state = "world"
    loadMap(world_state);

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
    g.state = play;
  }

  function checkForDoor() {
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
        quest_NPC = world.getObject("quest_NPC");
        reg_NPC = world.getObject("reg_NPC");
        item = world.getObject("item");
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

    let playerVsFloor = g.hitTestTile(player, wallMapArray, 0, world, "every");

    //If every corner point on the player isn't touching a floor tile (array gridIDNumber: 0) then
    //prevent the player from moving
    //
    if (!playerVsFloor.hit) {

      //To prevent the player from moving, subtract its velocity from its position
      player.x -= player.vx;
      player.y -= player.vy;
      player.vx = 0;
      player.vy = 0;
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
