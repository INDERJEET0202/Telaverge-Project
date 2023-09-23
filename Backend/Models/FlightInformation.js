const mongoose = require('mongoose');

const flightInformationSchema = new mongoose.Schema({
    flight_id: {
        type: String,
        required: true,
        unique: true,
    },
    airline_name: {
        type: String,
        required: true,
    },
    flight_number: {
        type: String,
        required: true,
    },
    departure_airport: {
        type: String,
        required: true,
    },
    arrival_airport: {
        type: String,
        required: true,
    },
    departure_date: {
        type: Date,
        required: true,
    },
    arrival_date: {
        type: Date,
        required: true,
    },
    departure_time: {
        type: String,
        required: true,
    },
    arrival_time: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    available_seats: {
        type: Number,
        required: true,
    },
});

const FlightInformation = mongoose.model('FlightInformation', flightInformationSchema);

module.exports = FlightInformation;
