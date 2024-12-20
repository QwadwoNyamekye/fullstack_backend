const mongoose = require('mongoose')
const logger = require('../utils/logger')

const noteSchema = new mongoose.Schema({
  content: { type: String, minlength: 5, required: true },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    logger.info(document)
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
