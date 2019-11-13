/*
 * GLOBAL DECLARATIONS
 */

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const MOVE_SPEED = 4;

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

const KEY_LEFT_ALT = 65;
const KEY_RIGHT_ALT = 68
const KEY_UP_ALT = 87;
const KEY_DOWN_ALT = 83;

const ACTION_KEY = 32;
const QUEST_KEY = 81;

//Game declarations
let g,
    thingsToLoad,           // loader
    world,                  // game world
    world_state,
    building,               // "world" inside a building
    camera,                 // world camera
    player,
    quest_NPC,
    reg_NPC,
    item,
    message,
    wallMapArray,           // array of wall tiles from the map
    doorMapArray,           // array of door tiles from the map
    leftArrow,              // left key event
    upArrow,                // up key event
    downArrow,              // down key event
    rightArrow,             // right key event
    interact,               // interact key event
    npcs,
    items,
    quests,
    doors;
