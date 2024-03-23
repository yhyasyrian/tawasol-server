const UserModel = require("../../Models/User");
const bcryptjs = require("bcryptjs");
const { check } = require("express-validator");
const User = require("./Users");
module.exports = class CreateUder extends User {
    static rules = [
        check("name", "The field name is required").notEmpty(),
        check("email", "The format email is incorrect").isEmail(),
        check(
            "password",
            "The field password is required and minlength is 6 characters"
        ).isLength({ min: 6 }),
    ];
    async start() {
        let showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
        if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
        const { name, email, password } = this.request.body;
        try {
            let checkIfUserIsNotExistsOrStopReponse =
                await this.checkIfUserIsNotExistsOrStopReponse({ email });
            if (checkIfUserIsNotExistsOrStopReponse)
                return checkIfUserIsNotExistsOrStopReponse;
            let user = this.createUserWithGetResult({ name, email, password });
            await this.createTokenAndSetResponse(user.id);
        } catch (error) {
            console.error(error);
            return this.setErrors([{ msg: "Server Error" }]);
        }
    }
    async createUserWithGetResult({ name, email, password }) {
        let user = new UserModel({ name, email, password });
        const slat = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, slat);
        await user.save();
        return user;
    }
    async checkIfUserIsNotExistsOrStopReponse({ email }) {
        let user = await this.findUser({ email });
        if (user) return this.setErrors([{ msg: "User already exists" }]);
        return false;
    }
};
