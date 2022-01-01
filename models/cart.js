//   class Cart{
//     constructor (oldCart){
//       if (oldCart instanceof Cart){
//         this.items = oldCart.items || {};
//         this.totalQty = oldCart.totalQty || 0;
//         this.totalPrice = oldCart.totalPrice || 0;
//       }
//       else{
//         this.items = {};
//         this.totalQty = 0;
//         this.totalPrice = 0;
//       }
//     }

//     add = function(item, id) {
//         let storedItem = this.items[id];
//         if (!storedItem) {
//             storedItem = this.items[id] = {item: item, qty: 0, price: 0};
//         }
//         storedItem.qty++;
//         storedItem.price = storedItem.item.price * storedItem.qty;
//         this.totalQty++;
//         this.totalPrice += storedItem.item.price;
//     };

//     reduceByOne = function(id) {
//         this.items[id].qty--;
//         this.items[id].price -= this.items[id].item.price;
//         this.totalQty--;
//         this.totalPrice -= this.items[id].item.price;

//         if(this.items[id].qty <= 0) {
//             delete this.items[id];
//         }
//     };

//     removeItem = function(id) {
//         this.totalQty -= this.items[id].qty;
//         this.totalPrice -= this.items[id].price;
//         delete this.items[id];
//     };

//     generateArray = function () {
//         const arr = [];
//         for (let id in this.items) {
//             arr.push(this.items[id]);
//         }
//         return arr;
//     };
// }

// module.exports = new Cart();

module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
      let storedItem = this.items[id];
      if (!storedItem) {
          storedItem = this.items[id] = {item: item, qty: 0, price: 0};
      }
      storedItem.qty++;
      if(storedItem.item.bonusPrice> 0){
        storedItem.price = storedItem.item.bonusPrice * storedItem.qty;
      }
      else{
        storedItem.price = storedItem.item.price * storedItem.qty;
      }
      
      this.totalQty++;
      this.totalPrice += storedItem.price;
  };

  this.reduceByOne = function (id) {
      this.items[id].qty--;
      // check xem co phai dang tinh gia da khuyen mai khong
      if(this.items[id].item.bonusPrice > 0){
        this.items[id].price -= this.items[id].item.bonusPrice;
      }
      else{
        this.items[id].price -= this.items[id].item.price;
      }
      this.totalQty--;
      this.totalPrice -= this.items[id].price;

      if(this.items[id].qty <= 0) {
          delete this.items[id];
      }
  };

  this.removeItem = function (id) {
      this.totalQty -= this.items[id].qty;
      this.totalPrice -= this.items[id].price;
      delete this.items[id];
  };

  this.generateArray = function () {
      const arr = [];
      for (let id in this.items) {
          arr.push(this.items[id]);
      }
      return arr;
  };
};

