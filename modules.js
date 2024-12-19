const mongoose = require('mongoose');

//schema object
const myschema = new mongoose.Schema({
    name: {type: 'string',
        required: true
    },
    age:{
        type: 'string',
        required: true
    },
    gender:{
        type:'string',
        required: true
    },
    mobile:{
        type:'number',
        required: true
    },
    address:{
        type:'string',
        required: true
    },
    more:{
        type:'string'
    },
    date:{
        type: Date,
        default: Date.now
    }
});


//ceate a model
const user = mongoose.model('user', myschema);
module.exports = user;
