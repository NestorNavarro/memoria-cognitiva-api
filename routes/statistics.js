const { Router }       = require("express");
const { check, param } = require("express-validator");

const { validatorJWT }     = require("../middlewares/validar-jwt");
const { validateFiles }    = require("../middlewares/validators");
const { types }            = require("../helpers/testTypes");
const StatisticsController = require("../controllers/statistics");

const router = new Router();

router.post("/:type/:userId",
    [
        param("type").isIn(types).notEmpty(),
        param("userId").isString().notEmpty(),
        check("score").isNumeric().notEmpty().customSanitizer(value => Number(value)),
        validatorJWT,
    ]
,StatisticsController.saveResult);

router.get("/:type",
    [
        param("type").isIn(types).notEmpty(),
        validateFiles,
    ]
,StatisticsController.getStatistics);

module.exports = router;
