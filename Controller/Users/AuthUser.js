const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function Auth(request, response, next) {
    try {
        const token = request.header('x-auth-token');
        if (!token) return response.status(401).json({errors: [{msg: "Token isn't available, authorization denied."}]})
        jwt.verify(token,config.get('jwtSecret'),(error,decode) => {
            if (error) return response.status(401).json({errors: [{msg: "Token isn't valid, authorization denied."}]})
            request.user = decode.user;
            next();
        });
    } catch (error) {
        console.error("error in AuthUser.js is: ",error);
        response.status(500).json({errors: [{msg: "error in authorization"}]});
    }
}