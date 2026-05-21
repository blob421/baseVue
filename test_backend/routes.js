
const express = require('express')
const app = require('./app')

const router = express.Router()


router.post('/users', async (req, res)=> {
  console.log('here')
  const data = req.body

  console.log(data)
  res.sendStatus(200)
})

module.exports = router



