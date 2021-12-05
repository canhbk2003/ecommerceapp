const mongoose = require('mongoose');

const db = require('../db');

exports.requireAuth = function(req, res, next) {
    if (!req.cookies.userId) {
        res.render('login', { loginstate: "" });
        return;
    }

    const user = db.GetById(req.cookies.userId)
        .then(data => {
            if (data.userId !== req.cookies.userId) {
                res.render('login', { loginstate: "" });
                return;
            }

            next();
        });
}

exports.releaseAuth = function(req, res, next) {
    res.clearCookie('userId');
    next();
}