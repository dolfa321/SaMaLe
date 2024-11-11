import React from 'react';
import leftHand from '../assets//left-hand.png';
import rightHand from '../assets/right-hand.png';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div
            className="relative bg-[#b3d3e6] w-full h-[calc(100vh-130px)] flex flex-col items-center text-center overflow-hidden px-4">

            <h1 className="pt-8 text-[48px] md:text-[60px] leading-[56px] md:leading-[70px] font-extrabold text-[#293241] font-raleway">
                Welcome to Your AI Companion
            </h1>


            <p className="mt-4 text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] text-[#293241] font-roboto w-4/5 md:w-3/5 max-w-3xl">
                Dive into a world of interactive, intelligent conversations designed to assist, inform, and inspire. Our
                AI is here to help you solve problems, spark creativity, and explore new ideas—anytime, anywhere.
                Whether you're seeking knowledge, a quick answer, or simply a friendly chat, we’re here to make every
                interaction meaningful and engaging.
            </p>


            <h2 className="pt-20 text-[30px] leading-[35px] font-semibold text-[#293241] font-raleway mt-10">
                Start Your Journey Today!
            </h2>

            <div className="mt-10 flex flex-col space-y-3">
                <Link to="/login">
                    <button
                        className="w-[263px] h-[46px] bg-[#EE6C4D] text-white rounded-[15px] font-semibold shadow-md hover:bg-orange-600 transition duration-300">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button
                        className="w-[263px] h-[46px] bg-[#EE6C4D] text-white rounded-[15px] font-semibold shadow-md hover:bg-orange-600 transition duration-300">
                        Register
                    </button>
                </Link>
            </div>

            <img src={leftHand} alt="Left Hand"
                 className="absolute bottom-0 left-0 w-[50%] md:w-[45%] lg:w-[35%] max-w-lg"/>
            <img src={rightHand} alt="Right Hand"
                 className="absolute bottom-40 -right-20 md:-right-10 lg:right-[-70px] w-[50%] md:w-[45%] lg:w-[35%] max-w-lg"/>
        </div>
    );
};

export default Home;