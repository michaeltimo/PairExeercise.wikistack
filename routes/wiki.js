const router = require("express").Router();
const wikipage = require("../views/wikiPage");
const addpage = require("../views/addPage");
const { Page, User } = require("../models");
const main = require("../views/main");

router.post("/", async (req, res, next) => {
  try {
    // res.json(req.body);
    const page = await Page.create(req.body);
    user = await User.findOrCreate({
        where: { name: req.body.authorName, email: req.body.authorEmail }
    })
    const authorId = user[0].dataValues.id;
    await page.setAuthor(authorId);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  let arr = await Page.findAll();
  const page = arr.map((element) => {
    return `<li><a href = "http://localhost:3000/wiki/${element.slug}">${element.title}</a></li>`;
  });
  res.send(main(page));
});

router.get("/add", (req, res, next) => {
  res.send(addpage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    // res.json(page);
    res.send(wikipage(page, page.authorName));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
