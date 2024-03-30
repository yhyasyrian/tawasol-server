const multer = require('multer');
const Controller = require('../Controller');
const {check} = require("express-validator");
module.exports = class UploadController extends Controller {
    static rule = [
        check("photo","photo is required").notEmpty(),
    ];
    constructor(request,response) {
        super(request,response);
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/public/uploads')
            },
            filename: function (req, file, cb) {
                cb(null, req.user.id)
            }
        })
    }
    async upload() {
        let upload = multer({storage: this.storage}).single('');
        await upload(this.request,this.response, async (error) => {
            if (error)
                this.setErrors("Error in upload");
            else
                this.response.json({ok:true,des:"hi"});
        })
    }
}