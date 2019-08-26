let root = document.querySelector("#root");

// let request = new XMLHttpRequest();

// request.open("GET", "https://wordsapiv1.p.mashape.com/words/example", true);

// request.onload = function() {
//   let obj = JSON.parse(this.response);
//   console.log(obj);
// };

// request.send();



let words = ['amuse', 'lazy', 'steam', 'ugly', 'scent', 'separate', 'vast', 'quiver', 'average', 'seashore', 'pray', 'descriptive', 'grumpy', 'knot', 'reaction', 'voiceless', 'carve', 'front', 'ground', 'evanescent', 'reason', 'judicious', 'earthquake', 'desert', 'educated', 'distance', 'waiting', 'trucks', 'scatter', 'chop', 'annoying', 'puzzling', 'close', 'animated', 'elbow', 'fretful', 'towering', 'satisfying', 'momentous', 'sore', 'animal', 'puzzled', 'fair', 'windy', 'quickest', 'stocking', 'wobble', 'beg', 'craven', 'border', 'round', 'moan', 'reproduce', 'stormy', 'unnatural', 'table', 'brother', 'violet', 'appreciate', 'overjoyed', 'actor', 'rightful', 'feeling', 'somber', 'safe', 'form', 'brief', 'crazy', 'cows', 'found', 'cattle', 'dynamic', 'majestic', 'contain', 'week', 'magical', 'gullible', 'adamant', 'file', 'cobweb', 'best', 'assorted', 'tasteful', 'nippy', 'secret', 'flavor', 'match', 'magic', 'few', 'different', 'ajar', 'idea', 'settle', 'plain', 'oatmeal', 'humdrum', 'romantic', 'bolt', 'juicy', 'obsequious', 'awake', 'robin', 'observe', 'mundane', 'mute', 'mighty', 'worried', 'chalk', 'strong', 'metal', 'manage', 'aboard', 'extend', 'verse', 'icicle', 'sharp', 'illegal', 'drip', 'lewd', 'perfect', 'shocking', 'branch', 'hot', 'polite', 'calculate', 'park', 'mate', 'handle', 'planes', 'rough', 'rabbit', 'belong', 'office', 'protect', 'free', 'driving', 'toothpaste', 'chubby', 'tall', 'loutish', 'shake', 'imported', 'hungry', 'camera', 'puny', 'building', 'present', 'rock', 'cycle', 'impress', 'vigorous', 'ready', 'card', 'argue', 'clam', 'scarce', 'person', 'wiry', 'guide', 'include', 'thankful', 'adorable', 'arch', 'sincere', 'earthy', 'elfin', 'silent', 'disarm', 'wish', 'unpack', 'honey', 'chunky', 'suspend', 'mature', 'needy', 'omniscient', 'devilish', 'tree', 'grass', 'narrow', 'pizzas', 'design', 'ragged', 'sheet', 'needle', 'rot', 'ticket', 'ship', 'fill', 'rule', 'lame', 'heal', 'greet', 'temper', 'gamy', 'quiet', 'trap', 'rhetorical', 'wing', 'dead'];