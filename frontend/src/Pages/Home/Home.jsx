import React from 'react'
import "../Home/Home.css"

const Home = () => {
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
                            <span>FROM</span>
                            <h1>Delhi</h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>
                        <div className="flight">
                            <span>TO</span>
                            <h1>Bangaluru</h1>
                            <span>BLR, Kempegawon International air...</span>
                        </div>
                        <div className="flight">
                            <span>DEPARTURE</span>
                            <h1>3<em>Oct'23</em></h1>
                            <span>Tuesday</span>
                        </div>
                        <div className="flight">
                            <span>TRAVELLERS</span>
                            <h1>1<em>Traveller</em></h1>
                            <span>Economy/Premium Economy</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home