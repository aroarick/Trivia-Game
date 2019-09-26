var questions = [{
        question: "In 'Bill and Ted's Excellent Adventure', where are 'strange things afoot'? ",
        choices: ["Circle K", "Exxon", "Racetrack", "Square C"],
        answer: 0
    },
    {
        question: "Who does Marty's mom like in 'Back to the Future' when Marty goes back in time?",
        choices: ["Dr. Emmet Brown", "George McFly", "Biff Tannen", "Marty McFly"],
        answer: 3
    },
    {
        question: "What do the characters in 'Real Genius' fill Jerry's house with",
        choices: ["Post-it Notes", "Popcorn", "Balloons", "Shaving Cream"],
        answer: 1
    },
    {
        question: "What does Indiana Jones say when confronted with snakes in 'Raider of the Lost Ark?'",
        choices: ["Not snakes!", "Get me outta here!", "Snakes. Why did it have to be snakes.", "Of all the things, it had to be snakes!"],
        answer: 2
    },
    {
        question: "What is Yoda's famous line in 'The Empire Strikes Back' when he is training with Luke?",
        choices: ["Do or do not. There is no try", "Luminous beings are we, not this crude matter.", "Truly wonderful, the mind of a child is.", "Adventure. Excitement. A Jedi craves not these things."],
        answer: 0
    },
    {
        question: "What kind of car did Jake Ryan drive in 'Sixteen Candles'?",
        choices: ["Rolls Royce", "BMW", "Ferrari", "Porsche"],
        answer: 3
    },
    {
        question: "What are the rules for keeping a Gremlin?",
        choices: ["Don't talk to it, don't let it speak, and don't let it eat", "Keep him out of the light, don't give him any water, never feed him after midnight", "Make sure he has light, water him every hour, only feed him at night", "Name him Gizmo, make sure he has friends, keep him happy"],
        answer: 1
    },
    {
        question: "What iconic line does Bruce Campbell say in 'The Evil Dead' when he replaces his hand with a chainsaw?",
        choices: ["Sweet", "Awesome", "Groovy", "Radical"],
        answer: 2
    },
    {
        question: "What power does the babe have in 'Labyrinth'?",
        choices: ["the power of voodoo", "the power of hoodoo", "the power of joodoo", "the power of hulu"],
        answer: 0
    },
    {
        question: "'Die Hard' is a Christmas movie",
        choices: ["False", "True"],
        answer: 1
    },
];

var gamePlay = {
    count: 0,
    correct: 0,
    wrong: 0,
    timer: 20,
    intervalId: null,
    playerGuess: "",
}

$(document).ready(function () {
    $("#restart").hide();

    $("#start").on("click", function () {
        $("#start").hide();
        showQuestion();
        startTimer();
        gamePlay.showQuestion();
    });
});

function showQuestion() {
    $("#button1").text(questions[gamePlay.index].choices[0])
    $("#button2").text(questions[gamePlay.index].choices[1])
    $("#button3").text(questions[gamePlay.index].choices[2])
    $("#button4").text(questions[gamePlay.index].choices[3])
};

// function startTimer() {
//     if (!gamePlay.timeStart) {
//         gamePlay.intervalId = setInterval(decrement, 1000);
//         gamePlay.timeStart = true;
//     }
// }

function startTimer() {
    $("#time").text("Time remaining: " + gameState.timer);
    setInterval(gameState.countdown, 1000);
    // $("#start-page").hide();
    questions.showQuestion();
}

function stopTimer() {
    clearInterval(gamePlay.intervalId);
    gamePlay.timeStart = false;
}

function decrement() {
    $("#time").html("<h2>" + gamePlay.timer + "</h2>");
    gamePlay.timer--;
}
