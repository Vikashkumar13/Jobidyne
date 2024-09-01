import mongoose from "mongoose";
//USER SCHEMA
const userSchema = new mongoose.Schema({

    fullname: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phoneNumber: { type: Number, required: true },

    password: { type: String, required: true, },

    role: { type: String, enum: ['student', 'recruiter'], required: true },

    profile: {
        profilePhoto: { type: String, default: "" },
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);