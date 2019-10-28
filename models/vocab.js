module.exports = function(sequelize, DataTypes) {
    const Vocab = sequelize.define("Vocab", {
    word: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: {
                args: [30],
                msg: "Word must be less than 30 characters long."
            }
        }
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: {
                args: [2]
            }
        }
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 3
        }
    }
  });

  return Vocab;
};
