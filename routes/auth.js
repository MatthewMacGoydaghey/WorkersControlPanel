const express = require('express')
const router = express.Router()
const path = require('path')
const authController = require('../controllers/authController')
const Controller = new authController()


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", 'HTML', 'auth.html'))
})

router.post('/', Controller.login)


router.delete('/', Controller.logout)


module.exports = router