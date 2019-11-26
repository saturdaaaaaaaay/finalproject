function dispTitle()
{
  g.state = dispTitle;
  titleScene.visible = true;

  gameScene.visible = false;
  menuScene.visible = false;
  inventoryScene.visible = false;
}

function dispGame()
{
  g.state = play;
  gameScene.visible = true;

  menuScene.visible = false;
  dialogueScene.visible = false;
  titleScene.visible = false;
  inventoryScene.visible = false;
}

function dispMenu()
{
  g.state = dispMenu;
  menuScene.visible = true;

  dialogueScene.visible = false;
  gameScene.visible = false;
  questListScene.visible = false;
  inventoryScene.visible = false;
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

function dispDialogue(npc)
{
  g.state = dispDialogue;
  //setupDialogueScene(npc);
  dialogueScene.visible = true;

  //console.log(typeof npc);
}

function dispGameOver()
{
  g.state = dispGameOver;
  gameOverScene.visible = true;
  gameScene.visible = false;
}

function dispInventory(location, npc)
{
  //console.log(state);
  //g.state = dispInventory;
  console.log("display inventory");
  setupInventoryScene(location, npc);

  inventoryScene.visible = true;
}
