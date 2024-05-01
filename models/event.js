const mongoose = require('mongoose')
const schema = mongoose.Schema;

const eventSchema = new schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
    },
    venue: {
        type: String,
    },
    available_tickets: {
        type: Number,
    },
    status:{
        type:Number,
        default:1,
        comment:"1=active, 0 inactive"
    }

});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;