/*
 * Rock-Paper-Scissors Minigame
 */

function startRockPaperScissors(CONTAINER, TRIGGER) {
    
    let box = g.rectangle(
        500,
        500,
        "white",
        "yellow",
        0,
        100,
        50
    );
    
    let rock = g.rectangle(
        100,
        100,
        "gray",
        "black",
        2,
        200,
        150
    );

    let paper = g.rectangle(
        100,
        100,
        "white",
        "black",
        2,
        400,
        150
    );

    let scissors = g.rectangle(
        100,
        100,
        "orange",
        "black",
        2,
        300,
        350
    );
    
    rock.interactive = true;
    rock.buttonMode = true;

    paper.interactive = true;
    paper.buttonMode = true;

    scissors.interactive = true;
    scissors.buttonMode = true;

    let titleText = g.text("Rock - Paper - Scissors", "36px Futura", "black", 150, 75);

    CONTAINER.addChild(box);
    CONTAINER.addChild(rock);
    CONTAINER.addChild(paper);
    CONTAINER.addChild(scissors);
    CONTAINER.addChild(titleText);

    rock.on("mousedown", function() {
        checkWinner(0, CONTAINER, TRIGGER);
    });
    paper.on("mousedown", function() {
        checkWinner(1, CONTAINER, TRIGGER);
    });
    scissors.on("mousedown", function() {
        checkWinner(2, CONTAINER, TRIGGER);
        
    });

    g.pause();
}

function checkWinner(CHOICE, CONTAINER, TRIGGER) {
    let other_1 = ((CHOICE + 1) % 3) + 1;
    let other_2 = ((CHOICE + 2) % 3) + 1;
    removeOthers(CONTAINER.getChildAt(CHOICE + 1), CONTAINER.getChildAt(other_1), CONTAINER.getChildAt(other_2));
    
    let cpu_choice = Math.floor(Math.random() * 3);
    let result;
    let addToInv = "";
    if (cpu_choice === CHOICE) {
        result = "Draw";
        sfxLose.play();
    }
    else if ((cpu_choice === 0 && CHOICE === 1) || (cpu_choice === 1 && CHOICE === 2) || (cpu_choice === 2 && CHOICE === 0)) {
        result = "Win";
        sfxWin.play();
        addToInv = TRIGGER.getItem() + " added to your inventory.";
        inventory.push(TRIGGER.giveItem());
    }
    else {
        sfxLose.play();
        result = "Lose";
    }
    
    // Display WIN/LOSE/DRAW result
    let resultText = g.text(result, "48px Futura", "black", 200, 300);
    let addToInvText = g.text(addToInv, "18px Futura", "black", 200, 350);
    let quitButton = g.text("Okay", "18px Futura", "black", 450, 450);
    
    let removeGame = function() {
        sfxClose.play();
        g.resume();
        g.remove(quitButton);
        g.remove(addToInvText);
        g.remove(resultText);
        g.remove(CONTAINER);
    }
    
    quitButton.interactive = true;
    quitButton.buttonMode = true;
    quitButton.on('mousedown', removeGame);
}

function removeOthers(CHOICE, OTHER_1, OTHER_2) {
    CHOICE.interactive = false;
    CHOICE.buttonMode = false;
    g.remove(OTHER_1);
    g.remove(OTHER_2);
}
