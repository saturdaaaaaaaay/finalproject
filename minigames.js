/*
 * Mini game setup and logic
 */

// Setup NPC's that trigger mini games
function setupTriggers() {
    // NPC in water
    let trigger = new Trigger(outside_world.getObject("trig-1"), itemFlowers, "flowers.png");
    worldTriggerArray.push(trigger);
    outside_world.add(replaceWithAnimatedSprite(outside_world.getObject("trig-1"), ["merperson.png", "merperson_2.png"]));
    
    // NPC in front of "L" shaped building
    trigger = new Trigger(outside_world.getObject("trig-2"), itemBroom, "broom.png");
    worldTriggerArray.push(trigger);
    outside_world.add(replaceWithAnimatedSprite(outside_world.getObject("trig-2"), ["dragon_3.png", "dragon_4.png"]));
    
    // NPC inside building
    trigger = new Trigger(building_world.getObject("trig-3"), itemPerfume, "perfume.png");
    buildingTriggerArray.push(trigger);
    building_world.add(replaceWithAnimatedSprite(building_world.getObject("trig-3"), ["ghost-1.png", "ghost-2.png"]));
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
