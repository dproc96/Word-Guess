var tvShows = ['game of thrones', 'spongebob squarepants', 'friends', 'lost', 'doctor who', 'brooklyn nine nine'];

function generateHangman() {
    $(".tv").attr("class", "tv");
    var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
    var characterLog = {};
    var correctLetters = [];
    let wrongGuessCount = 0;
    $("#wrong-letters").empty();
    for (let letter of alphabet) {
        $("#wrong-letters").append(`<span class="hidden" id="${letter}">${letter}</span>`);
        characterLog[letter] = 0;
    }
    let randomIndex = Math.floor(Math.random() * tvShows.length);
    let activeShow = tvShows[randomIndex];
    let words = activeShow.split(" ");
    let wordsByCharacter = words.map(x => x.split(""));
    console.log(wordsByCharacter)
    $("#phrase").empty();
    let wordCount = 1;
    for (let word of wordsByCharacter) {
        $("#phrase").append(`<div id="word-${wordCount}"></div>`)
        for (let character of word) {
            $(`#word-${wordCount}`).append(`<span class="${character}">_ </span>`);
            characterLog[character] = 1;
            if(correctLetters.indexOf(character) === -1) {
                correctLetters.push(character)
            }
        }
        wordCount++
    }
    $(document).on("keypress", function(event) {
        $(`.${event.key}`).html(`${event.key}`)
        if (correctLetters.indexOf(event.key) > -1) {
            correctLetters.splice(correctLetters.indexOf(event.key), 1);
            if (correctLetters.length === 0) {
                alert("You win!")
                $("#hangman img").attr("class","hidden");
                $("#wrong-letters").empty();
                $("#phrase").empty();
                $(".tv").attr("class", "tv off");
                wrongGuessCount = 0
            }
        }
        if (characterLog[event.key] === 0) {
            $(`#${event.key}`).attr("class","none");
            characterLog[event.key] = 1;
            wrongGuessCount++;
            $(`#part-${wrongGuessCount}`).attr("class", "")
        }
        if (wrongGuessCount === 7) {
            alert("You lose!")
            $("#hangman img").attr("class","hidden");
            $("#wrong-letters").empty();
            $("#phrase").empty();
            $(".tv").attr("class", "tv off");
            wrongGuessCount = 0
        }
    })
}
