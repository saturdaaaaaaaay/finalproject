/*
 * Rock-Paper-Scissors Minigame
 */

let rock_listen;
let choice = 3;

function startRockPaperScissors(CONTAINER, ITEM) {
    
    let box = g.rectangle(
        500,
        500,
        "white",
        "yellow",
        5,
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
        checkWinner(1, CONTAINER);
        awardItem(ITEM);
    });
    paper.on("mousedown", function() {
        checkWinner(2, CONTAINER);
        awardItem(ITEM);
    });
    scissors.on("mousedown", function() {
        checkWinner(3, CONTAINER);
        awardItem(ITEM);
    });

    g.pause();
}

function checkWinner(CHOICE, CONTAINER) {
    let cpu_choice = Math.floor((Math.random() * 3) + 1);
    let result = "draw";
    if (cpu_choice === CHOICE) {
        result = "draw";
    }
    else if ((cpu_choice === 1 && CHOICE === 2) || (cpu_choice === 2 && CHOICE === 3) || (cpu_choice === 3 && CHOICE === 1)) {
        result = "win";
    }
    else {
        result = "lose";
    }
    
    console.log(result);
    
    g.resume();
    g.remove(CONTAINER);
}

function awardItem(ITEM) {
    console.log("item awarded");
}
