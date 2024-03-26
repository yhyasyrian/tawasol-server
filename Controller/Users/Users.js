const UserModel = require("../../Models/User");
const Controller = require("../Controller");
const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = class User extends Controller {
    async findUser(objectSearch) {
        return UserModel.findOne(objectSearch);
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
