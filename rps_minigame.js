/*
 * Rock-Paper-Scissors Minigame
 */

let rock_listen;
let choice = 3;

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

    CONTAINER.addChild(box);
    CONTAINER.addChild(rock);
    CONTAINER.addChild(paper);
    CONTAINER.addChild(scissors);

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
    if (cpu_choice === CHOICE) {
        result = "draw";
    }
    else if ((cpu_choice === 0 && CHOICE === 1) || (cpu_choice === 1 && CHOICE === 2) || (cpu_choice === 2 && CHOICE === 0)) {
        result = "win";
        awardItem(TRIGGER);
    }
    else {
        result = "lose";
    }
    
    // Display WIN/LOSE/DRAW result
    showResult(result);

    let quitButton = g.text("Okay", "18px Futura", "black", 450, 450);
    
    let removeGame = function() {
        g.resume();
        g.remove(quitButton);
        g.remove(CONTAINER);
    }
    
    quitButton.interactive = true;
    quitButton.buttonMode = true;
    quitButton.on('mousedown', removeGame);
}

function awardItem(TRIGGER) {
    console.log("you win! " + TRIGGER.giveItem() + " awarded");
}

function removeOthers(CHOICE, OTHER_1, OTHER_2) {
    CHOICE.interactive = false;
    CHOICE.buttonMode = false;
    g.remove(OTHER_1);
    g.remove(OTHER_2);
}

function showResult(RESULT) {
    let resultText = g.text(RESULT, "48px Futura", "black", 200, 300)
}
