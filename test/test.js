// let root = document.querySelector("#root");

// function add() {
//     let ltrs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//     ltrs.forEach(ele => {
//         const p = document.createElement('span');
//         p.style.backgroundImage = `url(../assets/ice_${ele}.svg)`;
//         console.dir(p)
//         root.appendChild(p);
//     })
// }

// add();

// let words = ['hello'];


function diffArray(arr1, arr2) {
    var newArr = [];
    // Same, same; but different.

    let combined = arr1.concat(arr2).sort((a, b) => a - b);

    while (combined.length) {
        let current = combined.shift();
        let index = combined.indexOf(current);
        console.log('Current: ', current);
        console.log('Index', index);
        if (index < 0) {
            newArr.push(current);
        } else {
            combined.splice(index, 1);
        }
    }
return newArr;
}


// console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]));



function destroyer(arr) {
    // Remove all the values
    
    let args = [...arguments];
    let set = args.shift();
    let array = [];
    set.forEach(ele => args.includes(ele) ? null : array.push(ele));

    return array
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
