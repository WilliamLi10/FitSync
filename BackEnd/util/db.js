const mongodb = require("mongodb");
const client = mongodb.MongoClient;

let _db;

const connection = (callback) => {
  client
    .connect(
      "mongodb+srv://jia:R7cTT0wC4ZtXIb7g@cluster0.1getoho.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.connection = connection;
exports.getDb = getDb;
