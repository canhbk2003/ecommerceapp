const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

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

    // bn is the name of file attribute
}).array('bn', 10);

var verify = function(){
    // count all file, if < 10 files -> make copy
    var folder_name = path.join(__dirname, '/public/banner/');
    var files = fs.readdirSync(folder_name);

    const len = files.length;
    if(len<10){
        // copy
        for(var i=len;i<10;i++){
            var file_ext = files[i].split('.').pop();
            fs.copyFile(files[i], `bn-${i}.file_ext`, err => {
                if(err) throw err;
            });
        }
    }
}

class UpdateBannerController {
    get(req, res, next) {
      res.render('uploadbanner');
    }

    post(req, res, next) {
      upload(req, res, function(err) {
          if (err) {
              res.send(err);
          } 
          else {
              logger.info('Upload successfully!')
              res.redirect('/uploadnotify');
          }
      });
    }
}

module.exports = new UpdateBannerController();