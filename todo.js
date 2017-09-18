var mongoose = require('mongoose'); //we get the mongose that we want 

// this should be about mongoose module ?
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