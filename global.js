/*
 * GLOBAL DECLARATIONS
 */

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const MOVE_SPEED = 4;
const ANIM_SPEED = 0.08;
const TILE_SIZE = 64;
const NUM_OF_MINI_GAMES = 1;

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

const ACTION_KEY = 32;
const QUEST_KEY = 81;
const INVENTORY_KEY = 73;
const MENU_KEY = 77;

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
	player_tex,
    thomas,
	patrick,
	pepe,
	rebecca,
    elie,
	seth,
	snowy,
	trig1,
	trig2,
	trig3,
	redherring,
    gloves,
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
    interact,
    questkey,
    menukey,
    inventorykey;

//dialogue
let thomasDiag,
    miaDiag,
	snowyDialog,
	patrickDialog,
	sethDialog,
	rebeccaDialog,
	elieDialog;

//objects made from classes
let npcThomas,
	npcPatrck,
	npcPepe,
	npcRebecca,
    npcElie,
	npcSeth,
	npcSnowy,
    itemGloves,
	itemRedHerring,
	itemFlowers,
	itemPerfume,
	itemBroom,
	itemWand,
    quest1,
	quest2,
	quest3;

//sounds
let sfxStep,
	sfxBloop,
	sfxClose,
	sfxGibberish,
	sfxLose,
	sfxPop,
	sfxWin;

//object arrays
let questArray = [];
let allQuestsArray = [];
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
    titleScene,
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
    gameOverText,
    inventoryText,
    startOverText;

let playerVsFloor,
    playerVsNPC,
    playerVsTrigger;

let backgroundRect,
    backgroundRect2; //= g.rectangle(300, 300, "green");

let counter = 0; //temporary counter for displaying quests
let alreadyDisplayed = false; //temporary bool to display quests

//stuff I couldn't find in code (delete if not needed)
let items, //
    message,//
    quests,
    npcs; //
