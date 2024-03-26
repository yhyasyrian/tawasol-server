const express = require("express");
const Auth = require("../Controller/Users/AuthUser");
const CreateProfile = require("../Controller/Profiles/CreateProfile");
const MeProfile = require("../Controller/Profiles/MeProfile");
const Profiles = require("../Controller/Profiles/Profiles");
const SearchProfile = require("../Controller/Profiles/SearchProfile");
const router = express.Router();

router.post("/",Auth,CreateProfile.rule,async (req, res) => {
    let createProfileController = new CreateProfile(req,res);
    await createProfileController.start();
});
router.get("/me",Auth,async (req, res) => {
    let MeProfileController = new MeProfile(req,res);
    await MeProfileController.start();
});
router.get("/",Auth,async (req, res) => {
    let ProfilesController = new Profiles(req,res);
    await ProfilesController.start();
});
router.get("/user/:user_id",Auth,async (req, res) => {
    let SearchProfileController = new SearchProfile(req,res);
    await SearchProfileController.start();
});
module.exports = router;
