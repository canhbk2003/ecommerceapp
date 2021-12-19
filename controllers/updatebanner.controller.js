const express = require('express');
const path = require('path');
const multer = require('multer');

const max_size = 100 * 1024 * 1024; // 100MB

const logger = require('../log/logger');
var idx = 1;

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, path.join(__dirname, '/../public/banner/'))
    },
    filename: function(req, file, cb) {
        var file_ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + (idx++).toString() + '.' + file_ext);
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
}).array('banner', 5);

class UpdateBannerController {
    get(req, res, next) {
      console.log('upload banner index');
      res.render('uploadbanner');
    }

    post(req, res, next) {
      upload(req, res, function(err) {
          if (err) {
              res.send(err);
          } 
          else {
              logger.info('Upload successfully!')
              res.redirect('/');
          }
      });
    }
}

module.exports = new UpdateBannerController();