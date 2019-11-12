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
    thingsToLoad,
    world,
    building,
    camera,
    player,
    quest_NPC,
    reg_NPC,
    item,
    message,
    wallMapArray,
    leftArrow,
    upArrow,
    downArrow,
    rightArrow,
    interact,
    npcs,
    items,
    quests,
    doors;