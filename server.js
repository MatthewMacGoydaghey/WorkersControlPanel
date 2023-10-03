const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const verifyToken = require('./middleware/verifyToken')

const { PORT } = require('./config')

mongoose.connect('mongodb://0.0.0.0:27017/WMA')
.then((response) => {
  console.log('Connected to MongoDB')
})
.catch((err) => {
  console.log(err)
})

app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))



app.use('/auth', require('./routes/auth'))
app.use('/workersCP', verifyToken, require('./routes/workersCP'))
app.use('/reg', verifyToken, require('./routes/reg'))


app.get('/', (req, res) => {res.redirect('http://localhost:3000/reg')})
app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, 'HTML', '404.html'))})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))