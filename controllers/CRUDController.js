const { response } = require('express')
const Worker = require('../model/workers')
const { set } = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


class CRUDController {


async getWorkers(req, res) {
  const reqBody = req.body
  if (reqBody.name) {
    const worker = await Worker.findOne({Name: reqBody.name})
    return res.status(200).json(worker)
  }
    const workers = await Worker.find()
    res.status(200).json(workers)
}



async addWorker(req, res) {
  const {name, email, pwd, pos} = req.body
  const duplicate = await Worker.findOne({Name: name})
  if (duplicate) {
    return res.status(404).json('Worker already exists')
  }
  const hashedPwd = await bcrypt.hash(pwd, 6)
  const newWorker = {
    name: name,
    email: email,
    pwd: hashedPwd,
    pos: pos
  }
  Worker.insertMany([{Name: newWorker.name, Email: newWorker.email, Password: newWorker.pwd, Position: newWorker.pos, Status: "Offline"}])
  res.status(200).json("Worker successfully added to the database")
  }




async deleteWorker(req, res) {
const {name} = req.body
const deleted = await Worker.deleteOne({Name: name})
console.log(deleted)
res.status(200).json('Worker have been deleted')
}


async updateWorker(req, res) {
  const { name, updName, updEmail, updPos } = req.body
  const updated = await Worker.updateOne({Name: name}, {$set: {Name: updName, Email: updEmail, Position: updPos}})
  res.status(200).json(`Worker ${name} have been updated`)
}
}


module.exports = CRUDController