const express = require("express");
const router = express.Router();
const CreateUser = require("../Controller/Users/CreateUser");
const LoginUser = require("../Controller/Users/LoginUser");
router.post("/register", CreateUser.rules, async (request, response) => {
    let userCreate = new CreateUser(request, response);
    await userCreate.start();
});
router.post("/login", LoginUser.rules, async (request, response) => {
    let userCreate = new LoginUser(request, response);
    await userCreate.start();
});

module.exports = router;
