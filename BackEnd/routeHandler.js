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
    // Cấu hình CORS
    const corsOptions = {
      origin: 'http://localhost:5173', // URL của React app
      credentials: true // Để cho phép credentials (cookie, header)
    };
    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser("hello"));
    this.app.use(session({
      secret: 'n98h8H*V*G(8vV*&Fv*7F^&c7TCX6C&tvUb*&G7ytvY*f&tc^7cVUvy7TcTvc',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // chỉnh lại khi đi vào https
        httpOnly: true,
        maxAge: 60000 // 1 phút để kiểm tra
      }
    }));
    

    // Middleware để thiết lập session.visited và sessionStore.get(session.id)
    this.app.use((req, res, next) => {
      req.session.visited = true;
      if (req.sessionStore && req.session.id) {
        req.sessionStore.get(req.session.id, (err, session) => {
          if (err) {
            console.error("Error getting session:", err);
          } else {
            console.log("Session data:", session);
          }
          next(); // Chuyển sang middleware/route handler tiếp theo
        });
      } else {
        next(); // Chuyển sang middleware/route handler tiếp theo
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

    this.app.get('/api/session', (req, res) => {
      res.json({ session: req.session });
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
      try {
        const auth = await this.auth.loginHandle(email, pass);
        console.log(req.session.id);
        //res.json({ message: auth === "1" ? "client" : "admin" });
      } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // ======================================================================================
  }
}

module.exports = RouteHandler;
