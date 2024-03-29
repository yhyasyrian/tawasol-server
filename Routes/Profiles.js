const express = require("express");
const Auth = require("../Controller/Users/AuthUser");
const CreateProfile = require("../Controller/Profiles/CreateProfile");
const MeProfile = require("../Controller/Profiles/MeProfile");
const Profiles = require("../Controller/Profiles/Profiles");
const SearchProfile = require("../Controller/Profiles/SearchProfile");
const DeleteAccount = require("../Controller/DeleteAccount");
const UploadPhoto = require("../Controller/Profiles/UploadController");
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
router.delete("/",Auth,async (req, res) => {
    let deleteAccountController = new DeleteAccount(req,res);
    await deleteAccountController.delete();
})
router.post("/upload",Auth,async (req, res) => {
    let uploadController = new UploadPhoto(req,res);
    await uploadController.upload();
})
module.exports = router;
