const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Book = require("./queryGrouping/book");
const Auth = require("./queryGrouping/auth");

class RouteHandler {
  constructor(port, connectionString, databaseName) {
    this.port = port;
    this.connectionString = connectionString;
    this.databaseName = databaseName;
    this.book = new Book(connectionString, databaseName);
    this.auth = new Auth(connectionString, databaseName);

    this.app = express();

    this.setupMiddleware();
    this.setupRoutes();
  }

  async startServer() {
    try {
      await this.book.db.connect();
      this.app.listen(this.port, () => {
        console.log(`Server running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error("Error starting server:", error);
    }
  }

  setupMiddleware() {
    const corsOptions = {
      origin: "http://localhost:5173", // URL of React app
      credentials: true, // To allow credentials (cookies, headers)
    };
    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser("hello"));
    this.app.use(
      session({
        secret: "n98h8H*V*G(8vV*&Fv*7F^&c7TCX6C&tvUb*&G7ytvY*f&tc^7cVUvy7TcTvc",
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false, // Ensure secure is false for HTTP; set true for HTTPS
          httpOnly: true,
          maxAge: 60000 * 60,
        },
      })
    );

    this.app.use((req, res, next) => {
      req.session.visited = true;
      if (req.sessionStore && req.session.id) {
        req.sessionStore.get(req.session.id, (err, session) => {
          if (err) {
            console.error("Error getting session:", err);
          } else {
            console.log("Session data:", session);
          }
          next(); // Proceed to the next middleware/route handler
        });
      } else {
        next(); // Proceed to the next middleware/route handler
      }
    });
  }

  setupRoutes() {
    this.app.get("/api/books", async (req, res) => {
      try {
        const books = await this.book.getAllBooks();
        console.log(req.session.id);
        res.json(books);
      } catch (error) {
        console.error("Error getting all books:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    this.app.get("/api/session", (req, res) => {
      // Check if session data exists and return it
      if (req.session.userData) {
        res.json({ sessionData: req.session.userData });
      } else {
        res.status(404).json({ message: "No session data found" });
      }
    });

    this.app.get("/api/books/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const book = await this.book.getBookById(id);
        if (!book) {
          res.status(404).json({ error: `Book with id ${id} not found` });
          return;
        }
        res.json(book);
      } catch (error) {
        console.error(`Error fetching book with id ${id}:`, error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Auth ====================================================================================

    // Signup
    this.app.post("/api/signup", async (req, res) => {
      const { email, pass } = req.body;
      console.log(req);

      try {
        const auth = await this.auth.signupHandle(email, pass);
        res.json({ message: auth });
      } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Login
    this.app.post("/api/login", async (req, res) => {
      const { email, pass } = req.body;
      console.log("Session ID before login:", req.session.id);
      try {
        const auth = await this.auth.loginHandle(email, pass);
        console.log("Session ID after login:", req.session.id);

        // Store data in the session
        req.session.userData = auth;

        // Save session data
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          // Retrieve session data
          req.sessionStore.get(req.session.id, (err, session) => {
            if (err) {
              console.error("Error retrieving session:", err);
            } else {
              console.log("Retrieved session data:", session);
            }
          });

          res.json({
            message:
              auth.Role === "1"
                ? "client"
                : auth.Role === "2"
                ? "admin"
                : auth,
          });
        });
      } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // ======================================================================================
  }
}

module.exports = RouteHandler;
