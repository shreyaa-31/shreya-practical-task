const bcrypt = require('bcrypt');
const User = require('../models/user');
const Event = require('../models/event');
const EventBook = require('../models/eventBook');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');


async function register(req, res) {
    try {
        const { username, email, name, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});

            return res.status(400).json({ errors: formattedErrors });
        }


        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            name: name,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});

            return res.status(400).json({ errors: formattedErrors });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'shreya313', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getEvents(req, res) {
    try {

        const events = await Event.find({ status: 1, available_tickets: { $gt: 0 } });

        return res.status(200).json(events);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

async function bookEvent(req, res) {
    try {
        const { event_id } = req.body;
        const userId = req.user.userId;

        const event = await Event.findOne({ _id: event_id, status: 1, available_tickets: { $gt: 0 } });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const eventbook = await EventBook.findOne({ event_id: event_id, user_id: userId });

        const result = await Event.updateOne({ _id: event_id }, { $inc: { available_tickets: -1 } });

        if (eventbook) {
            return res.status(422).json({ message: "You already booked this event" });
        }

        const newevent = new EventBook();
        newevent.event_id = event_id;
        newevent.user_id = userId;
        await newevent.save();

        return res.status(200).json({ message: "Your event booking was successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    register,
    login,
    getEvents,
    bookEvent,
}
