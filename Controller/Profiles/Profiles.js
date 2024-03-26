const Controller = require("../Controller");
const ProfileModel = require("../../Models/Profile");
module.exports = class Profiles extends Controller {
    async start() {
        try {
            return this.response.json(await this.getProfiles());
        } catch (error) {
            console.error(error);
            this.response.status(500).json({errors: [{msg: "Something went wrong"}]});
        }
    }

    async getProfiles() {
        return ProfileModel.find().populate("user", ['name']);
    }
}