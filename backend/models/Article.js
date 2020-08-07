const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    title: {type :String,required: true  },
    content: {type :String,required: true  },
    userID: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required :true },
    username:{type :String,required: true  },
    likes:Number,
    likeList:{username:String,userID:{type: mongoose.Schema.Types.ObjectId,ref: 'User'}},
    comments :[{ body : String , username:String,userID:{type: mongoose.Schema.Types.ObjectId,ref: 'User'}}],
    readers :Number,
    tags :[String],
    //time:Date

})
schema.set('toJSON', {})
schema.plugin(uniqueValidator);
module.exports = mongoose.model('Article', schema);
