var tvScreen = $('.tv');
var wrongLettersDiv = $('#wrong-letters');
var phraseDiv = $('#phrase');

var gameCode = {
    tvShowList: ['game of thrones', 'spongebob squarepants', 'friends', 'lost', 'doctor who', 'brooklyn nine nine', 'community', 'the simpsons', 'cheers', 'frasier', 'the office', 'the x files', 'how i met your mother', 'the good place', 'arrow'],
    correctLetters : [],
    wrongLetters : [],
    wrongGuessCount : 0,
    generateHangman : function() {
        for (let i = 1; i < 7; i++) {
            $(`#part-${i}`).attr("class", "hidden");
        }
        tvScreen.attr("class", "tv")
        gameCode.wrongGuessCount = 0;
        gameCode.correctLetters = [];
        gameCode.wrongLetters = 'abcdefghijklmnopqrstuvwxyz'.split("");
        phraseDiv.empty();
        wrongLettersDiv.empty();
        let phraseToGuess = gameCode.tvShowList[Math.floor(Math.random() * gameCode.tvShowList.length)];
        let phraseArray = phraseToGuess.split(" ").map(x => x.split(""));
        for (let word of phraseArray) {
            for (let character of word) {
                phraseDiv.append(`<span class="${character}">_</span>`);
                if (gameCode.correctLetters.indexOf(character) === -1) {
                    gameCode.correctLetters.push(character);
                }
            }
            phraseDiv.append("<span>  </span>")
        }
        gameCode.wrongLetters = gameCode.wrongLetters.filter(x => gameCode.correctLetters.indexOf(x) == -1);
    },
    checkInput : function(input) {
        let correctIndex = gameCode.correctLetters.indexOf(input);
        let wrongIndex = gameCode.wrongLetters.indexOf(input)
        if (correctIndex != -1) {
            $(`.${input}`).html(input);
            gameCode.correctLetters.splice(correctIndex, 1);
            if (gameCode.correctLetters.length === 0) {
                wrongLettersDiv.html("You Win!");
                phraseDiv.html("Press the Power Button to play again!");
            }
        }
        else if (wrongIndex != -1) {
            wrongLettersDiv.append(input);
            gameCode.wrongLetters.splice(wrongIndex, 1);
            gameCode.wrongGuessCount++;
            $(`#part-${gameCode.wrongGuessCount}`).attr("class", "");
            if (gameCode.wrongGuessCount === 6) {
                wrongLettersDiv.html("You Lose!");
                phraseDiv.html("Press the Power Button to play again!");
            }
        }
    }
}

$(document).on("keypress", function(event) {
    gameCode.checkInput(event.key);
})

$("#generate").on("click", function() {
    gameCode.generateHangman();
})