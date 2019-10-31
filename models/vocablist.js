module.exports = function(sequelize, DataTypes) {
    const VocabList = sequelize.define("VocabList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    VocabList.associate = function(models) {
        VocabList.hasMany(models.Vocab, {
            onDelete: "cascade"
        });

        VocabList.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

  return VocabList;
};