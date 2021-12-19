const db = require('../db');

const logger = require('../log/logger');

class PageController{
  index(req, res, next){
    var _numitems;
    db.QueryAllProduct().then(data_ => {
      _numitems = data_.length / 9;
      if (_numitems < 1) {
          _numitems = 1;
      }
      _numitems = _numitems + 1;
    });

    const page_number = req.params.page;
    db.queryByPageNumber(page_number).then(
      data => {
        res.render('index', { numItems: parseInt(_numitems), product: data, user: "" });
      }
    );
  }
}

module.exports = new PageController();