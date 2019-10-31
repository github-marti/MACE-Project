var db = require("../models");

module.exports = function(app) {
    app.get("/api/vocab", function(req, res) {
        db.Vocab.findAll()
        .then(results => {
            console.log("vocabulary sent", results[0].dataValues);
            res.json(results);
        });
    });

    app.post("/vocab/:vocab/", function(req, res) {
        console.log("req", req.body);
        db.Vocab.create({
            nativeword: req.body.nativeword,
            nativelanguage : req.body.nativelanguage,
            translatedword: req.body.translatedword,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: req.body.UserId,
            LanguageId: req.body.LanguageId,
            VocabListId: req.body.VocabListId
        })
        .then(results => {
            res.json(results);
        });
    });
};