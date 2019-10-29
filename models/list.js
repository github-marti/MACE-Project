module.exports = function(sequelize, DataTypes) {
    const List = sequelize.define("List", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    List.associate = function(models) {
        List.hasMany(models.Vocab, {
            onDelete: "cascade"
        });
    };

  return List;
};