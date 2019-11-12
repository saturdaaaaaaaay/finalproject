/*
Learn how to import and use data from Tiled Editor.

Hexi supports game maps and levels created using the popular Tiled
Editor level designer:

www.mapeditor.org

To prepare your Tiled Editor game world for use in Hexi, give any significant thing a
`name` property. Anything with a `name` property in Tiled Editor can
be accessed in your code by its string name, as you'll see ahead. Tiled Editor layers have a
`name` property by default, and you can assign custom `name`
properties to tiles and objects.

Open `maps/timeBomPanic.tmx` file in Tiled Editor and take a careful
look at how it's been structured. Notice how sprites have been
organized into layers, and how those layers have been named and
stacked. Also, notice that the tileset images of the player and bomb
both have custom `name` properties: "player" and "bomb".
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

    //Make the world from the Tiled JSON data and the tileset PNG image
    world = g.makeTiledWorld(
      "maps/world_map_1.1.json",
      "images/tileset_1.1.png"
    );

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

    thomasDiag = new Dialogue("Hey little dude! Welcome to our town. My name is Thomas",
          "Man, my hands are so cold. I wish I hadn’t left my gloves at home.",
          "Thank you so much little dude! I actually found my gloves, but I could still use these.");
    diagTest = new Dialogue("Hi", "", "");


    item1 = new Item("Gloves", item);

    let quest = new Quest (item1, QUEST_AVAILABLE);

    qNPC = new QuestNPC("Thomas", quest_NPC, thomasDiag, quest);
    rNPC = new RegNPC("Mia", reg_NPC, diagTest);

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

    //bombLayer = world.getObject("bombLayer");

    //Get a reference to the level's bomb layer array. This is the
    //bomb layer's `data` array

    //bombMapArray = bombLayer.data;
    doorMapArray = world.getObject("doorLayer").data;

    /*
    You can use `world.getObjects` (with an "s") to get an array of all
    the things in the world that have the same `name` properties. There
    are 5 bombs in the world, all which have share the same `name`
    property: "bomb". Here's how you can access to all of them in an
    array:
    */

    //bombSprites = world.getObjects("bomb");
    doors = world.getObjects("door");

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
    g.state = play;
  }

  function checkForDoor() {
    let playerVsDoor = g.hitTestTile(player, doorMapArray, 3, world, "center");
    if (playerVsDoor.hit) {
      console.log("go inside building");
    }
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
    let interactionLast = null;
    if (!playerVsNPC.hit)
    {
      qNPC.interact();
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
