const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const redis_client = require('../redis.connect')

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function Register(req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role
    if(typeof role != "number"){
        return res.status(400).json({status: false, message: "Role must be a number"})
    }
    if( 0 > role || role > 5){
        return res.status(400).json({status: false, message: "Role must be between 0-5"})
    }
    if(!emailIsValid(email)){
        return res.status(400).json({status: false, message: "Email is invalid"})
    }

    const user = new User({name: name, email: email, password: password, role: role})
    try {
        const save_user = await user.save();
        res.json({status: true, message: "Register successfully", data: save_user})
    } catch (error) {
        res.status(400).json({status: false, message: "Failed to save user", data: error})
    }
}

async function Login(req, res) {
    const name = req.body.name;
    const password = req.body.password;

    try {
        const user = await User.findOne({name: name, password: password}).exec()
        if (user === null) {
            return res.status(401).json({status: false, message: 'name or password is invalid'})
        }
        const access_token = jwt.sign({sub: user._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_TIME});

        redis_client.get(user._id.toString(), (err, data) => {
            if (err) {
                throw err
            }
            redis_client.set(user._id.toString(), JSON.stringify({access_token: access_token}))

        })
        return res.json({status: true, message: 'login success.', data: {access_token: access_token}});
    } catch {

    }

    return res.status(401).json({status: true, message: 'login failed'})

}

async function Logout(req, res) {
    const user_id = req.userData.sub
    await redis_client.del(user_id.toString())
    return res.json({status:true, message: 'logout success.'});
}


module.exports = {
    Register,
    Login,
    Logout
}