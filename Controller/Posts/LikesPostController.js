const PostModel = require("../../Models/Post");
const Controller = require("../Controller");
module.exports = class LikesPostController extends Controller {
    async addLike() {
        try {
            const post = await PostModel.findById(this.request.params.id);
            if (this.userIsLikeInPost(post))
                return this.setErrors([{msg:"Like already in the post."}]);
            post.likes.unshift({user: this.request.user.id});
            await post.save();
            return this.response.json(post.likes);
        } catch (error) {
            console.error(error);
            return this.setErrors([{msg: "Something went wrong"}]);
        }
    }
    async disLike() {
        try {
            const post = await PostModel.findById(this.request.params.id);
            if (!this.userIsLikeInPost(post))
                return this.setErrors([{msg:"User isn't like in this post."}]);
            post.likes = post.likes.filter(like => like.user.toString() !== this.request.user.id);
            await post.save();
            return this.response.json(post.likes);
        } catch (error) {
            console.error(error);
            return this.setErrors([{msg: "Something went wrong"}]);
        }
    }
    userIsLikeInPost(post){
        return post.likes.some(like => like.user.toString() === this.request.user.id);
    }
}