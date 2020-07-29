const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    title: {type :String,required: true  },
    content: {type :String,required: true  },
    user: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required :true },
    likes :[{type: mongoose.Schema.Types.ObjectId,ref: 'User',}],
    comments :[{ body : String , User : {type: mongoose.Schema.Types.ObjectId,ref: 'User'} }],
    readers :[{ type: mongoose.Schema.Types.ObjectId , ref: 'User', }],
    tags :[String],
    //time:Date

})
schema.set('toJSON', (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString();
    delete returnedObject._id;
    })
schema.plugin(uniqueValidator);
module.exports = mongoose.model('Article', schema);
