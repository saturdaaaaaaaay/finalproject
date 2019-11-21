function checkForNPC(player_character)
{
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
		if (playerVsItem.index == itemArray[i].object.index)
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
		g.remove(current_item);
		console.log("inventory " + inventory);
	}
}