const Controller = require("../Controller");
const PostModel = require("../../Models/Post");
const UserModel = require("../../Models/User");
const {check} = require("express-validator");
module.exports = class CreatePostController extends Controller {
    static rule = [
        check('text','Post is required').notEmpty(),
    ];
    async start() {
        let showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
        if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
        try {
            return this.response.json(await this.createPost());
        } catch (error) {
            console.error(error);
            return this.setErrors([{msg:"Sorry there was an error"}]);
        }
    }
    async createPost() {
        const user = await UserModel.findById(this.request.user.id).select("name");
        return await PostModel.create({
            user: this.request.user.id,
            name: user.name,
            text: this.request.body.text
        });
    }
}