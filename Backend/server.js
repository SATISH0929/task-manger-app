const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./models");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);   

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

console.log("DB Config:", process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
