const router = require('express').Router();
const userList = require('../views/userList');
const { Page, User } = require("../models");

router.get('/', async (req, res, next) => {
    try {
        const userArr = User.findAll();
        res.send(userList(userArr))
    } catch (err) {
        next(err);
    }
})



module.exports = router;