const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "teacher", "student"],
    },
    subject: {
      type: String,
      required: function () {
        if (this.role === "teacher") {
          return true;
        }
        return false;
      },
    },
    rollno: {
      type: Number,
      required: function () {
        if (this.role === "student") {
          return true;
        }
        return false;
      },
    },
    clas: {
      type: Number,
      required: function () {
        if (this.role === "student") {
          return true;
        }
        return false;
      },
    },
    name: {
      type: String,
      required: [true, "name is require"],
    },
    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is require"],
    },
    isAdmin: {
      type: "Boolean",
      default:
        // false,
        function () {
          if (this.role === "admin") {
            return true;
          }
          return false;
        },
    },
    isTeacher: {
      type: Boolean,
      default:
        // false,
        function () {
          if (this.role === "teacher") {
            return true;
          }
          return false;
        },
    },
    isStudent: {
      type: Boolean,
      default:
        // false,
        function () {
          if (this.role === "student") {
            return true;
          }
          return false;
        },
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
