const Controller = require("../Controller");
const ProfileModel = require("../../Models/Profile");
const {check} = require("express-validator");
const normalize = require("normalize-url");
module.exports = class CreateProfileController extends Controller {
    static rule = [
        check('status', 'The field status is required').notEmpty(),
        check('skills', 'The field skills is required').notEmpty(),
    ];

    async start() {
        try {
            let showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
            if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
            return this.response.json(await this.createProfileOrUpdate());
        } catch (error) {
            console.error(error);
            return this.response.status(500).json({errors: [{msg: "Something went wrong"}]});
        }
    }

    async createProfileOrUpdate() {
        return ProfileModel.findOneAndUpdate(
            {user: this.request.user.id},
            {$set: this.createProfileObject()},
            {new: true, upsert: true}
        );
    }

    createProfileObject() {
        const {
            website,
            skills,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
            github,
            ...rest
        } = this.request.body;
        return {
            user: this.request.user.id,
            website: website && website !== '' ? normalize(website) : '',
            skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
            social: this.prefixSocialMedia({youtube, twitter, instagram, linkedin, facebook, github}),
            ...rest
        };
    }

    prefixSocialMedia({youtube, twitter, instagram, linkedin, facebook, github}) {
        const socialMedia = {youtube, twitter, instagram, linkedin, facebook, github};
        for (const social in socialMedia) {
            const value = socialMedia[social];
            if (value && value !== "")
                socialMedia[social] = normalize(value, {forceHttps: true});
        }
        return socialMedia;
    }
}