const searchTest= require('./db.js');
const mongoose= require('mongoose');



async function getBuffer(number){
    const result= await searchTest.aggregate([{$sample: {size : number}}]);
    return result;
}

module.exports= getBuffer;