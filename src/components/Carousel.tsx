"use client";

import React, { useState, useEffect } from 'react'

const Carousel = () => {
    const [slideNum, setSlideNum] = useState(0);
    const [slides, setSlides] = useState<string[]>([]);

    useEffect(() => {
        async function getSlides() {
            const response = await fetch('api/carousel');
            
            if (!response.ok) {
                throw new Error('Failed to retrieve slides');
            }

            const data = await response.json();
            setSlides(data.slides);
        }

        getSlides();
    }, []);

    const nextSlide = () => {
        setSlideNum((slideNum + 1) % slides.length);
    };

    const prevSlide = () => {
        setSlideNum((slideNum + slides.length - 1) % slides.length);
    };

    return (

        <div id="animation-carousel" className="relative w-full" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="duration-200 ease-linear" data-carousel-item>
                    {
                        slides.length > 0 && 
                        <img src={`images/home_carousel/${slides[slideNum]}`} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="boardgame image"/>
                    }
                </div>
            </div>
    
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevSlide} data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide} data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>

    )
}

export default Carousel