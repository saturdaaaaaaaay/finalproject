/*
 * Mini game setup and logic
 */

// Setup NPC's that trigger mini games
function setupTriggers() {
    // NPC 1
    let trigger = new Trigger(2, 2, item2);
    worldTriggerArray.push(trigger);
    outside_world.addChild(trigger.sprite);
    
    // NPC 2
    trigger = new Trigger(3, 2, item4);
    buildingTriggerArray.push(trigger);
    building_world.addChild(trigger.sprite);
}

// Return true if collision with trigger NPC
function playerTriggerHitTest() {
    let index;
    let arrayToTest = worldTriggerArray;
    if (world_state === "building") {
        arrayToTest = buildingTriggerArray;
    }
    for (index = 0; index < arrayToTest.length; index++) {
        if (g.hit(player, arrayToTest[index].sprite)) {
            if (arrayToTest[index].isActive()) {
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
