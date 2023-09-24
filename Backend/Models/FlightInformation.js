const mongoose = require('mongoose');

const flightInformationSchema = new mongoose.Schema({
    departure_airport: {
        type: String,
        required: true
    },
    all_flights: [{
        flight_id: String,
        airline_name: String,
        flight_number: String,
        arrival_airport: String,
        departure_time: String,
        arrival_time: String,
        price: Number,
        available_seats: Number
    }]
});

const FlightInformation = mongoose.model('FlightInformation', flightInformationSchema);

module.exports = FlightInformation;
