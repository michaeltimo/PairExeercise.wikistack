const router = require("express").Router();
const wikipage = require("../views/wikiPage");
const addpage = require("../views/addPage");
const { Page, User } = require("../models");
const { reset } = require("nodemon");
const main = require("../views/main");
let page;

router.post("/", async (req, res, next) => {
  try {
    // res.json(req.body);
    page = await Page.create({
      title: req.body.pageTitle,
      content: req.body.contentField,
      status: req.body.pageStatus,
    });
    user = await User.create({
      name: req.body.authorName,
      email: req.body.authorEmail,
    });

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  let arr = await Page.findAll();
  console.log("arr........", arr);
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
