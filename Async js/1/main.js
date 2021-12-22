const fs = require("fs");
const { accessPromise, readPromise , writePromise} = require("./promise");


Promise.all([accessPromise("names.txt"), accessPromise("numbers.txt")])
  .then(function () {
    return Promise.all([readPromise("names.txt"), readPromise("numbers.txt")]);
  })
  .then(parser)
  .then((data) => writePromise("final.txt" , data))
  .catch(function (error) {
    console.log(error);
  });


function parser([names , numbers]){
  return new Promise((resolve,reject) =>{
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
    switch (numbersObject[key]?.length){
      case undefined:
        para += `${person[key]} does not have a number. \n`;
        break;
      case 1:
        para += `${person[key]}'s phone number is ${numbersObject[key][0]}. \n`;
        break;
      default:
        para += `${person[key]}'s phone numbers are ${numbersObject[key].join(
          " ,"
        )}. \n`;
        break;

    }
  }
  
    resolve(para)
  } )
}