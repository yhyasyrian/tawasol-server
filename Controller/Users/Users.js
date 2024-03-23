const UserModel = require("../../Models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
module.exports = class User {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    async findUser(objectSearch) {
        return await UserModel.findOne(objectSearch);
    }
    showErrorIsExistsOrFalse() {
        const errors = validationResult(this.request);
        if (!errors.isEmpty()) return this.setErrors(errors.array());
        return false;
    }
    setErrors(arrayErrors) {
        return this.response.status(500).json({ errors: arrayErrors });
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
};
