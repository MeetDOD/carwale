import React from 'react'
import About from './About';
import Faq from './Faq';
import Features from './Features';
import Hero from './Hero';
import CarsHome from './CarsHome';
import Brandshome from './BrandsHome';

const HomeMain = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <Brandshome />
            <CarsHome />
            <Faq />
        </>
    )
}

export default HomeMain
