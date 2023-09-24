import React from 'react'
import './Search.css'
import line from "../../assets/straight_line.png"
import demoImage from "../../assets/demo.jpg"

const Search = () => {
    return (
        <>
            <div className="header">
                <div className="main-content">
                    <div className='search-flights'>
                        <div className="logo-name">
                            <div className="logu">
                                <img className='image-small' src={demoImage} alt="" />
                            </div>
                            <div className="name-number">
                                <p className='bolder'>Indigo</p>
                                <p className='smaller'>FL11000</p>
                            </div>
                        </div>
                        <div className="departure-time all-set">
                            <p className='bolder'>07:40</p>
                            <p className='smaller'>New Delhi</p>
                        </div>
                        <div className="duration all-set">
                            <p className='smaller'>2h10m</p>
                            <i class="ri-git-commit-line"></i>
                            {/* <img className='line' src={line} alt="" /> */}
                            <p className='smaller'>Non Stop</p>
                        </div>
                        <div className="arrival-time all-set">
                            <p className='bolder'> 07:40</p>
                            <p className='smaller'>New Delhi</p>
                        </div>
                        <div className="price all-set">
                            <p className='bolder'>Rs5898</p>
                            <p className="smaller">per adult</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search