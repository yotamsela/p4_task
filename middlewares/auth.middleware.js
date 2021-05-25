const jwt = require('jsonwebtoken');
const redis_client = require('../redis.connect')
const User = require('../models/user.model');

function verifyToken(req, res, next) {
    try {
        const access_token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(access_token, process.env.JWT_ACCESS_SECRET)
        req.userData = decoded

        redis_client.get(decoded.sub.toString(), (err, data) => {
            if (err) {
                throw err;
            }
            if (data === null) {
                return res.status(401).json({status: false, message: 'Token is not in store'})
            }
            if (JSON.parse(data).access_token !== access_token) {
                return res.status(401).json({status: false, message: 'Token is not same as in store'})

            }
            next();
        })
    } catch
        (error) {
        return res.status(401).json({status: true, message: 'Session is invalid', data: error})
    }

}

async function verifySysadmin(req, res, next) {
    const userId = req.userData.sub
    try {
        const user = await User.findOne({_id: userId}).exec()
        if (user === null) {
            return res.status(500).json({status: false, message: 'user does not exists'})
        }
        if (user.role !=5) {
            return res.status(403).json({status: true, message: 'Forbidden, require Sysadmin role'})
        }
        next();
    } catch (error) {
        return res.status(401).json({status: true, message: 'Session is invalid', data: error})
    }

}

module.exports = {verifyToken, verifySysadmin}
