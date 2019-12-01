/*
 * Rock-Paper-Scissors Minigame
 */

function startRockPaperScissors(CONTAINER, TRIGGER) {
    
    let box = g.rectangle(
        TILE_SIZE * 7,
        TILE_SIZE * 5,
        "white",
        "black",
        6,
        TILE_SIZE * 3,
        TILE_SIZE * 2
    );
    
    let rock = g.sprite("hand-rock.png");
    rock.position = ({x: TILE_SIZE * 4, y: TILE_SIZE * 3});

    let paper = g.sprite("hand-paper.png");
    paper.position = ({x: TILE_SIZE * 6, y: TILE_SIZE * 3});

    let scissors = g.sprite("hand-scissors.png");
    scissors.position = ({x: TILE_SIZE * 8, y: TILE_SIZE * 3});
    
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
    let addToInvText = g.group();
    // Display WIN/LOSE/DRAW result
    switch (result) {
        case "Draw":
            result = g.sprite("draw.png");
            break;
        case "Win":
            result = g.sprite("win.png");
            let awarded = g.sprite("awarded.png");
            awarded.position = ({x: TILE_SIZE * 5, y: TILE_SIZE * 6});
            let award_item = g.sprite(TRIGGER.getTexture());
            award_item.position = ({x: TILE_SIZE * 4, y: TILE_SIZE * 6});
            addToInvText.addChild(awarded);
            addToInvText.addChild(award_item);
            break;
        case "Lose":
            result = g.sprite("lose.png");
            break;
    }
    result.position = ({x: TILE_SIZE * 6, y: TILE_SIZE * 5});
    let quitButton = g.sprite("ok.png");
    quitButton.position = ({x: TILE_SIZE * 9, y: TILE_SIZE * 6});
    
    let removeGame = function() {
        sfxClose.play();
        g.resume();
        g.remove(quitButton);
        g.remove(addToInvText);
        g.remove(result);
        g.remove(CONTAINER);
    };
    
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
