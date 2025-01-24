var express = require('express')
var loginRouter = express.Router()
const {User } = require('../../models');
const bcrypt = require('bcryptjs');

loginRouter.get('/login', function (req, res, next) {
    res.render('auth/login', {});
});

loginRouter.post('/login', async (req, res) => {

    const { loginEmail, loginPswd } = req.body;

    User.sync().then(() => {
        console.log('Database synced successfully');
    }).catch((err) => {
        console.error('Error syncing database: ', err);
    });

    const user = await User.findOne({where: {email:loginEmail}});
    if (!user) {
        return res.send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(loginPswd, user.password);
    if (isPasswordValid) {
        req.session.user = { id: user.id, email: user.email };
        return res.redirect('/profile');
    } else {
        return res.send("Invalid username or password.");
    }
});

module.exports = loginRouter;