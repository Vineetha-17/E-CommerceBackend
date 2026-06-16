let users = require('../models/usermodel')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let mail = require('../utils/gmail')
require('dotenv').config()

exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        if (!username || !password || !email || !role) {
            return res.json({ msg: "Missing fields" });
        }

        let checkuser = await users.findOne({ username });

        if (checkuser) {
            return res.json({ msg: "User already exists" });
        }

        // hash the password
        let hashpassword = await bcrypt.hash(password, 10)
        await users.create({
            username,
            password: hashpassword,
            email,
            role
        });

        // generate a json web token
        let payload = {
            username: username,
            emailaddress: email,
            role: role
        }
        let token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1hr' })

        // send welcome email (non-blocking)
        mail(email, username).catch(err => console.log('Mail error:', err.message))

        res.json({ msg: "Registration successful", token });
    } catch (error) {
        res.json({ msg: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password)
            return res.json({ "msg": "Missing fields" })

        let checkuser = await users.findOne({ username })
        if (!checkuser)
            return res.status(404).json({ "msg": "user not found" })

        let ishashverified = await bcrypt.compare(password, checkuser.password)
        if (!ishashverified)
            return res.status(403).json({ "msg": "Username or Password is invalid" })

        // create and return a JWT for the client
        let payload = {
            username: checkuser.username,
            emailaddress: checkuser.email,
            role: checkuser.role
        }
        let token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1hr' })
        return res.json({ msg: "Login Successful", token })
    }
    catch (error) {
        next(error)
    }

}