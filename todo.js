// adding the required dependencies 
var mongoose = require('mongoose'); 

// creating our DTO 
module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    }
});

/*a much simpler introductory todo object could be as follows :
var todo = mongoose.model('Todo', {
    text : String 
});
*/