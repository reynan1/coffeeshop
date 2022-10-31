const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "Firstname is Required!"]
    },

    lastName: {
      type: String,
      required: [true, "Lastname is Required!"]
    },

    birthDay: {
      type: String,
      required: [true, "Birthday is Required"]
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is Required!"],

    },

    password: {
      type: String,
      required: [true, "Password is Required"]
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"]
    },

    createdOn: {
      type: Date,
      default: new Date()
    },

    transationHistory: [{
        transaction: {
          type: String,
          required: [true, "transaction Id is required"]
        },

        foodId: {
          type: String,
          required: [true, "food Id is required"]
        },

        createdOn: {
          type: Date,
          default: new Date()
        },

        status: {
          type: String,
          default: "pending"
        }

    }],

    transaction: [{
        foodId: {
          type: String,
          required: [true, "food Id is required"]
        },

        isPaid: {
          type: Boolean,
          default: false
        },

        paymentMethod: {
          type: String,
          default: "pending"
        },

        createdOn: {
          type: Date,
          default: new Date()
        }

    }],

    memberShipCard: [{
        cardId: {
          type: String,
          required: [true, ] 
        },

        dateOfMemberShip: {
          type: Date,
          default: new Date()
        },

        points: {
          type: Number,
          default: 0
        }
    }]

})

module.exports = mongoose.model("User", userSchema);