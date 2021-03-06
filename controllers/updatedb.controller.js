const express = require('express');
const fs = require('fs');
const path = require('path');
const Image = require('../models/upload');
const db = require('../db');
const logger = require('../log/logger');

class UpdateDbController {
    index(req, res, next) {
        logger.info('update index page');
        res.render('updatedb');
    }
    post(req, res, next) {
        logger.info('update db post');
        // Duyet tat ca cac file co trong thu muc uploads
        var folder_name = path.join(__dirname, '/../upload/');
        var files = fs.readdirSync(folder_name);
        
        for (var i = 0; i < files.length; i++) {
            logger.debug(files[i]);
        }
        db.Upload(files).then(() => {
            res.render('uploaddbnotify');
        });
    }
}

module.exports = new UpdateDbController();