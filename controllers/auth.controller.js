const User = require('../models/user');
const db = require('../db');

const authMiddleware = require('../middlewares/auth.middleware');

class AuthController {
    getLogin(req, res, next) {
        authMiddleware.releaseAuth;
        res.render('login', { loginstate: "" });
    }

    postLogin(req, res, next) {
        // clear old cookie
        authMiddleware.releaseAuth;
        var userName = req.body.user;
        var password = req.body.password;
        // find user and password if mapping -> redirect

        if (userName === "" || password === "") {
            res.render('login', { loginstate: "Tên người dùng hoặc mật khẩu không đúng!" });
            return;
        }

        db.QueryOneUser(userName).then(data => {
            if (!data) {
                res.render('login', { loginstate: "Không tồn tại user này!" });
                return;
            }
            // valid password
            const user = new User(data);
            if (!user.validPassword(password)) {
                res.render('login', { loginstate: "Mật khẩu không đúng!" });
                return;
            }
            console.log(user.userId);
            res.cookie('userId', user.userId);
            res.redirect('/');
        });
    }

    getLogout(req, res, next) {

    }

    postLogout(req, res, next) {

    }
}

module.exports = new AuthController();