const { url } = require("inspector");
const { Schema, model } = require("mongoose");
const { object } = require("webidl-conversions");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      default: "gamer"
    },

    avatarImg: {
      type: String,
      default: "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    },

    aboutMe: {
      type: String,
    },
    role: {
      type: String,
      enum: ['USER', 'ME', 'ADMIN'],
      default: 'USER'
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
