var db = require("../models");

module.exports = function(app) {
    app.get("/api/vocablists", function(req, res) {
        db.VocabList.findAll({
            include: [
                {
                    model: db.Vocab,
                    
                }
            ]
        })
        .then(results => {
            res.json(results);
        });
    });

    app.post("/vocablist/:vocablist/", function(req, res) {
        console.log(req.body);
        db.VocabList.create({
            name: req.params.vocablist,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: req.body.UserId
        })
        .then(results => {
            res.json(results);
        });
    });
};