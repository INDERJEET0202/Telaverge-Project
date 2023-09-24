const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const FlightInformation = require('./Models/FlightInformation');
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
const port = process.env.PORT || 4001;

const DB = process.env.MONGO_SERVER;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Error in connecting to server", error);
    });

async function insertFlightData() {
    try {
        const flightData = require('./json-data/flightsData.json');


        await FlightInformation.insertMany(flightData);
        console.log('Flight data inserted successfully.');
    } catch (error) {
        console.error('Error inserting flight data:', error);
    } finally {
        mongoose.disconnect();
    }
}

// insertFlightData();

app.post('/flight-informations', async (req, res) => {
    try {
        const flightInformations = await FlightInformation.find();
        res.json(flightInformations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


app.post('/getFlight', async (req, res) => {
    const departureCity = req.body.fromCity;
    const arrivalCity = req.body.toCity;
    try {
        const flightInformations = await FlightInformation.find({ departure_airport: departureCity });
        const allFlights = flightInformations.map(info => info.all_flights);


        const arrival_airports = [];
        const arrivalCityInformation = [];
        flightInformations.forEach(info => {
            info.all_flights.forEach(flight => {
                if (flight.arrival_airport === arrivalCity) {
                    arrivalCityInformation.push(flight);
                }
                arrival_airports.push(flight.arrival_airport);
            });
        });
        console.log(`Arrival airports ${arrival_airports}`);
        console.log(`Arrival city information ${arrivalCityInformation}`);

        res.json({citiesInfo: arrivalCityInformation, airportsName: arrival_airports});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
