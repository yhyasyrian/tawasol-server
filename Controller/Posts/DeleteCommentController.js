const PostController = require("./PostController");
module.exports = class DeleteCommentController extends PostController {
    async start(){
        try {
            const post = await this.getPost();
            const user = await this.getUser();
            let currentComment = post.comments.find(comment => comment.id.toString() === this.request.params.commentId);
            if (!currentComment)
                return this.setErrors([{msg:"No comment found."}]);
            if (currentComment.user.toString() !== this.request.user.id)
                return this.setErrors([{msg:"You don't have permission to delete this comment."}],401);
            post.comments = post.comments.filter(comment => comment.id.toString() !== this.request.params.commentId);
            await post.save();
            return this.response.json(post.comments);
        } catch (error) {
            console.log(error);
            this.setErrors([{msg:"Could not delete comment"}]);
        }
    }
}