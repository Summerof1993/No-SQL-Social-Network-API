const { Schema, Types, SchemaType } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            }
        },
        thoughts: [
            {
                type: SchemaTypes.objectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: SchemaTypes.objectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual("friendCount")
    .get(function () {
        return this.friends.length;
    })

const User = model("User", userSchema);

module.exports = User;