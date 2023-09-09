
const searchTest = require("./db.js"); 

async function findFromDB(key){
  if (key){
  const results= await searchTest.find({ title: { $regex: `^${key}`, $options: 'i' } }).exec();
  return results;
}
}

module.exports= findFromDB;