const express = require('express');
const logout = express.Router();

logout.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.send("Logged out successfully.");
    });
});

module.exports = logout;