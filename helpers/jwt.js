const jwt = require('jsonwebtoken');

const generateJWT = ( _id, age, sex, name) => {
    return new Promise((resolve, reject) => {
        const payload = { _id, age, sex, name };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '5h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error on generate token');
            }
            resolve(token);
        });
    });
}

module.exports = {
    generateJWT,
}