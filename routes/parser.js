const express = require('express')
const {getData} = require('../controllers/parser')
const router = express.Router()

router.post('/', getData)

module.exports = router
