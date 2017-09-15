import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: String,
    preferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Preference'
    }]
});

mongoose.model('User', UserSchema);