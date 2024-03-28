const { Schema, Types, SchemaType } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
        type: SchemaType.objectId,
        default: new objectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
        },
    }
);

module.exports = reactionSchema;