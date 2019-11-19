/*
 * Rock-Paper-Scissors Minigame
 */

function startRockPaperScissors(CONTAINER) {
    
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
    
    let choice = 1;
    
    g.makeInteractive(rock);
    g.makeInteractive(paper);
    g.makeInteractive(scissors);

    CONTAINER.addChild(box);
    CONTAINER.addChild(rock);
    CONTAINER.addChild(paper);
    CONTAINER.addChild(scissors);

    if (testing === 1) rock.release = function() {
        checkWinner(1, CONTAINER);
    }
    if (testing === 2) paper.release = () => checkWinner(2, CONTAINER);
    if (testing === 3) scissors.release = () => checkWinner(3, CONTAINER);
   
    testing++;
    g.pause();
    console.log("finished");
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
    console.log("resumed");
    g.remove(CONTAINER);
    console.log("cont removed");
    //console.log(CONTAINER);
}
