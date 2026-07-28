import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTicketAlt, FaHome } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-[#f8f7f4]">

            <div
                className="
                    max-w-md
                    w-full
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    p-10
                    text-center
                    shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                "
            >

                {/* Success Icon */}
                <div
                    className="
                        w-24
                        h-24
                        mx-auto
                        rounded-full
                        bg-green-50
                        flex
                        items-center
                        justify-center
                        mb-7
                    "
                >
                    <FaCheckCircle className="
                        text-green-500
                        text-6xl
                    "/>
                </div>


                {/* Heading */}
                <h1 className="
                    text-3xl
                    font-extrabold
                    text-gray-900
                    mb-4
                ">
                    Booking Confirmed!
                </h1>


                {/* Description */}
                <p className="
                    text-gray-500
                    text-base
                    leading-relaxed
                    mb-8
                ">
                    Your ticket has been booked successfully.
                    A confirmation email has been sent to your registered email address.
                </p>



                {/* Success Message */}
                <div
                    className="
                        bg-green-50
                        border
                        border-green-100
                        rounded-2xl
                        p-4
                        mb-8
                        flex
                        items-center
                        justify-center
                        gap-3
                    "
                >
                    <FaTicketAlt className="text-green-600"/>

                    <span className="
                        text-sm
                        font-medium
                        text-green-700
                    ">
                        Your ticket is ready
                    </span>
                </div>



                {/* Buttons */}
                <div className="space-y-4">


                    <Link
                        to="/dashboard"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-3
                            w-full
                            bg-gray-900
                            hover:bg-black
                            text-white
                            font-semibold
                            py-3.5
                            rounded-xl
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-xl
                        "
                    >
                        <FaTicketAlt />
                        View My Tickets
                    </Link>



                    <Link
                        to="/"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-3
                            w-full
                            bg-gray-100
                            hover:bg-gray-200
                            text-gray-800
                            font-semibold
                            py-3.5
                            rounded-xl
                            transition-all
                            duration-300
                        "
                    >
                        <FaHome />
                        Discover More Events
                    </Link>


                </div>

            </div>

        </div>
    );
};

export default PaymentSuccess;