const UserModel = require("../../Models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require("express-validator");
module.exports = class {
    static rules = [
        check("name", "The field name is required").notEmpty(),
        check("email", "The format email is incorrect").notEmpty().isEmail(),
        check(
            "password",
            "The field password is required and minlength is 6 characters"
        )
            .notEmpty()
            .isLength({ min: 6 }),
    ];
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    async start() {
        let showErrorIsExistsOrVoid = this.showErrorIsExistsOrVoid();
        if (showErrorIsExistsOrVoid) return showErrorIsExistsOrVoid;
        const { name, email, password } = this.request.body;
        try {
            let checkIfUserIsExistsOrVoid =
                await this.checkIfUserIsExistsOrVoid({ email });
            if (checkIfUserIsExistsOrVoid) return checkIfUserIsExistsOrVoid;
            let user = this.createUserWithGetResult({ name, email, password });
            await this.createTokenAndSetResponse(user.id);
        } catch (error) {
            console.error(error);
            return this.setErrors([{ msg: "Server Error" }]);
        }
    }
    showErrorIsExistsOrVoid() {
        const errors = validationResult(this.request);
        if (!errors.isEmpty()) return this.setErrors(errors.array());
        return false;
    }
    async checkIfUserIsExistsOrVoid({ email }) {
        let user = await UserModel.findOne({ email });
        if (user) return this.setErrors([{ msg: "User already exists" }]);
        return false;
    }
    async createUserWithGetResult({ name, email, password }) {
        let user = new UserModel({ name, email, password });
        const slat = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, slat);
        await user.save();
        return user;
    }
    createPayload(idUser) {
        return {
            user: { id: idUser },
            expiresIn: "2 days",
        };
    }
    createTokenAndSetResponse(idUser) {
        jwt.sign(
            this.createPayload(idUser),
            config.get("jwtSecret"),
            (error, token) => {
                if (error) throw error;
                else return this.response.json({ token });
            }
        );
    }
    setErrors(arrayErrors) {
        return this.response.status(500).json({ errors: arrayErrors });
    }
};
