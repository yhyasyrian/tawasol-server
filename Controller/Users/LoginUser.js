const UserModel = require("../../Models/User");
const bcryptjs = require("bcryptjs");
const { check } = require("express-validator");
const User = require("./Users");
module.exports = class CreateUder extends User {
    static rules = [
        check("email", "The format email is incorrect").isEmail(),
        check(
            "password",
            "The field password is required and minlength is 6 characters"
        ).isLength({ min: 6 }),
    ];
    constructor(request, response) {
        super(request, response);
        this.user = undefined;
    }
    async start() {
        let showErrorIsExistsOrFalse = this.showErrorIsExistsOrFalse();
        if (showErrorIsExistsOrFalse) return showErrorIsExistsOrFalse;
        const { email, password } = this.request.body;
        try {
            let checkIfUserIsExistsOrStopReponse =
                await this.checkIfUserIsExistsOrStopReponse({ email });
            if (checkIfUserIsExistsOrStopReponse)
                return checkIfUserIsExistsOrStopReponse;
            let checkIfPasswordCorrectOrStopResponse =
                await this.checkIfPasswordCorrectOrStopResponse(password);
            if (!checkIfPasswordCorrectOrStopResponse)
                return checkIfPasswordCorrectOrStopResponse;
            else return this.createTokenAndSetResponse(this.user.id);
        } catch (error) {
            console.error(error);
            return this.setErrors([{ msg: "Server Error" }]);
        }
    }
    async checkIfPasswordCorrectOrStopResponse(password) {
        if (await this.isPasswordValidation(password)) return true;
        return this.setErrors([{ msg: "User isn't available" }]);
    }
    async isPasswordValidation(password) {
        return await bcryptjs.compare(password, this.user.password);
    }
    async checkIfUserIsExistsOrStopReponse({ email }) {
        let user = await this.findUser({ email });
        if (!user) return this.setErrors([{ msg: "User isn't available" }]);
        this.user = user;
        return false;
    }
};
