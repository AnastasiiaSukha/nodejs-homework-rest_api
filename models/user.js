const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi")

const { handleMongooseError } = require("../helpers");
const { string } = require("joi");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String,
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
     avatarURL: String,
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const userJoiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
})

const User = model("user", userSchema);

module.exports = {
    User,
    userJoiSchema,
}
