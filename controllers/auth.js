const { response } = require("express");
const bcrypt       = require("bcryptjs");

// Require Own Modules
const User            = require("../models/Users");
const { generateJWT } = require('../helpers/jwt');

const loginUser = async(req, res = response ) => {
    const { email, password } = req.body;

    try {
        const user = await  User.findOne({ email }).exec();

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

        return res.status(201).json({
            ok   : true,
            token,
            wordsTest   : user.words,
            cardsTest   : user.cards,
            phrasesTest : user.phrases,
            numbersTest : user.numbers,
            figuresTest : user.figures,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please inform about this error with the admin"
        });
    }


};

const createUser = async(req, res = response ) => {
    const { email, password  } = req.body;

    try {
        let user = await  User.findOne({ email }).exec();

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
    
        return res.status(201).json({
            ok : true,
            token,
            wordsTest   : user.words,
            cardsTest   : user.cards,
            phrasesTest : user.phrases,
            numbersTest : user.numbers,
            figuresTest : user.figures,
        });
    } catch (error) {
        return res.status(500).json({
            ok : false,
            msg : "Inform about this to the admin",
        });
    }

};

const getToken = async(req,  res = response) => {
    const {
        _id,
        age,
        sex,
        name,
    } = res.locals.token;

    const user = await  User.findOne({ _id }).exec();

    const token = await generateJWT( _id, age, sex, name);

    return res.status(201).json({
        ok: true,
        token,
        cardsTest    : user.cards,
        wordsTest    : user.words,
        figuresTest  : user.figures,
        numbersTest  : user.numbers,
        phrasesTest  : user.phrases,
    });
};

module.exports = {
    getToken,
    loginUser,
    createUser,
};
