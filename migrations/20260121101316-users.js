const users = require('./usersDatabase.json');

module.exports = {
  
  async up(db) {
    await db.collection("users").insertMany(users);
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  // async down(db, client) {
    
  // }
};
