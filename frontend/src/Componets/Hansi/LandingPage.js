import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Hero from './Hero';

// import "./assets/img/portfolio";

const HomePage = () => {
    return (
        <>
            <Sidebar/>
            <Hero/>
        </>
    )
}

export default HomePage;