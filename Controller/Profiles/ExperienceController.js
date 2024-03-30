const Controller = require("../Controller");
const {check} = require("express-validator");
const Profile = require("../../Models/Profile");
module.exports = class ExperienceController extends Controller {
    static rule = [
        check("title", "Title is required").notEmpty(),
        check("company", "Company is required").notEmpty(),
        check('from', 'From is required').notEmpty().custom((value,{req}) => req.body.to ? value > req.body.to : true),
    ];
    async start(){
        const showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
        if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
        try {
            await this.addExperience();
            return this.response.json({ok:true});
        } catch (error) {
            console.error(error);
            this.setErrors([{msg:"Something went wrong"}]);
        }
    }
    async addExperience() {
        const profile = await Profile.findOne({user: this.request.user.id});
        profile.experience.unshift(this.request.body);
        await profile.save();
    }
}