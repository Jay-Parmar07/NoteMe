const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },

        picture: {
            type: String,
            required: true,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVmVQtVtFAjfIwK3RXlgrizkP_Hhuex3OUcBAGqzw0GdsoPk-fEtetBn0&s",
        },
    },
    {
        timestamps: true,
    }
);
//above is our user schema

// this is a mongoose middleware that will hash the password before saving the user to the databasenand encryting the password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}
);

// now this function will compare the entered password with the hashed password in the database and decrypt it
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User; 