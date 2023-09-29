const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        eventImg: {
            type: String,
            default: "https://images6.alphacoders.com/112/1129290.jpg"
        },
        eventDate: {
            type: Date,
        },

        attendees: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        city: {
            type: String,
            required: true
        },

        location: {
            type: {
                type: String,
            },
            coordinates: {
                type: [Number]
            },
        },
    },
    {
        timestamps: true
    }
);

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;
