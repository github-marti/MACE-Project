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
        db.Vocab.create({
            word: req.params.vocab,
            LanguageId: req.body.LanguageId,
            UserId: req.body.UserId,
            ListId: req.body.ListId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(results => {
            res.json(results);
        });
    });
};