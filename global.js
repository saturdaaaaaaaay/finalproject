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

const KEY_LEFT_ALT = "a";
const KEY_RIGHT_ALT = "d";
const KEY_UP_ALT = "w";
const KEY_DOWN_ALT = "s";

const ACTION_KEY = "32";
const QUEST_KEY = "q";

//Game declarations
let g, thingsToLoad, world, camera, player, quest_NPC, reg_NPC, item, message, wallMapArray,
    leftArrow, upArrow, downArrow, rightArrow, npcs, items;