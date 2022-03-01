const db = require("../utils/database");

// db.getConnection((err, conn) => {
//   try {
//     conn.execute(
//       `SET @value = ?`,
//       [ undefined ], // bad value
//       (error, resultList, fieldList) => console.log('[testError] from callback:', { error, resultList, fieldList })
//     )
//   } catch(e) {
//     console.log('this is expected: ', e);
//   }
// })

module.exports = class Order {
  constructor(
    type,
    weight,
    length,
    width,
    user,
    alternateNo,
    pickupAddress,
    dropAddress,
  ) {
    this.type = type;
    this.weight = weight;
    this.length = length;
    this.width = width;
    this.user = user;
    this.alternateNo = alternateNo;
    this.pickupAddress = pickupAddress;
    this.dropAddress = dropAddress;
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM orders`);
  }

  static save(orders) {
    console.log("hello");
    return db.execute(
        `INSERT INTO orders (type, weight, length, width, user, alternateNo, pickupAddress, dropAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [orders.type, orders.weight, orders.length, orders.width, orders.user, orders.alternateNo, orders.pickupAddress, orders.dropAddress]
      );
    
  }

  static fetchOrder(id) {
    return db.execute(`SELECT * FROM orders WHERE id = ?`, [id]);
  }
};
