const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./secrets');

function tokenBuilder(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const option = {
        expiresIn: '1d',
    };
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        option,
    )
    return token
}

module.exports = tokenBuilder