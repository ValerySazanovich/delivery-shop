const articles = require('./articlesDatabase.json');

module.exports = {
  
  async up(db) {
    await db.collection("articles").insertMany(articles);
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  // async down(db, client) {
    
  // }
};
