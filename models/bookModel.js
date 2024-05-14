const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        

    },
author:{
    type: String,
    

},
publisher:{
    type: String,
    

},
genre:{
    type: String,
    

},
pages:{
    type: Number,
    

},
rating:{
    type: Number,
    

},
synopsis:{
    type: String,
    

},
image:{
    type: String,
  

}

});

const Books = mongoose.model("Book", bookSchema);

module.exports = Books;