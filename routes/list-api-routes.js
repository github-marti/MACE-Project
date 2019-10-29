var db = require("../models");

module.exports = function(app) {
    app.get("/api/lists", function(req, res) {
        db.List.findAll({
            include: [
                {
                    model: db.Vocab
                }
            ]
        })
        .then(results => {
            console.log("lists sent", results[0].dataValues);
            res.json(results);
        });
    });

    app.post("/list/:list/", function(req, res) {
        db.List.create({
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