const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        // match: /^[0-9\s-()]{7,15}$/,
      },
    avatar: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin', 'superadmin'],
    },
    level: {
        type: String,
        enum: ['basic', 'pro', 'business'],
        default: 'basic',
    },
    signupMethod: {
        type: String,
        required: true,
        enum: ['traditional', 'google', 'facebook'],
        default: 'traditional',
    },
    refreshtoken: {},
    canReceiveJoinRequestForWorkSpace: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Pre-save middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Add a method to compare passwords
UserSchema.methods.isMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
