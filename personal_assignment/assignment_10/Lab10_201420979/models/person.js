const mongoose = require('mongoose')
const mongooseAutoInc = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.plugin(mongooseAutoInc.plugin, 'person');
module.exports = mongoose.model('person', userSchema)
