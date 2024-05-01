const bcrypt = require('bcrypt');
const Admin = require('./adminModel');
const Event = require('../models/event')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');


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

        const user = await Admin.findOne({ email });
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

async function addEvent(req, res) {
    try {

        const { name, date, venue, available_tickets } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});

            return res.status(400).json({ errors: formattedErrors });
        }

        const event = new Event({
            date: date,
            venue: venue,
            available_tickets: available_tickets,
            name: name
        });
        await event.save();

        return res.status(201).json({ message: 'Event created successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    login,
    addEvent
}