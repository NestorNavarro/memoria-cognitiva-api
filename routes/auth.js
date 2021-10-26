const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validatorJWT } = require("../middlewares/validar-jwt");
const { validateFiles } = require("../middlewares/validators");
const { loginUser, createUser, getToken } = require("../controllers/auth");

router.post("/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        check("password", "Password need at lest 6 characters").isLength({ min : 6 }),
        validateFiles,
    ]
,loginUser);

router.post("/new", 
    [
        check("email", "Email is required").isEmail(),
        check("age", "Age is required").not().isEmpty(),
        check("name", "Name is required").not().isEmpty(),
        check("sex", "Gener is required").not().isEmpty(),
        check("password", "Password need at lest 6 characters").isLength({ min : 6 }),
        validateFiles,
    ],
    createUser );

router.get("/renew", validatorJWT, getToken);

module.exports = router;