const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    Name : {
        type : 'String',
        required : true
    },
    Email : {
        type : 'String',
        required : true,
        unique : true
    },
    Mobile : {
        type : 'String',
        required : true,
        unique : true
    },
    profilePicture : {
        type : 'String',
    },
    Password : {
        type : 'String',
        required : true
    },
    isDeleted : {
        type : 'Boolean',
        default : false
    }
}, {timestamps : true});


module.exports = mongoose.model('User', userSchema)