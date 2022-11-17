const router = require('express').Router();
const wikipage = require("../views/wikiPage");
const addpage = require('../views/addPage');
const { Page, User } = require('../models');

let page;

router.post('/', async (req, res, next) => {
    try {
        // res.json(req.body);
        page = await Page.create({
            title: req.body.pageTitle,
            content: req.body.contentField,
            status: req.body.pageStatus
        })
        user = await User.create({
            name: req.body.authorName,
            email: req.body.authorEmail
        })
        
        res.redirect('/');
    } catch(err) {
        next(err);
    }
});

router.get('/', (req, res, next) => {
    console.log(user);
    res.send(wikipage(Page, Page.authorName));
  });
  
  router.get('/add', (req, res, next) => {
    res.send(addpage());
  });

module.exports = router;