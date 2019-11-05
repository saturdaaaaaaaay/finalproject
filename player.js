// array of npcs
// loop through npcs and if hit, then call that npc's interact function
// array of quests
// array of quest states?


var npcs = [];

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
		current_npc.interact();
	}
}


