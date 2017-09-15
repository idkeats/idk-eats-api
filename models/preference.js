import mongoose from 'mongoose';

const PreferenceSchema = new mongoose.Schema({
    preference_name: {
        type: String,
        required: true
    }
});

mongoose.model('Preference', PreferenceSchema);