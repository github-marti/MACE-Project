module.exports = function(sequelize, DataTypes) {
    const Language = sequelize.define("Language", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: [2]
                }
            }
        }
    });

    Language.associate = function(models) {
        Language.hasMany(models.Vocab, {
            onDelete: "cascade"
        });
    };

  return Language;
};