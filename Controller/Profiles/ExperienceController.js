const UpdateObjectProfileController = require("./UpdateObjectProfileController");
const {check} = require("express-validator");
module.exports = class ExperienceController extends UpdateObjectProfileController {
    static rule = [
        check("title", "Title is required").notEmpty(),
        check("company", "Company is required").notEmpty(),
        check('from', 'From is required').notEmpty().custom((value,{req}) => req.body.to ? value > req.body.to : true),
    ];
    constructor(request, response) {
        super(request, response,'experience');
    }
}