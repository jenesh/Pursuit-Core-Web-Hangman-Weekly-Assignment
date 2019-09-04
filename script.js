// Random word library
const randomWords = require('random-words');

let ranWord = randomWords();
while (ranWord.length < 5) {
    ranWord = randomWords();
}

const inputLtr = document.querySelector('#input-ltr');

// Class for an instance of Hangman
class Hangman {
    constructor(words) {
        this.words = words;
        this.lives = 6;
        this.ltrCount = this.words.length;
        this.ltrUsed = '';
    }
    // Turn the word(s) into an array
    phraseArray() {
        return this.words.toUpperCase().split('');
    }
    // Creates object from a-z and tracks index number of the ltr in a array
    letterObj() {
        const obj = {};
        const alphabetArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        alphabetArr.forEach(ele => {
            obj[ele] = [];
        });

        const words = this.phraseArray();
        console.log('Array of current phrase: \n', words);
        for (let i = 0; i < words.length; i++) {
            words[i] === ' ' ? null : obj[words[i]].push(i);
        }
        console.log('Object after index #\'s of word array: \n', obj);
        return obj;
    }
    winOrLose() {
        if (!this.lives) {
            console.log('Game Over');
            inputLtr.placeholder = 'Sorry, you lose!';
            return true;
        }
        if (!this.ltrCount) {
            console.log('You win');
            inputLtr.placeholder = 'Congrats, you win!';
            return true;
        }
        return false;
    }
}

start(new Hangman(ranWord));

// FUNCTION THAT STARTS THE GAME
function start(newHangman) {
    // Audio script
    // const {
    //     Howl,
    //     Howler
    // } = require('howler');

    // const sound = new Howl({
    //     src: ['./sounds/nujabes.mp3'],
    //     autoplay: true,
    //     loop: true,
    //     volume: 0.5,
    //     onend: function () {
    //         console.log('Again!');
    //     }
    // });


    // sound.play();


    // ALL QUERY SELECTORS
    const root = document.querySelector('#root');
    // Parent div's of #root
    const header = document.querySelector('#header');
    const main = document.querySelector('#main');
    const footer = document.querySelector('#footer');
    // Child div's of #main
    const leftScreen = document.querySelector('#left-screen');
    const rightScreen = document.querySelector('#right-screen');
    // Child div's of #right-screen
    const displayWord = document.querySelector('#display-word');
    let displayLetters = document.querySelector('#display-letters');
    const inputForm = document.querySelector('#input-form');
    
    const pError = document.querySelector('#p-error');
    // Restart div and button
    const restartDiv = document.querySelector('#restart-div');
    const restartBtn = document.querySelector('#restart-btn');

    inputLtr.addEventListener('keydown', inputKeyDown);
    window.addEventListener('keydown', windowKeyDown);

    // Initilizing an instance of Hangman
    const player = newHangman;
    const currSplitWord = player.phraseArray();
    const currLetterObj = player.letterObj();

    // Create ltr Box
    ltrBox();

    // For each letter in the word array it creates span tags
    currSplitWord.forEach(ltr => {
        const spanLetter = document.createElement('span');
        spanLetter.innerHTML = ltr;
        // spanLetter.setAttribute('data-ltr', `${ltr}`);
        spanLetter.classList.add('span-spacing');
        spanLetter.classList.add('hide'); // Initially it doens't appear
        displayWord.appendChild(spanLetter);
    });
    // console.log('Display Word Div: \n', displayWord)

    // All span tags which are in sync with the phraseArr
    const spanTags = document.querySelectorAll('span');

    // Check user letter input and give error if Checking no input
    const checkLetter = (char = inputLtr.value.toUpperCase()) => {
        const ltr = char;
        let error = false;

        // const ltrTag = document.querySelector(`span[data-ltr = '${ltr}']`);
        
        if (player.words.length === ltr.length) {
            if (player.words === ltr) {
                for (let i = 0; i < spanTags.length; i++) {
                    spanTags[i].style.color = 'black';
                    spanTags[i].style.boxShadow = 'none';
                }
            }
            player.winOrLose() ? inputLtr.placeholder = 'Congrats!':inputLtr.placeholder = 'That\'s not it';

        }
        if (player.ltrUsed.includes(ltr)) {
            inputLtr.placeholder = 'Letter already used!';
            return;
        }
        if (ltr.length === 1) {
            player.ltrUsed += ltr;
            inputLtr.value = '';
            matchCount = 0;

            currLetterObj[ltr].forEach(ele => {
                spanTags[ele].style.color = 'black';
                spanTags[ele].style.boxShadow = 'none';
                player.ltrCount--;
                matchCount++;

            });
            inputLtr.placeholder = `Great Guess! => ${matchCount} ${ltr}`;

            if (!matchCount) {
                if (player.winOrLose()) {
                    inputLtr.removeEventListener('keydown', inputKeyDown);
                    window.removeEventListener('keydown', windowKeyDown);
                    restartDiv.style.display = "block";
                } else {
                    inputLtr.placeholder = 'Sorry';
                };
                player.lives--;
                inputLtr.placeholder = `Sorry, no ${ltr}!`;
            }

            pError.style.display = 'none';
            error = false;

        } else {
            error = true;
        }

        if (error) {
            pError.style.display = 'block';
        }
        if (player.winOrLose()) {
            inputLtr.removeEventListener('keydown', inputKeyDown);
            window.removeEventListener('keydown', windowKeyDown);
            restartDiv.style.display = "block";
        };
        ltrBoxTag(ltr); // Error with the click event #1
    }

    

    function inputKeyDown(e) {
        e.stopImmediatePropagation();
        if (e.keyCode === 13) {
            checkLetter();
        }
    }

    function windowKeyDown(e) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            checkLetter(e.key.toUpperCase());
        }
    }

    function ltrBoxTag(ltr) {
        const tag = document.querySelector(`span[data-ltr = '${ltr}']`);
        tag.parentElement.removeChild(tag);
    }

    function ltrBoxRemover(e) {
        if (e.target.nodeName === 'SPAN') {
            const ltrClicked = e.target.dataset.ltr.toUpperCase();
            checkLetter(ltrClicked);
            ltrBoxTag(ltrClicked);
        }
    }

    restartBtn.addEventListener('click', () => {
        // const newGame = new Hangman(words[Math.floor(Math.random() * 200)].toUpperCase());
        // let child = displayWord.lastElementChild;
        // while(child) {
        //     displayWord.removeChild(child);
        //     child = displayWord.lastElementChild;
        // }
        // delete Hangman.player;
        // return start(newGame);
        // console.log('After delete:', player);
        window.location.reload(true);
    });

    function ltrBox() {
        let ltrs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        ltrs.forEach(ele => {
            const p = document.createElement('span');
            p.classList.add('letters');
            p.style.backgroundImage = `url(assets/ice_${ele}.svg)`;
            p.setAttribute("data-ltr", `${ele}`);
            // p.addEventListener
            displayLetters.appendChild(p);
            // console.log(p.dataset.ltr);
        })
    }
    displayLetters = document.querySelector('#display-letters');
    displayLetters.addEventListener('click', (e) => {
        ltrBoxRemover(e) // Error with removing element after typing #1
    })
}