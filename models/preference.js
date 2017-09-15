import mongoose from 'mongoose';

const PreferenceSchema = new mongoose.Schema({
    preference_name: {
        type: String,
        required: true
    },
    sort_order: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

mongoose.model('Preference', PreferenceSchema);