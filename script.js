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
const displayLetters = document.querySelector('#display-letters');
const inputForm = document.querySelector('#input-form');
// Child div's of #input-form
const inputLtr = document.querySelector('#input-ltr');
const buttonSub = document.querySelector('#button-sub');
const pError = document.querySelector('#p-error');
// Choice of words
const words = ['hello world', 'goodbye'];
// Class for an instance of Hangman
class Hangman {
    constructor(words) {
        this.words = words;
        this.lives = 6;
        this.ltrCount = this.words.length - 1;
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
        // console.log('Alphabet Array: ', alphabetArr);
        alphabetArr.forEach(ele => {
            obj[ele] = [];
        });
        // console.log('Object with keys a-z: ', obj);
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
            return true;
        }
        if (!this.ltrCount) {
            console.log('You win');
            return true;
        }
        return false;
    }
}
// Initilizing an instance
const player = new Hangman(words[0]);
const currSplitWord = player.phraseArray();
const currLetterObj = player.letterObj();

// For each letter in the word array it creates span tags
currSplitWord.forEach(ltr => {
    const spanLetter = document.createElement('span');
    spanLetter.innerHTML = ltr;
    // spanLetter.setAttribute('data-ltr', `${ltr}`);
    spanLetter.classList.add('span-spacing');
    spanLetter.classList.add('hide'); // Initially it doens't appear
    displayWord.appendChild(spanLetter);
});
console.log('Display Word Div: \n', displayWord)
// All span tags which are in sync with the phraseArr
const spanTags = document.querySelectorAll('span');
// Check user letter input and give error if Checking no input
const checkLetter = (char = inputLtr.value.toUpperCase()) => {
    const ltr = char;
    let error = false;
    if (player.ltrUsed.includes(ltr)) {
        inputLtr.placeholder = 'Letter already used!';
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
        if (!matchCount) {
            player.lives--;
        }
        pError.style.display = 'none';
        error = false;
        console.log(currLetterObj[ltr]);
        console.log(player.lives)
        console.log(player.ltrUsed)
    } else {
        error = true;
    }

    if (error) {
        pError.style.display = 'block';
    }
    player.winOrLose();

}

console.log('Span Tags: \n', spanTags);
console.log(spanTags[0].textContent);
console.log(player.lives)
// console.log(player.ltrCount)
// All event listeners
// buttonSub.addEventListener('click', checkLetter);

inputLtr.addEventListener('keydown', (e) => {
    e.stopImmediatePropagation();
    if (e.keyCode === 13) {
        checkLetter();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        checkLetter(e.key.toUpperCase());
    }
})