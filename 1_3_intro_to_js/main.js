console.log('hello world');

const string = "string";
const number = 3;
const boolean = true; // false
const string_not_boolean = "false";
const array = [1, 2, 3] // ["one", "two"]
const object = { 
    "key": "value", 
    "key": "value", 
}


const thing = 1;
const thingTwo = 1;

const obj = { key: "value" }
const objTwo = { key: "value" }

const arrayTwo = ["one", "two", "three"]
// const arrayThree = arrayTwo.forEach(d => console.log(d + " thing"))
// console.log(arrayTwo, arrayThree)

let arrayFour = [];
arrayTwo.forEach(d => arrayFour.push(d))
// console.log(arrayFour)


let changeableGlobal = true;
const constantGlobal = true;
const changeEmUp = () => {
    changeableGlobal = false;
    console.log('changeableGlobal', changeableGlobal)
    const constantGlobal = false;
    // console.log('constantGlobal', constantGlobal)
};
changeEmUp();
// console.log('constantGlobal', constantGlobal) 

const varying = 8;
const stringTwo = `string part with a ${varying} part`
// console.log('stringTwo', stringTwo)






const input = document.getElementById("cheese")
const label = document.getElementById("label")
// console.log('input', input)
let answer = null;

const shareAnswer = () => {
    answer = input.value;
    window.alert(`You feel this way about cheese: ${answer}`)
    label.innerHTML = `You said ${answer}. Do you want to change it?`
}

