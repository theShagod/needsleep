const {DataTypes} = require('sequelize')

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
        test: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

}