var db = require("../models");

module.exports = function(app) {
    app.get("/api/vocablists", function(req, res) {
        db.VocabList.findAll({
            include: [
                {
                    model: db.Vocab
                }
            ]
        })
        .then(results => {
            console.log("vocablists sent", results[0].dataValues);
            res.json(results);
        });
    });

    app.post("/vocablist/:vocablist/", function(req, res) {
        db.VocabList.create({
            name: req.params.list,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: req.body.UserId
        })
        .then(results => {
            res.json(results);
        });
    });
};