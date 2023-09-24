const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
// const FlightInformation = require("./Models/FlightInformation");

const app = express();
app.use(express.json());

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

// async function insertFlightData() {
//     try {
//         const flightData = require('./json/flightsData.json'); // Load your JSON data file here

//         // Insert the flight records into the collection
//         await FlightInformation.insertMany(flightData);
//         console.log('Flight data inserted successfully.');
//     } catch (error) {
//         console.error('Error inserting flight data:', error);
//     } finally {
//         mongoose.disconnect(); // Close the MongoDB connection
//     }
// }

// insertFlightData();


app.get('/flight-informations', async (req, res) => {
    try {
        const flightInformations = await FlightInformation.find();
        res.json(flightInformations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
