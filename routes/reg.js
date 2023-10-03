const express = require('express')
const router = express.Router()
const path = require('path')
const CRUDController = require('../controllers/CRUDController')
const Controller = new CRUDController()



router.get('/', (req, res) =>  {
 res.sendFile(path.join(__dirname, "..", "HTML", "reg.html"))
})


router.post('/', Controller.addWorker)



module.exports = router