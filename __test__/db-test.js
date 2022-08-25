const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = null;

const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

const dropCollections = async () => {
  const promises = [];
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      promises.push(collection.remove());
    }
  }
  return Promise.all(promises);
};

module.exports = { connectDB, dropDB, dropCollections };