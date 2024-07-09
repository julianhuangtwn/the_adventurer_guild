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
        <div id="animation-carousel" className="relative w-full p-6" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="duration-200 ease-linear" data-carousel-item>
                    {
                        slides.length > 0 && 
                        <img src={`images/home_carousel/${slides[slideNum]}`} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="boardgame image"/>
                    }
                </div>
                <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black">
                    <h1 className="bottom-24 text-bold text-3xl flex justify-center text-white">Title</h1>
                    <div className="relative flex justify-center h-21">
                        <p className=" w-3/4 text-bold justify-center items-center text-center text-white line-clamp-3">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod illum officia vel omnis accusamus, odio veniam sit. Autem labore, ipsa dignissimos ab itaque, facilis quidem maxime, id amet ex facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste doloremque maxime iusto cum iure quidem perspiciatis atque, velit ea id laborum ratione, quam ab incidunt consectetur culpa, unde ipsum? Earum.
                        </p>
                    </div>
                </div>
            </div>
    
            <button type="button" className="absolute top-6 bottom-6 w-32 start-5 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none bg-gradient-to-l from-transparent to-black rounded" onClick={prevSlide} data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black dark:bg-gray-800/30 group-hover:bg-gray-500 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-6 bottom-6 w-32 end-5 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none bg-gradient-to-r from-transparent to-black rounded" onClick={nextSlide} data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black dark:bg-gray-800/30 group-hover:bg-gray-500 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
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