
# Project FlightHeaven

Flight Heaven is your ultimate destination for hassle-free flight booking. With our user-friendly website, you can effortlessly select your departure city and arrival city, and instantly discover a wide range of available flights. Say goodbye to endless search results and hello to a seamless travel experience. Fly with ease, choose Flight Heaven.


## Setup the Project

- Clone the project from the repository

```bash
  git clone git@github.com:INDERJEET0202/Telaverge-Project.git
```

### For **Frontend**
- Install Dependencies
```
  cd frontend
  npm install
```
- Start the server
```
  npm start
```
- Change the host in the `frontend/src/utils/APIRoutes.js`
```
  export const host = "http://localhost:3001";
  change the host to the server where the backend is running
```



### For **Backend**
```
  cd Backend
  npm install
```
- Create `.env` file in the backend folder.
```
  PORT=YOUR_PORT
  MONGO_SERVER = MONGO_DB_URI
```
- Start server 
```
  npm start
```

- For the `addAirlinesData` run the `addAirlinesData()` function for one time (uncomment the function) and push datas to `mongodb`
### addAirlinesData Function

```javascript
async function addAirlinesData() {
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