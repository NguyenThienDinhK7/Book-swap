const RouteHandler = require("./routeHandler");

const PORT = 5038;
const CONNECTION_STRING = "mongodb://localhost:27017/";
const DATABASE_NAME = "book_swap_dtb";

const routeHandler = new RouteHandler(PORT, CONNECTION_STRING, DATABASE_NAME);
routeHandler.startServer();
