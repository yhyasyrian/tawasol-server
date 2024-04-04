const {validationResult} = require("express-validator");
module.exports = class Controller {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    showErrorIsExistsOrFalse() {
        const errors = validationResult(this.request);
        if (!errors.isEmpty()) return this.setErrors(errors.array());
        return false;
    }
    setErrors(arrayErrors,statusCode = 500) {
        return this.response.status(statusCode).json({ errors: arrayErrors });
    }
}