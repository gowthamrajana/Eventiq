import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle, FaArrowLeft, FaHome } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-[#f8f7f4]">

            <div className="
                max-w-md 
                w-full 
                bg-white 
                rounded-3xl 
                shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                border 
                border-gray-100
                p-10 
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
            ">

                {/* Icon */}
                <div className="
                    w-20 
                    h-20 
                    mx-auto 
                    rounded-full 
                    bg-gray-100 
                    flex 
                    items-center 
                    justify-center
                    mb-7
                ">
                    <FaTimesCircle className="
                        text-gray-800 
                        text-5xl
                    "/>
                </div>


                {/* Heading */}
                <h1 className="
                    text-3xl 
                    font-extrabold 
                    text-gray-900 
                    mb-4
                ">
                    Booking Failed
                </h1>


                {/* Description */}
                <p className="
                    text-gray-500 
                    leading-relaxed 
                    text-base
                    mb-8
                ">
                    We couldn't complete your booking request.
                    Please try again or check your payment details before retrying.
                </p>



                {/* Info Box */}
                <div className="
                    bg-[#faf9f7]
                    border
                    border-gray-100
                    rounded-2xl
                    p-4
                    mb-8
                ">
                    <p className="
                        text-sm 
                        text-gray-500
                    ">
                        Don't worry, no amount has been deducted from your account.
                    </p>
                </div>



                {/* Buttons */}
                <div className="space-y-4">

                    <Link
                        to="/"
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
                            hover:shadow-xl
                            hover:-translate-y-0.5
                        "
                    >
                        <FaHome />
                        Return to Events
                    </Link>


                    <Link
                        to="/dashboard"
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
                        <FaArrowLeft />
                        Go to Dashboard
                    </Link>

                </div>


            </div>

        </div>
    );
};

export default PaymentFailed;