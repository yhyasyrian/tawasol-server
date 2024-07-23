const Controller = require("../Controller");
const PostModel = require("../../Models/Post");
const UserModel = require("../../Models/User");
module.exports = class PostController extends Controller {
    async getPost() {
        return PostModel.findById(this.request.params.id);
    }

    async getUser() {
        return UserModel.findById(this.request.user.id).select("-password")
    }
}