const Controller = require("../Controller");
const ProfileModel = require("../../Models/Profile");
module.exports = class SearchProfileController extends Controller {
    async start() {
        try {
            return this.response.json(await this.getProfile());
        } catch (error) {
            console.error(error);
            if (error.message === "No profile found")
                return this.response.status(400).json({errors: [{msg: "profile not found"}]});
            this.response.status(500).json({errors: [{msg: "Something went wrong"}]});
        }
    }

    async getProfile() {
        const profile = await ProfileModel.findOne({
            user: this.request.params.user_id,
        }).populate("user", ['name']);
        if (!profile)
            throw new Error("No profile found");
        return profile;
    }
}