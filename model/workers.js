const mongoose = require('mongoose')
const Schema = mongoose.Schema


const workerSchema = new Schema({
  Name: {type: String, required: true},
  Email: {type: String, required: true},
  Password: {type: String, required: true},
  Position: {type: String, required: true},
  Status: {type: String, required: true},
  Token: {type: String}
})






const Worker = mongoose.model('worker', workerSchema)


module.exports = Worker