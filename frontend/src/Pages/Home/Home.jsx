import React, { useState, useEffect } from 'react'
import "../Home/Home.css"
import jsonData from "../../assets/json-data/citiesAirport.json"

const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTo, setIsOpenTo] = useState(false)

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.flight')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // console.log(jsonData);
        if (isOpen) {
            document.body.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <div className="home">
                <div className="upper-container">
                    <h3>Book International and Domestic Flights</h3>
                </div>
                <div className="container">
                    <div className="info">
                        up info
                    </div>
                    <div className="find-flight">
                        <div className="flight">
                            <button className='booking-btns' onClick={() => { setIsOpen((isOpen) => { return !isOpen }) }}>From<i className="ri-arrow-down-s-line"></i></button>
                            <h1 className='city'>Delhi</h1>
                            <span className='airport-name'>DEL, Delhi Airport India</span>
                            {isOpen === true && <div className='dropdown-airport'>
                                <div className='airports-list'>
                                    {jsonData.airports.map((items, key) =>
                                        (<li onClick={()=>{console.log(items)}} key={key}>
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
                            <h1 className='city'>Bangaluru</h1>
                            <span className='airport-name'>BLR, Kempegawon International air...</span>
                            {isOpenTo === true && <div className='dropdown-airport'>
                                <div className='airports-list'>
                                    <li>
                                        <section>
                                            <p className='airport-city'>Delhi, India</p>
                                            <p className='airport'>Chhatrapati Shivaji International Airport</p>
                                        </section>
                                        <p className='code'>BOM</p>

                                    </li>

                                </div>
                            </div>}
                        </div>
                        <div className="flight">
                            <button className=' booking-btns'>Departure<i className="ri-arrow-down-s-line"></i></button>
                            <h1>3<em>Oct'23</em></h1>
                            <span className='airport-name'>Tuesday</span>
                        </div>
                        <div className="flight last-div">
                            <button className='booking-btns'>Traveller<i className="ri-arrow-down-s-line"></i></button>
                            <h1>1<em>Traveller</em></h1>
                            <span className='airport-name'>Economy/Premium Economy</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home