const { MongoClient } = require("mongodb");

class Database {
  constructor(connectionString, databaseName) {
    this.connectionString = connectionString;
    this.databaseName = databaseName;
    this.client = new MongoClient(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.database = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.database = this.client.db(this.databaseName);
      console.log("Connected to MongoDB");
      return true;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error('Failed to connect to MongoDB');
    }
  }

  getDb() {
    return this.database;
  }
}

module.exports = Database;
