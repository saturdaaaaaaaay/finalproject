/*
 * GLOBAL DECLARATIONS
 */

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const MOVE_SPEED = 4;
const TILE_SIZE = 64;
const NUM_OF_MINI_GAMES = 1;

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
    doorMapArray,
	itemLayerArray;
	
let	playerVsItem;

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
    quest1;

//object arrays
let questArray = [];
let questNPCArray = [];
let regNPCArray = [];
let questTextArray = [];
let itemArray = [];
let inventory = [];
let worldTriggerArray = [];
let buildingTriggerArray = [];
//let dialogueArray = [];

let gameScene,
    dialogueScene,
    menuScene,
    questListScene,
    titleScene;

let menuText,
    questListText,
    cancelText,
    emptyQuestText,
    exitText,
    dialogueText,
    npcNameText,
    titleText,
    playText;

let playerVsFloor,
    playerVsNPC,
    playerVsTrigger;

let backgroundRect; //= g.rectangle(300, 300, "green");

let counter = 0; //temporary counter for displaying quests
let alreadyDisplayed = false; //temporary bool to display quests

//stuff I couldn't find in code (delete if not needed)
let items, //
    message,//
    quests,
    npcs; //

