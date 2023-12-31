const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@rebel1.qdzrayy.mongodb.net/myproject?retryWrites=true&w=majority';
let db = null;

// Function to connect to MongoDB
function connectToMongo(callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return callback(err);
    }
    console.log('Connected successfully to db server');
    // Set the 'db' variable to the connected database
    db = client.db('myproject');
    callback(null);
  });
}

// Call the connectToMongo function to establish the connection
connectToMongo((err) => {
  if (err) {
    // Handle the error, e.g., log it and exit the application
    console.error('Error establishing MongoDB connection:', err);
    process.exit(1);
  }

  // The MongoDB connection is established, you can now use 'db' in your other functions

  // create user account
  function create(name, email, password) {
    return new Promise((resolve, reject) => {
      const collection = db.collection('users');
      const doc = { name, email, password, balance: 0 };
      collection.insertOne(doc, { w: 1 }, function (err, result) {
        err ? reject(err) : resolve(doc);
      });
    });
  }

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};
});