const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>
{
    sequelize.define('Bed', {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^wake$|^sleep$/
            }
        },
        /*
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
        */
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

}
