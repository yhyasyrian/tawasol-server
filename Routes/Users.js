const express = require("express");
const router = express.Router();
const CreateUser = require("../Controller/Users/CreateUser");
router.post("/register", CreateUser.rules, async (request, response) => {
    let userCreate = new CreateUser(request, response);
    await userCreate.start();
});

module.exports = router;
