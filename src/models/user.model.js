import mongoose from "mongoose";
import uuid from 'node-uuid';

const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v4 },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        android_device_token: {
            type: String
        },
        iphone_device_token: {
            type: String
        },
        dog_name_1: {
            type: String
        },
        dog_name_2: {
            type: String
        },
        dog_name_3: {
            type: String
        },
        auth_token: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: ''
        }

    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
