const express = require("express");
const Auth = require("../Controller/Users/AuthUser");
const CreateProfileController = require("../Controller/Profiles/CreateProfileController");
const MeProfileController = require("../Controller/Profiles/MeProfileController");
const ProfilesController = require("../Controller/Profiles/ProfilesController");
const SearchProfileController = require("../Controller/Profiles/SearchProfileController");
const DeleteAccount = require("../Controller/DeleteAccount");
const UploadPhoto = require("../Controller/Profiles/UploadController");
const router = express.Router();

router.post("/",Auth,CreateProfileController.rule,async (req, res) => {
    let createProfileController = new CreateProfileController(req,res);
    await createProfileController.start();
});
router.get("/me",Auth,async (req, res) => {
    let meProfileController = new MeProfileController(req,res);
    await meProfileController.start();
});
router.get("/",Auth,async (req, res) => {
    let profilesController = new ProfilesController(req,res);
    await profilesController.start();
});
router.get("/user/:user_id",Auth,async (req, res) => {
    let searchProfileController = new SearchProfileController(req,res);
    await searchProfileController.start();
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
