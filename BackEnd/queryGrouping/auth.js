const { ObjectId } = require("mongodb");
const Database = require("../connection");
const bcrypt = require("bcrypt");

class Auth {
  constructor(connectionString, databaseName) {
    this.db = new Database(connectionString, databaseName);
  }

  async checkAccountExistence(email) {
    try {
      await this.db.connect();
      const accounts = await this.db
        .getDb()
        .collection("Accounts")
        .find({ Email: email })
        .toArray();
      return accounts;
    } catch (error) {
      console.error("Error checking account existence:", error);
      throw new Error("Failed to check account existence");
    }
  }

  async signupHandle(email, password) {
    try {
      console.log("Received signup request:", email, password);
      const account = await this.checkAccountExistence(email);

      if (account.length === 0) {
        const saltRounds = 15;
        const hashedPass = bcrypt.hashSync(String(password), saltRounds);
        console.log(hashedPass);

        const Name = new Date().toISOString().replace(/[-T:\.Z]/g, "");

        const newAccountData = {
          AccountID: new ObjectId(),
          Email: email,
          Password: hashedPass,
          Name: Name,
          Avatar: "avt_default.jpg",
          CoverPhoto: "default_cov.jpg",
          AccountStatus: "offline",
          Role: "1",
        };

        await this.db.getDb().collection("Accounts").insertOne(newAccountData);

        return "success"; 
      } else {
        console.log(`Tài khoản tồn tại với email ${email}`);
        return "Tài khoản đã tồn tại!";
      }
    } catch (error) {
      return "error";
    }
  }

  async loginHandle(email, password) {
    try {
      console.log("Received login request:", email, password);
      const account = await this.checkAccountExistence(email);

      if (account.length === 0) {
        return "Tài khoản không tồn tại!";
      } else {
        const hashedPass = account[0].Password;

        let isMatch = await bcrypt.compare(password, hashedPass);
        if (isMatch) {
          return {Role: account[0].Role, AccountID: account[0].AccountID, Name: account[0].Name};
        } else {
          return "Sai mật khẩu!";
        }
      }
    } catch (error) {
      return "error";
    }
  }
}

module.exports = Auth;
