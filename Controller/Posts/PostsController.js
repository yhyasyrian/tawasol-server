const PostModel = require("../../Models/Post");
const Controller = require("../Controller");
module.exports = class PostsController extends Controller {
    async start() {
        try {
            return this.response.json(await this.getPosts());
        } catch (error) {
            console.error(error);
            return this.setErrors([{msg: "Something went wrong"}]);
        }
    }
    async getPosts() {
        return await PostModel.find().sort({date: -1});
    }
}