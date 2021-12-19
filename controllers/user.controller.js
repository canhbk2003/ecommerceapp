const db = require('../db');
const User = require('../models/user');
const logger = require('../log/logger');

class UserController {
    getAdminPage(req, res, next) {
        db.QueryAllUser().then(data => res.render('admin', {
            data: data
        }));
    }

    getAddUser(req, res, next) {
        res.render('adduser');
    }

    postAddUser(req, res, next) {
        try {
            db.AddOneUser(req.body);
        } catch (err) {
            logger.error(err);
        }

        res.render('adduser');
    }

    getEditUser(req, res, next) {
        User.findById(req.params.id)
            .then(data => res.render('edituser', {
                user: data
            }))
            .catch(next)
    }

    putEditUser(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin'))
            .catch(next)
    }

    getChangePassword(req, res, next) {
        res.render('changepassword');
    }

    putChangePassword(req, res, next) {
        // T.B.D
    }

    deleteUser(req, res, next) {
            User.deleteOne({ _id: req.params.id })
                .then(() => res.render('back'))
                .catch(next)
        }
        // sign up
    getSignup(req, res, next) {
        res.render('signup');
    }

    postSignup(req, res, next) {

        }
        // reset password
    getResetPasswordPage(req, res, next) {
        res.render('reset');
    }
    postResetPasswordPage(req, res, next) {

    }
}

module.exports = new UserController();