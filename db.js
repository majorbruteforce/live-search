const mongoose= require('mongoose');

const songSchema= new mongoose.Schema({
    title: String,
    artist: String,
    songName: String,
    imgName: String,
});


module.exports= mongoose.model("search-test",songSchema);






