const { response } = require("express");
const jwt = require("jsonwebtoken");

const validatorJWT = (req, res = response, next ) => {
    try {
        const token = req.header("x-token");

        if(!token) {
            return res.status(401).json({
                ok: false, 
                msg: "Miss the token on the validation",
            });
        }

        const payload = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        res.locals.token = {
            _id  : payload._id,
            sex  : payload.sex,
            age  : payload.age,
            name : payload.name,
        };

        return next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token is not valid"
        });
    }
}

module.exports = {
    validatorJWT,
}