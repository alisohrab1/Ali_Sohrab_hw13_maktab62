const fs = require('fs').promises;
const { accessPromise, readPromise , writePromise} = require("./promise");


function parser(names , numbers){
    let person = {};
  let splittedData = names.split("\r\n");
  for(const element of splittedData){
    [key , value] = element.split(" - ");
    person[key] = value;
  }
  let numbersObject = {};
  let splittedData2 = numbers.split("\r\n");
  for(const element of splittedData2){
    [key,value] = element.split(" - ");
    if(!!numbersObject[key]) {
      numbersObject[key] = [...numbersObject[key], value];

    } else {
      numbersObject[key] = [value];
    }
  }
  let para = "";
  for (const key in person) {
    switch ( numbersObject[key]?.length){
      case undefined:
        para += `${person[key]} does not have a number. \n`;
        break;
      case 1:
        para += `${person[key]}'s phone number is ${ numbersObject[key][0]}. \n`;
        break;
      default:
        para += `${person[key]}'s phone numbers are ${ numbersObject[key].join(
          " ,"
        )}. \n`;
        break;

    }
  }
  
    return(para)
}

async function myfunc() {
  try{
    const hasName = await accessPromise("names.txt");
    const hasNumber = await accessPromise("numbers.txt");
    const names = await readPromise("names.txt");
    const numbers = await readPromise("numbers.txt");
    const process = parser(names, numbers)
    const writer = await writePromise("final.txt" , process);

  }
  catch(err){
    console.log(err);
  }
   
}


async function myfunc2() {
  try{
    await Promise.all([accessPromise("names.txt"), accessPromise("names.txt")]);
    const [names , numbers] = await Promise.all([readPromise("names.txt") , readPromise("numbers.txt")])
    const process = parser(names, numbers)
    await writePromise("final.txt" , process);

  }
  catch(err){
    console.log(err);
  }
   
}


myfunc2()

