const { response } = require('express')
const Worker = require('../model/workers')
const { set } = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config')

class authController {


async login(req, res) {
const {name, pwd} = req.body

const foundUser = await Worker.findOne({Name: name})
if (!foundUser) {
 return res.status(404).json(`User ${name} not found`)
}

const correctPwd = await bcrypt.compare(pwd, foundUser.Password)

if (!correctPwd) {
 return res.status(400).json(`Invalid password`)
}

const payload = {
  name: foundUser.Name,
  pos: foundUser.Position
}

const token = JWT.sign(
  payload,
  TOKEN_SECRET,
  {expiresIn: "15m"}
)

const updateToken = await Worker.updateOne({Name: name}, {$set: {Status: 'Online', Token: token}})


res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60000})
res.json(`User has been successfully authorized`)
}




async logout(req, res) {
  const cookies = req.cookies

  if (!cookies?.jwt) {
    return res.status(404).json('Cookies not found')
  }

  const token = cookies.jwt

  const payload = JWT.decode(token)
  const updateToken = await Worker.updateOne({Name: payload.name}, {$set: {Status: 'Offline', Token: 'None'}})

 res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
 res.status(200).json('Token deleted')
}

}






module.exports = authController