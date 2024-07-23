const UpdateObjectProfileController = require("./UpdateObjectProfileController");
const {check} = require("express-validator");
module.exports = class EducationController extends UpdateObjectProfileController {
    static rule = [
        check("school", "School is required").notEmpty(),
        check("degree", "Degree is required").notEmpty(),
        check('from', 'From is required').notEmpty().custom((value,{req}) => req.body.to ? value > req.body.to : true),
    ];
    constructor(request, response) {
        super(request, response,'education');
    }
}