// route for a express instance
const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

// function route(app) {
//     app.get('/login', function(req, res, next) {
//         res.render('login', { loginstate: "" });
//     });

//     app.post('/login', function(req, res, next) {
//         var userName = req.body.user;
//         var password = req.body.password;
//         // find user and password if mapping -> redirect

//         if (userName === "" || password === "") {
//             res.render('login', { loginstate: "Tên người dùng hoặc mật khẩu không đúng!" });
//             return;
//         }

//         db.QueryOneUser(userName).then(data => {
//             if (!data) {
//                 res.render('login', { loginstate: "Không tồn tại user này!" });
//                 return;
//             }
//             // valid password
//             const user = new User(data);
//             if (!user.validPassword(password)) {
//                 res.render('login', { loginstate: "Mật khẩu không đúng!" });
//                 return;
//             }

//             console.log(user.userId);

//             res.cookie('userId', user.userId);
//             res.redirect('/admin?userName=' + user);
//         });
//     });
// }

module.exports = router;