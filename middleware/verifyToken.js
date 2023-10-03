const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
const cookies = req.cookies

if (!cookies?.jwt) {
 return res.redirect('http://localhost:3000/auth')
}

const token = cookies.jwt
const payload = jwt.decode(token)
const position = payload.pos

if (position === 'Admin') {
  return next()
}
res.sendStatus(403)
}




module.exports = verifyToken