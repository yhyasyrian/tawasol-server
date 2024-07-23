const mongoose = require('mongoose');
const LikesSchema = [
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
        }
    }
];
const CommentsSchema = [
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
        },
        text:{
            type: String,
            required: true
        },
        name:{
            type: String,
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
];
const PostSchema = new mongoose.Schema({
   user:{
       type: mongoose.Schema.Types.ObjectId,
   },
    text:{
       type: String,
        required: true,
    },
    name:{
       type: String,
    },
    likes:LikesSchema,
    comments:CommentsSchema,
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Post', PostSchema);