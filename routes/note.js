const { Router }       = require("express");
const { check, param } = require("express-validator");

const { validatorJWT }    = require("../middlewares/validar-jwt");
const { validateFiles,  } = require("../middlewares/validators");
const { 
    getNotes, 
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/notes");

const router = new Router();

router.get("/", validatorJWT, getNotes);

router.post("/",
    [
        check("title", "Title is required").not().isEmpty(),
        check("body", "Body is required").not().isEmpty(),
        validatorJWT,
        validateFiles,
    ]
,createNote);

router.put("/:noteId",
    [
        param("noteId").not().isEmpty(),
        check("title", "Title is required").not().isEmpty(),
        check("body", "Body is required").not().isEmpty(),
        validateFiles,
        validatorJWT,
    ]
,updateNote);

router.delete("/:noteId",
    [
        param("noteId", "noteId param required").notEmpty(),
        validatorJWT,
        validateFiles,
    ]
,deleteNote);

module.exports = router;