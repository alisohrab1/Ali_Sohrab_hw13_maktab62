const fs = require('fs');
const path = require('path');




function accessPromise(filename){
    return new Promise ( function(resolve, reject){
        fs.access(filename, function (err){
            if(err) reject("file not found");
            else resolve("ok")
        });

    });
}

function readPromise(filename){
    return new Promise (function(resolve,reject){
        fs.readFile(filename, 'utf-8' ,  function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }

        } )
    })
}

function writePromise(filename,data){
    return new Promise(function(resolve,reject){
        fs.writeFile(filename,data,(err) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = {accessPromise , readPromise , writePromise};