const { response } = require("express");
const jwt = require("jsonwebtoken");

const validatorJWT = (req, res = response, next ) => {
    const token = req.header("x-token");
    if(!token) {
        return res.status(401).json({
            ok: false, 
            msg: "Miss the token on the validation",
        });
    }

    try {
        const payload = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );
        console.log(payload._id);

        req._id  = payload._id;
        req.sex  = payload.sex;
        req.age  = payload.age;
        req.name = payload.name;
        

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token is not valid"
        });
    }

    next();
}

module.exports = {
    validatorJWT,
}