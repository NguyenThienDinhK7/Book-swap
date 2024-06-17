const { ObjectId } = require("mongodb");
const Database = require("../connection");

class Book {
  constructor(connectionString, databaseName) {
    this.db = new Database(connectionString, databaseName);
  }

  async getAllBooks() {
    try {
      await this.db.connect();
      const books = await this.db.getDb().collection("Books").find({}).toArray();
      return books;
    } catch (error) {
      console.error('Error fetching all books:', error);
      throw new Error('Failed to fetch all books');
    }
  }

  async getBookById(id) {
    try {
      await this.db.connect();
      const book = await this.db.getDb().collection("Books").findOne({ _id: ObjectId(id) });
      return book;
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw new Error(`Failed to fetch book with id ${id}`);
    }
  }
}

module.exports = Book;
