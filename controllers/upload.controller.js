const express = require('express');
const path = require('path');
const multer = require('multer');

const max_size = 100 * 1024 * 1024; // 100MB

const logger = require('../log/logger');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, path.join(__dirname, '/../upload/'))
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: max_size },
    fileFilter: function(req, file, cb) {

        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the " +
            "following filetypes - " + filetypes);
    }

    // mypic is the name of file attribute
}).array('uppic', 20);

class UploadController {

    index(req, res, next) {
        res.render('upload');
    }

    post(req, res, next) {
        upload(req, res, function(err) {
            if (err) {
                res.send(err);
            } else {
                logger.info('Upload successfully!')
                res.redirect('/');
            }
        });
    }
}

module.exports = new UploadController();