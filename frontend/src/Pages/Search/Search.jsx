import React, { useEffect, useState } from 'react'
import './Search.css'
import line from "../../assets/straight_line.png"
import demoImage from "../../assets/demo.jpg"
import axios from 'axios';
import { searchFlightRoute } from '../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import spiceJetLogo from "../../assets/SpiceJet-Logo.png";
import airIndiaLogo from "../../assets/airindia.jpg";
import airAsiaLogo from "../../assets/airasia.png"
import indigoLogo from "../../assets/IndiGo-Logo.png"
import jetAirWaysLogo from "../../assets/jetairways.png"
import vistaraLogo from "../../assets/vistara.jpg"

const Search = () => {

    const [citiesInfos, setCitiesInfo] = useState([]);

    const { state } = useLocation();
    const fromCity = state.fromCity;
    const toCity = state.toCity;

    const imagesAirlines = {
        "Indigo Airlines": indigoLogo,
        "Air India": airIndiaLogo,
        "SpiceJet": spiceJetLogo,
        "Vistara": vistaraLogo,
        "Air Asia": airAsiaLogo,
        "GoAir": demoImage,
        "Jet Airways": jetAirWaysLogo,
        "IndiGo Airlines": indigoLogo,
    };


    useEffect(() => {
        const fetchFlights = async () => {
            // const fromCity = localStorage.getItem('fromCity');
            // setFromCityy(fromCity);
            // const toCity = localStorage.getItem('toCity');
            try {
                const response = await axios.post(searchFlightRoute, { fromCity, toCity });
                // console.log(response.data.citiesInfo);
                // console.log(response.data.airportsName);
                const citiesInfos = response.data.citiesInfo || [];
                setCitiesInfo(citiesInfos);
                console.log(citiesInfos);

                toast.success("Fetched Successfully");
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong. Please try again later.");
            }
        }
        fetchFlights();

        return (() => {
            console.log("Flight fetched");
        })
    }, []);

    const calcDuration = (departureTime, arrivalTime) => {
        const departureTimeSplit = departureTime.split(":");
        const departureHour = parseInt(departureTimeSplit[0]);
        const departureMinute = parseInt(departureTimeSplit[1]);

        const arrivalTimeSplit = arrivalTime.split(":");
        const arrivalHour = parseInt(arrivalTimeSplit[0]);
        const arrivalMinute = parseInt(arrivalTimeSplit[1]);

        const durationHour = Math.abs(arrivalHour - departureHour);
        const durationMinute = Math.abs(arrivalMinute - departureMinute);

        return `${durationHour}h ${durationMinute}m`;
    }


    return (
        <>
            <div className="header">
                <div className="main-content">
                    <div className="journeyTitle">
                        <p>Flight from {fromCity} to {toCity} :</p>
                    </div>
                    {citiesInfos.map((flight, key) => (
                        <div className='search-flights' key={key}>
                            <div className="logo-name">
                                <div className="logu">
                                    <img className='image-small' src={imagesAirlines[flight.airline_name]} alt="" />
                                </div>
                                <div className="name-number">
                                    <p className='bolder'>{flight.airline_name}</p>
                                    <p className='smaller'>{flight.flight_number}</p>
                                </div>
                            </div>
                            <div className="departure-time all-set">
                                <p className='bolder'>{flight.departure_time}</p>
                                <p className='smaller'>{fromCity}</p>
                            </div>
                            <div className="duration all-set">
                                <p className='smaller'>{calcDuration(flight.departure_time, flight.arrival_time)}</p>
                                <i className="ri-git-commit-line"></i>
                                <p className='smaller'>{flight.non_stop ? 'Stopover' : 'Non Stop'}</p>
                            </div>
                            <div className="arrival-time all-set">
                                <p className='bolder'>{flight.arrival_time}</p>
                                <p className='smaller'>{flight.arrival_airport}</p>
                            </div>
                            <div className="price-seats">
                                <div className="price all-set">
                                    <p className='bolder'>Rs {flight.price}</p>
                                    <p className="smaller">per adult</p>
                                </div>
                                <div className="availaible-seats all-set">
                                    <p className='bolder'>
                                        {flight.available_seats}
                                    </p>
                                    <p className='smaller'>Available Seats</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Search