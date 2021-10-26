const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { generateJWT } = require('../helpers/jwt');

const loginUser = async(req, res = response ) => {
    const { email, password } = req.body;

    try {
        const user = await  User.findOne({ email });
        

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: "The user or password are incorrects",
            });
        }

        const validPassword = await bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg:"The user or password are incorrects"
            });
        }

        const token = await generateJWT(user._id, user.age, user.sex, user.name);

        res.status(201).json({
            ok   : true,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please inform about this error with the admin"
        });
    }


};

const createUser = async(req, res = response ) => {
    const { age, sex, name, email, password  } = req.body;
    try {
        let user = await  User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok : false,
                msg : "The user alredy exists",
            });
        }
        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        const token = await generateJWT(user._id, user.age, user.sex, user.name);
    
        res.status(201).json({
            ok : true,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok : false,
            msg : "Inform about this to the admin",
        });
    }

};

const getToken = async(req,  res = response) => {
    const { _id, age, sex, name } = req;
    console.log(_id, age, sex, name )

    const token = await generateJWT( _id, age, sex, name);

    res.status(201).json({
        ok: true,
        token
    });
};

module.exports = {
    getToken,
    loginUser,
    createUser,
};