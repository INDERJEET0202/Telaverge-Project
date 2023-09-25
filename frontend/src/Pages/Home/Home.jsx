import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "../Home/Home.css"
import jsonData from "../../assets/json-data/citiesAirport.json";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import waveSvg from '../../assets/wave.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { searchFlightRoute } from '../../utils/APIRoutes';

const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTo, setIsOpenTo] = useState(false);
    const [departure, setDeparture] = useState(null);
    const [arrival, setArrival] = useState(null);
    const [date, setDate] = useState(new Date());
    const [selectDate, setSelectDate] = useState(new Date());
    const [dateOpen, setDateOpen] = useState(false);
    const [passengerCount, setPassengerCount] = useState(1);

    const navigate = useNavigate();

    const incrementPassenger = () => {
        setPassengerCount(prevCount => prevCount + 1);
    };

    const decrementPassenger = () => {
        if (passengerCount > 1) {
            setPassengerCount(prevCount => prevCount - 1);
        }
    };

    const handleDateChange = (date) => {
        setSelectDate(date);
        setDateOpen(false);
    };

    const handleDepartureCityClick = (items) => {
        setDeparture(items);
        setIsOpen(false);
    };

    const handleArrivalCityClick = (items) => {
        setArrival(items);
        setIsOpenTo(false);
    }

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.flight')) {
            setIsOpen(false);
            setIsOpenTo(false);
            setDateOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpenTo) {
            document.body.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpenTo]);

    useEffect(() => {
        if (dateOpen) {
            document.body.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [dateOpen]);

    const inputDate = new Date(selectDate);

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = inputDate.getDate();
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][inputDate.getDay()];

    const outputHTML = `<h1>${day}<em>${month}'${year.toString().slice(-2)}</em></h1>\n<span className='day'>${dayOfWeek}</span>`;

    // console.log(outputHTML);

    const fromCity = localStorage.getItem('fromCity') === undefined ? "city1" : localStorage.getItem('fromCity');
    const toCity = localStorage.getItem('toCity') === undefined ? "city2" : localStorage.getItem('toCity');



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            from: departure,
            to: arrival,
            departure: selectDate,
            travellers: passengerCount
        };
        // if (!formData.from || !formData.to || !formData.departure || !formData.travellers) {
        //     toast.error("Please fill in all the required fields.");
        // } else {
        //     // console.log(formData);
        //     console.log("Search btn clicked");
        // };

        const fromCity = formData?.from?.city;
        const toCity = formData?.to?.city;

        try {
            if (formData.from && formData.to) {
                const response = await axios.post(searchFlightRoute, { fromCity, toCity });
                console.log(response.data.citiesInfo);
                console.log(response.data.airportsName);

                // toast.success("Fetched Successfully");
                localStorage.setItem('fromCity', fromCity);
                localStorage.setItem('toCity', toCity);
                navigate('/flights/search', { state: { 'fromCity': fromCity, 'toCity': toCity } });
            }
            else {
                toast.error("Select Arrival and Departure both");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again later.");
        }
    };


    return (
        <>
            <div className="home">
                <div className="upper-container">
                    <h3>Book International and Domestic Flights</h3>
                </div>
                <div className="container">
                    <div className="info">
                        {/* up info */}
                    </div>
                    <div className="find-flight">
                        <div className="flight">
                            <button className='booking-btns' onClick={() => { setIsOpen((isOpen) => { return !isOpen }) }}>From<i className="ri-arrow-down-s-line"></i></button>
                            {departure ? (
                                <>
                                    <h1 className='city'>{departure.city}  <i className="ri-flight-takeoff-line"></i></h1>
                                    <span className='airport-name'>{departure.code},{departure.airport_name}</span>
                                </>
                            ) : (
                                <>
                                    <h1 className='city'>Select <i className="ri-flight-takeoff-line"></i></h1>
                                    <span className='airport-name'>IND, Airports</span>
                                </>
                            )}
                            {isOpen === true && <div className='dropdown-airport'>
                                <div className='airports-list'>
                                    {jsonData.airports.map((items, key) =>
                                    (<li className='airports-lists' onClick={() => { handleDepartureCityClick(items) }} key={key}>
                                        <section>
                                            <p className='airport-city'>{items.city}, {items.country}</p>
                                            <p className='airport'>{items.airport_name}</p>
                                        </section>
                                        <p className='code'>{items.code}</p>
                                    </li>)
                                    )}

                                </div>
                            </div>}
                        </div>
                        <div className="flight">
                            <button className=' booking-btns' onClick={() => { setIsOpenTo((isOpenTo) => { return !isOpenTo }) }}>To<i className="ri-arrow-down-s-line"></i></button>
                            {arrival ? (
                                <>
                                    <h1 className='city'>{arrival.city}  <i className="ri-flight-land-line"></i></h1>
                                    <span className='airport-name'>{arrival.code}, {arrival.airport_name}</span>
                                </>
                            ) : (
                                <>
                                    <h1 className='city'>Select   <i className="ri-flight-land-line"></i></h1>
                                    <span className='airport-name'>IND, Airports</span>
                                </>
                            )}
                            {isOpenTo === true && <div className='dropdown-airport'>
                                <div className='airports-list'>
                                    {jsonData.airports.map((items, key) =>
                                    (<li className='airports-lists' onClick={() => { handleArrivalCityClick(items) }} key={key}>
                                        <section>
                                            <p className='airport-city'>{items.city}, {items.country}</p>
                                            <p className='airport'>{items.airport_name}</p>
                                        </section>
                                        <p className='code'>{items.code}</p>
                                    </li>)
                                    )}

                                </div>
                            </div>}
                        </div>
                        <div className="flight">
                            <button className='booking-btns' onClick={() => { setDateOpen((dateOpen) => { return !dateOpen }) }}>Departure<i className="ri-arrow-down-s-line"></i></button>
                            {dateOpen === true && <Calendar className="calender" value={selectDate} onChange={handleDateChange} />}
                            {selectDate ? (
                                <>
                                    <h1>{day}<em>{month}'{year.toString().slice(-2)}</em></h1>
                                    <span className='day'>{dayOfWeek}</span>
                                </>
                            ) : (
                                <>
                                    <h1>26<em>Sep'23</em></h1>
                                    <span className='day'>Tuesday</span>
                                </>)}
                        </div>
                        <div className="flight last-div">
                            <button className='booking-btns' onClick={decrementPassenger}>
                                Travellers
                            </button>
                            <h1>{passengerCount}<em>Traveller(Adult)</em>
                                <button className='booking-btns' onClick={incrementPassenger}>
                                    <i className="ri-add-line"></i>
                                </button>
                                <button className='booking-btns' onClick={decrementPassenger}>
                                    <i className="ri-subtract-line"></i>
                                </button></h1>
                            <span className='airport-name'>Economy/Premium Economy</span>
                        </div>
                    </div>
                    <div className="lower-content">
                        {fromCity && toCity && <div className="recent-searches">
                            <h4>Recent Searches</h4>
                            <p style={{ textTransform: "uppercase", fontWeight: "300" }}> <i class="ri-search-line"></i> {fromCity} <i style={{ margin: "0 1rem" }} className="ri-arrow-right-line"></i> {toCity}</p>
                        </div>
                        }

                    </div>
                    <div className='center no-underline'>
                        <button onClick={handleSubmit} className='submit-btn'>
                            SEARCH
                        </button>
                    </div>
                    {/* <img className='wave' src={waveSvg} alt="" /> */}


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

export default Home