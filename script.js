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
// Choice of words
const words = ['hello', 'goodbye'];
// Class for an instance of Hangman
class Hangman {
    constructor(word) {
        this.word = word;
    }
    wordArray() {
        return this.word.split('');
    }
    letterObj() {
        const obj = {};
        const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
        // console.log(alphabetArr);
        alphabetArr.forEach(ele => {
            obj[ele] = [];
        });
        // console.log(obj);
        const word = this.wordArray();
        for (let i = 0; i < word.length; i++) {
            obj[word[i]].push(i);
        }
        // console.log(obj);
        return obj;
    }
}
// Initilizing an instance
let player = new Hangman(words[0]);
const currSplitWord = player.wordArray();
const currLetterObj = player.letterObj();
// console.log(player);
// console.log(player.wordArray());
// console.log(currSplitWord)
console.log(currLetterObj);

currSplitWord.forEach(ele => {
    const spanLetter = document.createElement('span');
    spanLetter.innerHTML = ele;
    spanLetter.setAttribute('data-ltr' , `${ele}`);
    spanLetter.classList.add('span-spacing');
    spanLetter.classList.add('hide');
    displayWord.appendChild(spanLetter);
});

const checkLetter = () => {
    const ltr = inputLtr.value;
    inputLtr.value = '';
    if (currLetterObj[ltr].length > 0) {
        console.log('work');
    }
    console.log(currLetterObj[ltr]);
}

// All event listeners
buttonSub.addEventListener('click', checkLetter);











