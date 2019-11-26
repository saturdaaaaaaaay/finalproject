function dispTitle()
{
  g.state = dispTitle;
  titleScene.visible = true;

  gameScene.visible = false;
  menuScene.visible = false;
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
