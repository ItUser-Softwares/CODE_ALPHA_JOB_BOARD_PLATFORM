module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('notification', {
        jobId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiverEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploadPath: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isAccepted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });
    return Notification;
}