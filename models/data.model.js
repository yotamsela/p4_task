const mongoose = require('mongoose')
const dataSchema = new mongoose.Schema({
    userId: {
        type: String, required: true
    },
    procedureName: {
        type: String, required: true
    },
    timestamp: {
        type: Number, required: true
    },
    result: {
        type: String, required:true
    }
})

module.exports = mongoose.model('Data', dataSchema);