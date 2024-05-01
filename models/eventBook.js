const mongoose = require('mongoose')
const schema = mongoose.Schema;

const eventBookSchema = new schema({
    event_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'events'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"users"
    },
});

const EventBook = mongoose.model('EventBook', eventBookSchema);
module.exports = EventBook;