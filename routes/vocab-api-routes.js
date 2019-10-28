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
            language: req.body.language
        })
        .then(results => {
            res.json(results);
        });
    });
};