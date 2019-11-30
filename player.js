function checkForNPC(player_character)
{
	if (!playerVsFloor.hit || !playerVsNPC.hit || playerVsTrigger) {

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

				if (questNPCArray[i].quest.getState() == QUEST_ACTIVE)
				{
					console.log("check for receive");
					questNPCArray[i].receive();
				}

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
				consolelog(regNPCArray[i].name);
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

// checks for collision with item on the map and calls pickUpItem if there is a collision
function checkForItem(player_character)
{
	if (!playerVsItem.hit) {
		console.log("found item");

		//To prevent the player from moving, subtract its velocity from its position
		player.x -= player.vx;
		player.y -= player.vy;
		player.vx = 0;
		player.vy = 0;

		pickUpItem();
    }
	//pickUpItem(item);
}

// is called by checkForItem
// checks to see which item is hit and adds it to the inventory if it is not there
function pickUpItem()
{
	let current_item;

	for (let i = 0; i < itemArray.length; i++)
	{
		console.log(itemArray[i]);
		if (itemArray[i].object != null && playerVsItem.index === itemArray[i].object.index)
		//if (playerVsItem.index == item.index)
		{
			current_item = itemArray[i];
			console.log("current item " + current_item);
			current_item.interact();
		}
	}

	console.log("finished loop");

	if (inventory.includes(current_item))
	{
		console.log("already in list");
	}
	else
	{
		inventory.push(current_item);
		g.remove(current_item.object);
		console.log("inventory " + current_item.name);
	}
}
