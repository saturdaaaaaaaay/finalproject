function dispTitle()
{
  g.state = dispTitle;
  titleScene.visible = true;

  gameScene.visible = false;
  menuScene.visible = false;
  howToPlayScene.visible = false;
  creditsScene.visible = false;
}

function dispHowToPlay()
{
  g.state = dispHowToPlay;
  howToPlayScene.visible = true;

  titleScene.visible = false;
}

function dispCredits()
{
  g.state = dispCredits;
  creditsScene.visible = true;

  titleScene.visible = false;
}

function dispGame()
{
  g.state = play;
  gameScene.visible = true;

  menuScene.visible = false;
  dialogueScene.visible = false;
  titleScene.visible = false;
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

function dispDialogue()
{
  g.state = dispDialogue;
  dialogueScene.visible = true;
}

function dispGameOver()
{
  g.state = dispGameOver;
  gameScene.visible = false;
  //gameScene.remove();
  gameOverScene.visible = true;
}

function dispInventory()
{
  g.state = dispInventory;

  setupInventoryScene();

  inventoryScene.visible = true;
  menuScene.visible = false;
}
