// array of npcs
// loop through npcs and if hit, then call that npc's interact function
// array of quests
// array of quest states?


//var npcs = [];

//var current_items = [];


function checkForNPC(player_character)
{
	/*
	let i;
	let hit = false;
	let current_npc;
	for (i = 0; npcs.length; i++)
	{
		hit = false;
		current_npc = npcs[i];
		hit = g.hit(player_character, current_npc);
		if (hit === true)
		{
			break;
		}
	}
	if (hit === true)
	{
		console.log(current_npc.name);
		current_npc.interact();
	}
	*/
	if (!playerVsFloor.hit || !playerVsNPC.hit) {

		//To prevent the player from moving, subtract its velocity from its position
		player.x -= player.vx;
		player.y -= player.vy;
		player.vx = 0;
		player.vy = 0;
	}

	let tempItem = null; //set up tempItem (catches NPC quest if NPC has a quest)
	//if collided with an NPC...
	if (!playerVsNPC.hit)
	{
		//checks if collided with Quest NPC
		var i = 0;
		var qFound = false;
		while (i < questNPCArray.length && !qFound)
		{
			//compares index of collision object with index of quest sprite
			if (playerVsNPC.index == questNPCArray[i].object.index)
			{
				tempItem = questNPCArray[i].interact();
				qFound = true;
				setupDialogueScene(questNPCArray[i]);
				dispDialogue();
			}
			i++;
		}
		//catches Quest NPC's quest and adds to quest array
		if (tempItem != null)
		{
			questArray.push(tempItem);
			console.log("quest added to array");
		}



		//checks if collided with Regular NPC
		i = 0;
		var rFound = false;
		while (i < regNPCArray.length && !rFound)
		{
			//compares index of collision boject with index of regular sprite
			if (playerVsNPC.index == regNPCArray[i].object.index)
			{
				regNPCArray[i].interact(); //interact with NPC
				rFound = true;
				setupDialogueScene(regNPCArray[i]);
				dispDialogue();
			}
			i++;
		}
	}

	tempItem = null;
}

function checkForItem(player_character)
{
	//items
	let i;
	let hit = false;
	let current_item;
	for (i = 0; items.length; i++)
	{
		hit = false;
		current_item = items[i];
		hit = g.hit(player_character, current_item);
		if (hit === true)
		{
			break;
		}
	}
	if (hit === true)
	{
		//items.interact();
		console.log(current_item.name);

		//current_items.push(current_item);
	}

}

/*
function checkForQuestItem()
{

}
*/
