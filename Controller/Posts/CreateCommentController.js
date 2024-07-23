const PostController = require("./PostController");
const {check} = require("express-validator");
module.exports = class CreateCommentController extends PostController {
    static rule = [
        check("text", "The text field is required").notEmpty(),
    ];
    async start() {
        let showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
        if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
        try {
            return this.response.json(await this.createComment());
        } catch (error) {
            console.error(error);
            this.setErrors([{msg: "Something went wrong"}]);
        }
    }
    async createComment() {
        const post = await this.getUser();
        const user = await this.getPost();
        const comment = {
            text: this.request.body.text,
            user: user.id,
            name: user.name,
        };
        post.comments.unshift(comment);
        await post.save();
        return post.comments;
    }
}