const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]
        const decode = jwt.verify(token, 'Averysecertcode')
        req.user = decode
        next()
    } catch (err) {
        res.json({
            errorMessage: 'Authenication failed'
        })
    }
}
module.exports = authenticate