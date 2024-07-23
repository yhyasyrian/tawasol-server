const Controller = require("./Controller");
const ProfileModel = require("./../Models/Profile");
const UserModel = require("./../Models/User");
const PostModel = require("./../Models/Post");
module.exports = class DeleteAccount extends Controller {
    constructor(request, response) {
        super(request,response);
        this.error = '';
    }
    async deletePost(){
        return PostModel.deleteMany({user:this.request.user.id});
    }
    async deleteProfile() {
        return ProfileModel.findOneAndDelete({user:this.request.user.id});
    }
    async deleteUser() {
        console.log(await UserModel.findByIdAndDelete(this.request.user.id));
        return UserModel.findByIdAndDelete(this.request.user.id);
    }
    async delete() {
        await Promise.all([
            this.deletePost(),
           this.deleteProfile(),
           this.deleteUser(),
        ]).catch((err) => this.error = err);
        if (this.error.length > 0) {
            console.error(err);
            this.setErrors("Error deleting the user");
        } else {
            this.response.json({ok:true});
        }
    }
}