const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required:true,

    },
author:{
    type: String,
    require:true,

},
publisher:{
    type: String,
    require:true,

},
genre:{
    type: String,
    require:true,

},
pages:{
    type: Number,
    require:true, 

},
rating:{
    type: Number,
    require:true,

},
synopsis:{
    type: String,
    require:true,

},
image:{
    type: String,
    require:true,

}

});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;