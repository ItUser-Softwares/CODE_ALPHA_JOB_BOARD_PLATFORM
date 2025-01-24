var express = require('express');
var signupRouter = express.Router();
var bcrypt = require('bcryptjs');
const {  User } = require('../../models');

signupRouter.get('/signup', function (req, res) {
    res.render('auth/signup');
});

signupRouter.post('/signup', async (req, res, next) => {
    const { signupEmail, signupPswd } = req.body;

    User.sync().then(() => {
        console.log('Database synced successfully');
    }).catch((err) => {
        console.error('Error syncing database: ', err);
    });

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: signupEmail } });
    if (existingUser) {
        return res.send("User already exists!");
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(signupPswd, 10);
    try {
        const user = await User.create({
            email: signupEmail,
            password: hashedPassword,
        });
        console.log('User created:', user.toJSON());
    } catch (error) {
        console.error('Error creating user:', error);
    }

    return res.send("Signup successful! <a href='/profile/login'>Go to Login</a>");
});


module.exports = signupRouter;