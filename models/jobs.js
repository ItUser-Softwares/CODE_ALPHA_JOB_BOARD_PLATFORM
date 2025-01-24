module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('job', {
        shortId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        uploadId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Job;
};