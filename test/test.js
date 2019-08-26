const root = document.querySelector("#root");

let request = new XMLHttpRequest();

request.open("GET", "https://wordsapiv1.p.mashape.com/words/example", true);

request.onload = function() {
  let obj = JSON.parse(this.response);
  console.log(obj);
};

request.send();
