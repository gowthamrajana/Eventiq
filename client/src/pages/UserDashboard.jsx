import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaTicketAlt,
    FaTimesCircle,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaClock,
    FaArrowRight
} from 'react-icons/fa';


const UserDashboard = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (!user) {
            navigate('/login');
            return;
        }

        fetchBookings();

    }, [user, navigate]);



    const fetchBookings = async () => {

        try {

            const { data } = await api.get('/bookings/my');
            setBookings(data);

        } catch (error) {

            console.error('Error fetching bookings', error);

        } finally {

            setLoading(false);

        }

    };



    const cancelBooking = async (id) => {

        if (window.confirm('Are you sure you want to cancel this booking request?')) {

            try {

                await api.delete(`/bookings/${id}`);
                fetchBookings();

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    'Error cancelling booking'
                );

            }

        }

    };



    if (loading) {

        return (
            <div className="
            min-h-[70vh]
            flex
            items-center
            justify-center
            bg-[#f7f7f5]
            ">

                <p className="
                text-gray-500
                font-semibold
                text-lg
                ">
                    Loading dashboard...
                </p>

            </div>
        );

    }



    const confirmed =
        bookings.filter(
            booking => booking.status === 'confirmed'
        ).length;


    const pending =
        bookings.filter(
            booking => booking.status === 'pending'
        ).length;



    return (

        <div className="
        min-h-screen
        bg-[#f7f7f5]
        py-10
        px-4
        ">


            <div className="
            max-w-6xl
            mx-auto
            ">


                {/* PROFILE CARD */}

                <div className="
                bg-white
                rounded-[30px]
                p-8
                mb-8
                border
                border-gray-100
                shadow-sm
                flex
                flex-col
                md:flex-row
                items-center
                gap-6
                ">


                    <div className="
                    w-24
                    h-24
                    rounded-full
                    bg-gradient-to-br
                    from-gray-900
                    to-gray-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-4xl
                    font-black
                    shadow-xl
                    ">

                        {user?.name?.charAt(0)}

                    </div>



                    <div className="
                    text-center
                    md:text-left
                    ">

                        <h1 className="
                        text-3xl
                        font-black
                        text-gray-900
                        mb-2
                        ">
                            Welcome back, {user?.name} 👋
                        </h1>


                        <p className="
                        text-gray-500
                        flex
                        items-center
                        justify-center
                        md:justify-start
                        gap-2
                        ">

                            <span className="
                            w-2.5
                            h-2.5
                            bg-green-500
                            rounded-full
                            ">
                            </span>

                            Active Account

                        </p>


                    </div>


                </div>





                {/* STATS */}

                <div className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-6
                mb-10
                ">


                    <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    transition
                    ">

                        <p className="
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-gray-400
                        ">
                            Total Bookings
                        </p>

                        <h2 className="
                        text-4xl
                        font-black
                        text-gray-900
                        mt-3
                        ">
                            {bookings.length}
                        </h2>

                    </div>




                    <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    transition
                    ">

                        <p className="
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-gray-400
                        ">
                            Confirmed
                        </p>

                        <h2 className="
                        text-4xl
                        font-black
                        text-green-600
                        mt-3
                        ">
                            {confirmed}
                        </h2>

                    </div>




                    <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    transition
                    ">

                        <p className="
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                        text-gray-400
                        ">
                            Pending
                        </p>

                        <h2 className="
                        text-4xl
                        font-black
                        text-yellow-600
                        mt-3
                        ">
                            {pending}
                        </h2>

                    </div>


                </div>





                <div className="
                flex
                items-center
                gap-3
                mb-8
                ">


                    <div className="
                    w-12
                    h-12
                    bg-gray-900
                    text-white
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    ">

                        <FaTicketAlt/>

                    </div>


                    <h2 className="
                    text-2xl
                    font-black
                    text-gray-900
                    ">
                        My Booking Requests
                    </h2>


                </div>
                                {/* BOOKINGS */}


                                {
                    bookings.length === 0 ? (

                        <div className="
                        bg-white
                        rounded-[32px]
                        p-12
                        text-center
                        border
                        border-gray-100
                        shadow-sm
                        ">


                            <div className="
                            w-24
                            h-24
                            mx-auto
                            rounded-full
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            mb-6
                            ">

                                <FaTicketAlt className="
                                text-gray-400
                                text-4xl
                                "/>

                            </div>



                            <h3 className="
                            text-2xl
                            font-black
                            text-gray-900
                            mb-3
                            ">
                                No bookings yet
                            </h3>



                            <p className="
                            text-gray-500
                            mb-8
                            ">
                                Discover exciting events and reserve your seat today.
                            </p>



                            <Link
                            to="/"
                            className="
                            inline-flex
                            items-center
                            gap-2
                            bg-gray-900
                            hover:bg-black
                            text-white
                            font-bold
                            px-8
                            py-4
                            rounded-2xl
                            shadow-lg
                            transition
                            hover:-translate-y-1
                            "
                            >

                                Browse Events

                                <FaArrowRight/>

                            </Link>


                        </div>


                    ) : (


                        <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-7
                        ">


                            {
                            bookings.map((booking)=>(


                                <div
                                key={booking._id}
                                className="
                                bg-white
                                rounded-[30px]
                                overflow-hidden
                                border
                                border-gray-100
                                shadow-sm
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-500
                                flex
                                flex-col
                                "
                                >



                                    <div className="
                                    p-7
                                    flex-grow
                                    ">


                                    {
                                    booking.eventId ? (

                                        <>


                                            <div className="
                                            flex
                                            justify-between
                                            items-start
                                            gap-4
                                            mb-6
                                            ">


                                                <h3 className="
                                                text-xl
                                                font-black
                                                text-gray-900
                                                leading-tight
                                                ">

                                                    {booking.eventId.title}

                                                </h3>



                                                <div className="
                                                flex
                                                flex-col
                                                gap-2
                                                items-end
                                                ">


                                                    <span
                                                    className={`
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-[10px]
                                                    font-black
                                                    uppercase
                                                    tracking-wide

                                                    ${
                                                    booking.status === "confirmed"
                                                    ?
                                                    "bg-green-50 text-green-700"
                                                    :
                                                    booking.status === "cancelled"
                                                    ?
                                                    "bg-red-50 text-red-700"
                                                    :
                                                    "bg-yellow-50 text-yellow-700"
                                                    }

                                                    `}
                                                    >

                                                        ● {booking.status}

                                                    </span>




                                                    {
                                                    booking.status !== "cancelled" &&

                                                    <span
                                                    className={`
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-[10px]
                                                    font-black
                                                    uppercase

                                                    ${
                                                    booking.paymentStatus === "paid"
                                                    ?
                                                    "bg-blue-50 text-blue-700"
                                                    :
                                                    "bg-gray-100 text-gray-700"
                                                    }

                                                    `}
                                                    >

                                                        {booking.paymentStatus.replace('_',' ')}

                                                    </span>

                                                    }



                                                </div>


                                            </div>





                                            <div className="
                                            space-y-5
                                            ">


                                                {/* DATE */}

                                                <div className="
                                                flex
                                                items-center
                                                gap-4
                                                ">

                                                    <div className="
                                                    w-11
                                                    h-11
                                                    bg-gray-100
                                                    rounded-2xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-700
                                                    ">

                                                        <FaCalendarAlt/>

                                                    </div>


                                                    <div>

                                                        <p className="
                                                        text-xs
                                                        text-gray-400
                                                        font-bold
                                                        uppercase
                                                        ">
                                                            Date
                                                        </p>


                                                        <p className="
                                                        font-semibold
                                                        text-gray-800
                                                        ">

                                                        {
                                                        new Date(
                                                        booking.eventId.date
                                                        ).toLocaleDateString()
                                                        }

                                                        </p>

                                                    </div>


                                                </div>





                                                {/* AMOUNT */}


                                                <div className="
                                                flex
                                                items-center
                                                gap-4
                                                ">

                                                    <div className="
                                                    w-11
                                                    h-11
                                                    bg-gray-100
                                                    rounded-2xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-700
                                                    ">

                                                        <FaMoneyBillWave/>

                                                    </div>



                                                    <div>


                                                        <p className="
                                                        text-xs
                                                        text-gray-400
                                                        font-bold
                                                        uppercase
                                                        ">
                                                            Amount
                                                        </p>


                                                        <p className="
                                                        font-semibold
                                                        text-gray-800
                                                        ">

                                                        {
                                                        booking.amount === 0
                                                        ?
                                                        "Free"
                                                        :
                                                        `₹${booking.amount}`
                                                        }

                                                        </p>


                                                    </div>


                                                </div>






                                                {/* REQUEST DATE */}


                                                <div className="
                                                flex
                                                items-center
                                                gap-4
                                                ">


                                                    <div className="
                                                    w-11
                                                    h-11
                                                    bg-gray-100
                                                    rounded-2xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-700
                                                    ">


                                                        <FaClock/>


                                                    </div>



                                                    <div>


                                                        <p className="
                                                        text-xs
                                                        text-gray-400
                                                        font-bold
                                                        uppercase
                                                        ">
                                                            Requested
                                                        </p>


                                                        <p className="
                                                        font-semibold
                                                        text-gray-800
                                                        ">

                                                        {
                                                        new Date(
                                                        booking.bookedAt
                                                        ).toLocaleDateString()
                                                        }

                                                        </p>


                                                    </div>


                                                </div>



                                            </div>



                                        </>


                                    ) : (


                                        <p className="
                                        text-red-500
                                        italic
                                        ">
                                            Event details unavailable
                                        </p>


                                    )

                                    }


                                    </div>





                                    {/* FOOTER */}


                                    <div className="
                                    bg-gray-50
                                    border-t
                                    border-gray-100
                                    px-6
                                    py-5
                                    flex
                                    justify-between
                                    items-center
                                    ">



                                        {
                                        booking.eventId &&
                                        booking.status !== "cancelled"

                                        ?

                                        <>


                                            <Link
                                            to={`/events/${booking.eventId._id}`}
                                            className="
                                            flex
                                            items-center
                                            gap-2
                                            text-gray-900
                                            font-bold
                                            text-sm
                                            group
                                            "
                                            >

                                                View Event

                                                <FaArrowRight
                                                className="
                                                group-hover:translate-x-1
                                                transition
                                                "
                                                />

                                            </Link>





                                            <button
                                            onClick={() => cancelBooking(booking._id)}
                                            className="
                                            flex
                                            items-center
                                            gap-2
                                            text-red-500
                                            hover:text-red-700
                                            font-bold
                                            text-sm
                                            "
                                            >

                                                <FaTimesCircle/>

                                                Cancel

                                            </button>



                                        </>


                                        :

                                        <div className="
                                        w-full
                                        text-center
                                        text-sm
                                        text-gray-500
                                        italic
                                        ">

                                            Booking Cancelled

                                        </div>


                                        }



                                    </div>



                                </div>



                            ))

                            }



                        </div>


                    )

                }



            </div>


        </div>

    );

};


export default UserDashboard;