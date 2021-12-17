const db = require('../db');

const logger = require('../log/logger');

class PageController{
  index(req, res, next){
    const page_number = req.params.page;
    db.queryByPageNumber(page_number).then(
      data => {
        res.render('index', { numItems: parseInt(page_number), product: data, user: "" });
      }
    );
  }
}

module.exports = new PageController();