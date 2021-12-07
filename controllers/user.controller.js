const db = require('../db');
const User = require('../models/user');

class UserController {
    getAdminPage(req, res, next) {
        db.QueryAllUser().then(data => res.render('admin', {
            data: data
        }));
    }

    getAddUser(req, res, next) {
        try {
            db.AddOneUser(req.body);
        } catch (err) {
            console.log(err);
        }

        res.render('adduser');
    }

    postAddUser(req, res, next) {

    }

    putEditUser(req, res, next) {

    }

    getChangePassword(req, res, next) {

    }

    putChangePassword(req, res, next) {

    }

    deleteUser(req, res, next) {

    }
}

module.exports = new UserController();