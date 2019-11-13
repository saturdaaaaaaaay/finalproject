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

//label global variables

//Game declarations
let g,
    thingsToLoad,
    world,
    building,
    camera;

//sprites (objects from world)
let player,
    quest_NPC,
    reg_NPC,
    item,
    doors;

//map arrays
let wallMapArray,
    npcArray,
    doorMapArray;

//keycodes
let leftArrow,
    upArrow,
    downArrow,
    rightArrow,
    interact;

//dialogue
let thomasDiag,
    diagTest;

//objects made from classes
let qNPC,
    rNPC,
    item1,
    quest1;

//object arrays
let questArray = [];
let questNPCArray = [];
let regNPCArray = [];
let questTextArray = [];
let dialogueArray = [];

let gameScene,
    dialogueScene,
    menuScene,
    questListScene;

let menuText,
    questListText,
    cancelText,
    emptyQuestText;

let backgroundRect; //= g.rectangle(300, 300, "green");

let counter = 0; //temporary counter for displaying quests

//stuff I couldn't find in code (delete if not needed)
let items, //
    message,//
    quests,
    npcs; //
