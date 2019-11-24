/*
 * Mini game setup and logic
 */

// Setup NPC's that trigger mini games
function setupTriggers() {
    
    // NPC 1
    let trigger = new Trigger(200, 200, "banana");
    triggerArray.push(trigger);
    world.addChild(trigger.sprite);
    
    // NPC 2
    trigger = new Trigger(300, 200, "perfume");
    triggerArray.push(trigger);
    world.addChild(trigger.sprite);
}

// Return true if collision with trigger NPC
function playerTriggerHitTest() {
    let index;
    for (index = 0; index < triggerArray.length; index++) {
        if (g.hit(player, triggerArray[index].sprite)) {
            if (triggerArray[index].isActive()) {
                runMiniGame(triggerArray[index]);
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
