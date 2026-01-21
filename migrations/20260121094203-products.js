const products = require('./productsDatabase.json');

module.exports = {
  
  async up(db) {
    await db.collection("products").insertMany(products);
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  
  // async down(db, client) {
    
  // }
};
