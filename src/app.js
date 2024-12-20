const config = require("./config");
const express = require("express");
const cors = require("cors");
const path = require("path");

const { engine } = require("express-handlebars");

const swaggerUI = require("swagger-ui-express");

const router = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const userService = require("./services/user.service");
const swagger = require("./swagger");

require("./database");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("bypass-tunnel-reminder", "true");
  res.setHeader("Content-Security-Policy", "default-src *; font-src *;");
  next();
});
app.use(express.json());

app.use("/api", router);

// Template Engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

const viewPath = path.join(__dirname, "./views");
app.set("views", viewPath);

app.get("/", async (req, res) => {
  let list = await userService.list();
  res.render("home", {
    name: req.query.name,
    users: list,
  });
});

// Static Path
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Swagger UI
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swagger));

// Error handling
app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Application is running on http://localhost:${config.port}`);
});
