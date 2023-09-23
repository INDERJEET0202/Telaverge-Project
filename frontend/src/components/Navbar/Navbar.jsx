import React from 'react'
import logo from "../../assets/Logo.png"
import "../Navbar/Navbar.css";

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <div className="logo">
                        <a href="/">
                            <img src={logo} alt="" />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar