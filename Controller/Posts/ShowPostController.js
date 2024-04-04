const PostModel = require("../../Models/Post");
const Controller = require("../Controller");
module.exports = class ShowPostsController extends Controller {
    async index() {
        try {
            return this.response.json(await this.getPost());
        } catch (error) {
            console.error(error);
            return this.setErrors([{msg: "Something went wrong"}]);
        }
    }
    async getPost() {
        return await PostModel.findById(this.request.params.id);
    }
}