const UserMode = require('../../Models/User');
module.exports = async(request,response) => {
    let user = await UserMode.findById(request.user.id).select('-password');
    return response.json(user);
}