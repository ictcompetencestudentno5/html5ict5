                            // --- BASICS OF THE JS ---
// console.log(`this is log`);

// window.alert(`this is alert`);

document.getElementById("myH1").textContent = `js test`;

//  document is your file
//    getElementById means it will get the id of the picked element
//    textContent = it will change the content of the element


                            // ---VARIABLES---
//  behave as if it were the value it contains

//  1.declaration let x;
//  2.assignment x = 100;

//example

let x;
x = 100;

console.log(x); //it will  print what x = to 

//example 2
//      if number (number)
//      if text ("text"), ('text'), (`text`)

//number

let age;
age = 15;

console.log(`you are ${age} years old`)

//string/text

let name = "ji";

console.log(name)
console.log(`your name is ${name}`)

                            //  ---BOOLEANS---
//                              either  true or false
//example

let online1 = true;
let online2 = false;

console.log(`player1 is online: ${online1}`);
console.log(`player2 is online ${online2}`);

//example1

let examplename = "ji"; //string
let exampleage = 16; //number
let examplestudent = true; //boolean

document.getElementById("p1").textContent = `My name is ${examplename}`;
document.getElementById("p2").textContent = `My age is ${exampleage} years old`;
document.getElementById("p3").textContent = `Enrolled: ${examplestudent}`;

                        // ---ARITHMETIC OPERATIONS---
//                              operatos (+ - * /)
//                              ex. 11 = x + 5;