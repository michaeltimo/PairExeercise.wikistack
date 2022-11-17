const morgan = require("morgan");
const express = require("express");
const app = express();
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

db.authenticate().then(() => {
  console.log("connected to the database");
});

const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();



app.get("/", async (req, res, next) => {
  try {
    res.redirect('/wiki');
  } catch (error) {
    next(error);
  }
});


const PORT = 3000;
