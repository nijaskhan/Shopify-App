const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    },
    profilePic: {
        type: String,
        default: null
    }
},{
    timestamps: true
});

const User = mongoose.model("users", userSchema);

module.exports = User;