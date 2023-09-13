import React from 'react'
import Hero from '../smallcomponents/Hero'
import Features from '../smallcomponents/Features'
import Aboutus from '../smallcomponents/Aboutus'
import CarCard from './CarCard'

const Home = () => {

    return (
        <div>
            <Hero />
            <Features />
            <Aboutus />
            <CarCard />
        </div>
    )
}

export default Home
