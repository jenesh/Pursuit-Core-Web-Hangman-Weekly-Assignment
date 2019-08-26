function start() {
    // Audio script
    const {
        Howl,
        Howler
    } = require('howler');

    const sound = new Howl({
        src: ['./sounds/without_god.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
        onend: function () {
            console.log('Again!');
        }
    });


    sound.play();


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
    const displayLetters = document.querySelector('#display-letters');
    const inputForm = document.querySelector('#input-form');
    // Child div's of #input-form
    const inputLtr = document.querySelector('#input-ltr');
    const buttonSub = document.querySelector('#button-sub');
    const pError = document.querySelector('#p-error');
    // Restart div and button
    const restartDiv = document.querySelector('#restart-div');
    const restartBtn = document.querySelector('#restart-btn');

    // Choice of words
    const words = ['amuse', 'lazy', 'steam', 'ugly', 'scent', 'separate', 'vast', 'quiver', 'average', 'seashore', 'pray', 'descriptive', 'grumpy', 'knot', 'reaction', 'voiceless', 'carve', 'front', 'ground', 'evanescent', 'reason', 'judicious', 'earthquake', 'desert', 'educated', 'distance', 'waiting', 'trucks', 'scatter', 'chop', 'annoying', 'puzzling', 'close', 'animated', 'elbow', 'fretful', 'towering', 'satisfying', 'momentous', 'sore', 'animal', 'puzzled', 'fair', 'windy', 'quickest', 'stocking', 'wobble', 'beg', 'craven', 'border', 'round', 'moan', 'reproduce', 'stormy', 'unnatural', 'table', 'brother', 'violet', 'appreciate', 'overjoyed', 'actor', 'rightful', 'feeling', 'somber', 'safe', 'form', 'brief', 'crazy', 'cows', 'found', 'cattle', 'dynamic', 'majestic', 'contain', 'week', 'magical', 'gullible', 'adamant', 'file', 'cobweb', 'best', 'assorted', 'tasteful', 'nippy', 'secret', 'flavor', 'match', 'magic', 'few', 'different', 'ajar', 'idea', 'settle', 'plain', 'oatmeal', 'humdrum', 'romantic', 'bolt', 'juicy', 'obsequious', 'awake', 'robin', 'observe', 'mundane', 'mute', 'mighty', 'worried', 'chalk', 'strong', 'metal', 'manage', 'aboard', 'extend', 'verse', 'icicle', 'sharp', 'illegal', 'drip', 'lewd', 'perfect', 'shocking', 'branch', 'hot', 'polite', 'calculate', 'park', 'mate', 'handle', 'planes', 'rough', 'rabbit', 'belong', 'office', 'protect', 'free', 'driving', 'toothpaste', 'chubby', 'tall', 'loutish', 'shake', 'imported', 'hungry', 'camera', 'puny', 'building', 'present', 'rock', 'cycle', 'impress', 'vigorous', 'ready', 'card', 'argue', 'clam', 'scarce', 'person', 'wiry', 'guide', 'include', 'thankful', 'adorable', 'arch', 'sincere', 'earthy', 'elfin', 'silent', 'disarm', 'wish', 'unpack', 'honey', 'chunky', 'suspend', 'mature', 'needy', 'omniscient', 'devilish', 'tree', 'grass', 'narrow', 'pizzas', 'design', 'ragged', 'sheet', 'needle', 'rot', 'ticket', 'ship', 'fill', 'rule', 'lame', 'heal', 'greet', 'temper', 'gamy', 'quiet', 'trap', 'rhetorical', 'wing', 'dead'];
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
            // console.log('Object after index #\'s of word array: \n', obj);
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

    // Initilizing an instance of Hangman
    const player = new Hangman(words[Math.floor(Math.random() * 200)].toUpperCase());
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
        // console.log(player.words.length, ltr.length);

        if (player.words.length === ltr.length) {
            if (player.words === ltr) {
                for (let i = 0; i < spanTags.length; i++) {
                    spanTags[i].style.color = 'black';
                    spanTags[i].style.boxShadow = 'none';
                }
                return;
            }
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
                player.winOrLose();
                player.lives--;
                inputLtr.placeholder = `Sorry, no ${ltr}!`;
            }
            pError.style.display = 'none';
            error = false;
            // console.log(currLetterObj[ltr]);
            // console.log(player.lives)
            // console.log(player.ltrUsed)
        } else {
            error = true;
        }

        if (error) {
            pError.style.display = 'block';
        }
        player.winOrLose();

    }
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

    restartBtn.addEventListener('click', () => {
        delete player;
        console.log(player);
        start();
        console.log(player);
    });
}

start();