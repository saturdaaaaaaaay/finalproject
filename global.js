/*
 * GLOBAL DECLARATIONS
 */

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const MOVE_SPEED = 4;
const TILE_SIZE = 64;

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
const INVENT_KEY = 73;

const MENU = 420;
const DIALOGUE = 1025;

//label global variables

//Game declarations
let g,
    thingsToLoad,
    world,
    outside_world,
    building_world,
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
    miaDiag;

//objects made from classes
let qNPC,
    rNPC,
    item1,
    item2,
    quest1;

//object arrays
let pcQuestArray = [];
let questNPCArray = [];
let regNPCArray = [];
let questTextArray = [];
let itemArray = [];
let questArray = [];
let inventory = [];
let inventoryTextArray = [];
//let dialogueArray = [];

let gameScene,
    dialogueScene,
    menuScene,
    questListScene,
    titleScene,
    popupScene,
    gameOverScene,
    inventoryScene;

let menuText,
    questListText,
    cancelText,
    emptyQuestText,
    exitText,
    dialogueText,
    npcNameText,
    titleText,
    playText,
    popupTitleText,
    popupContentText,
    gameOverText;

let playerVsFloor,
    playerVsNPC;

let backgroundRect,
    backgroundRect2; //= g.rectangle(300, 300, "green");

let button1,
    button2;

//let counter = 0; //temporary counter for displaying quests
let inventoryCounter = 0;
let alreadyDisplayed = false; //temporary bool to display quests

//stuff I couldn't find in code (delete if not needed)
let items, //
    message,//
    quests,
    npcs; //


    /*
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
     */
