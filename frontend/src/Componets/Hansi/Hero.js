import React from 'react';
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <>
            <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
                <div class="hero-container" data-aos="fade-in">
                    <h1>Influenzer</h1>

                </div>
                <div class="hero-container" data-aos="fade-in">
                    <Link to={"/myFeed"}>
                        <button class="get-started-btn scrollto">Get Started</button>
                    </Link>
                </div>
            </section>

        </>
    )
}

export default Hero;