const PostController = require("./PostController");
const PostModel = require("../../Models/Post");
const req = require("express/lib/request");
module.exports = class DeletePostController extends PostController {
    async start() {
        try {
            const post = await this.getPost();
            if (!post)
                return this.setErrors([{msg:"No such post"}]);
            if (post.user.toString() !== this.request.user.id)
                return this.setErrors([{msg:"You don't have permission to delete this post."}],401);
            await post.deleteOne();
            return this.response.json({ok:true});
        } catch (error) {
            console.error(error);
            this.response.send(error.message)
            // return this.setErrors([{msg:"Unable to delete post"}]);
        }
    }
}
