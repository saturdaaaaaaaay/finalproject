/*
 * Mini game setup and logic
 */

// Setup NPC's that trigger mini games
function setupTriggers() {
    // NPC in water
    let trigger = new Trigger(outside_world.getObject("trig-1"), itemFlowers);
    worldTriggerArray.push(trigger);
    
    // NPC in front of "L" shaped building
    trigger = new Trigger(outside_world.getObject("trig-2"), itemPerfume);
    worldTriggerArray.push(trigger);
    
    // NPC inside building
    trigger = new Trigger(building_world.getObject("trig-3"), itemBroom);
    buildingTriggerArray.push(trigger);
}

// Return true if collision with a trigger NPC
function playerTriggerHitTest() {
    let index;
    let arrayToTest = worldTriggerArray;
    if (world_state === "building") {
        arrayToTest = buildingTriggerArray;
    }
    for (index = 0; index < arrayToTest.length; index++) {
        if (g.hit(player, arrayToTest[index].object)) {
            if (arrayToTest[index].isActive()) {
                sfxBloop.play();
                runMiniGame(arrayToTest[index]);
            }
            return true;
        }
    }
    return false;
}

// Run a random mini game. Item awarded is stored in instance of Trigger class.
function runMiniGame(TRIGGER) {
    let random_game = Math.floor((Math.random() * NUM_OF_MINI_GAMES) + 1);

    switch(random_game) {
        case 1:
            startRockPaperScissors(g.group(), TRIGGER);
            break;
    }
}
