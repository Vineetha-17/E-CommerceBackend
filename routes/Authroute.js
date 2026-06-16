const express = require('express')
let router = express.Router();
const { register, login } = require('../controllers/authcontroller')

router.post('/register', register)
router.post('/login', login)

module.exports = router