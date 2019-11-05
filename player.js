// array of npcs
// loop through npcs and if hit, then call that npc's interact function
// array of quests
// array of quest states?


//var npcs = [];

//var current_items = [];


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