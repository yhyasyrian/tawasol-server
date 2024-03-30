const Controller = require("../Controller");
const Profile = require("../../Models/Profile");
module.exports = class UpdateObjectProfileController extends Controller {
    constructor(request, response,field) {
        super(request, response);
        this.profile = undefined;
        this.field = field;
    }
    async store(){
        const showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
        if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
        try {
            await this.addArrayInObject();
            return this.response.json(this.profile);
        } catch (error) {
            console.error(error);
            this.setErrors([{msg:"Something went wrong"}]);
        }
    }
    async delete() {
        try {
            await this.removeArrayInObject();
            return this.response.json(this.profile);
        } catch (error) {
            console.error(error);
            this.setErrors([{msg:"Something went wrong"}]);
        }
    }
    async addArrayInObject() {
        const profile = await Profile.findOne({user: this.request.user.id});
        profile[this.field].unshift(this.request.body);
        this.profile = profile;
        await profile.save();
    }
    async removeArrayInObject() {
        const profile = await Profile.findOne({user: this.request.user.id});
        profile[this.field] = profile[this.field].filter(field => field._id.toString() !== this.request.params.id);
        this.profile = profile;
        await profile.save();
    }
}