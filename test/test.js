let root = document.querySelector("#root");

function add() {
    let ltrs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    ltrs.forEach(ele => {
        const p = document.createElement('span');
        p.style.backgroundImage = `url(../assets/ice_${ele}.svg)`;
        console.dir(p)
        root.appendChild(p);
    })
}

add();

let words = ['hello'];