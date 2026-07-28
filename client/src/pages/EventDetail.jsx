import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);


    const handleBooking = async () => {

        if (!user) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {

            if (!showOTP) {

                await api.post('/bookings/send-otp');

                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');

            } else {

                await api.post('/bookings', {
                    eventId: event._id,
                    otp
                });

                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);

                setEvent({
                    ...event,
                    availableSeats: event.availableSeats - 1
                });

            }

        } catch (err) {

            setError(err.response?.data?.message || 'Booking failed');

        } finally {

            setBookingLoading(false);

        }

    };


    if (loading)
        return (
            <div className="text-center py-20 text-xl font-semibold text-gray-600">
                Loading...
            </div>
        );


    if (error && !event)
        return (
            <div className="text-center py-20 text-xl text-red-500">
                {error || 'Event not found'}
            </div>
        );


    const isSoldOut = event.availableSeats <= 0;


    return (

        <div className="min-h-screen bg-[#f8f7f4] py-8 px-4">


            <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">


                {/* Event Image */}

                {event.image ? (

                    <div className="h-80 overflow-hidden group">

                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                    </div>

                ) : (

                    <div className="w-full h-72 bg-gray-900 flex items-center justify-center text-white/50 text-6xl font-black uppercase tracking-widest">

                        {event.category}

                    </div>

                )}



                <div className="p-8 md:p-12">


                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-8">



                        {/* Left Content */}

                        <div className="flex-1">


                            <div className="inline-flex items-center bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">

                                {event.category}

                            </div>



                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">

                                {event.title}

                            </h1>



                            <p className="text-gray-600 text-lg leading-relaxed">

                                {event.description}

                            </p>



                        </div>



                        {/* Booking Card */}

                        <div className="bg-[#faf9f6] p-7 rounded-2xl border border-gray-100 w-full md:w-[330px] shrink-0 shadow-sm hover:shadow-lg transition duration-300">


                            <h3 className="text-xl font-bold text-gray-900 mb-7">

                                Booking Details

                            </h3>


                            {/* Continue Part 2 */}

                            <div className="space-y-5 mb-8">


                                {/* Price */}

                                <div className="flex items-center gap-4">

                                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-sm">

                                        <FaMoneyBillWave />

                                    </div>


                                    <div>

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            Ticket Price
                                        </p>

                                        <p className="font-bold text-gray-900 text-lg">

                                            {
                                                event.ticketPrice === 0

                                                ?

                                                <span className="text-green-600">
                                                    Free
                                                </span>

                                                :

                                                `₹${event.ticketPrice}`
                                            }

                                        </p>

                                    </div>

                                </div>



                                {/* Seats */}

                                <div className="flex items-center gap-4">

                                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-sm">

                                        <FaChair />

                                    </div>


                                    <div>

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            Availability
                                        </p>


                                        <p className="font-bold text-gray-900">

                                            <span className={event.availableSeats < 10 ? 'text-orange-500' : ''}>

                                                {event.availableSeats}

                                            </span>

                                            {" / "}

                                            {event.totalSeats}

                                        </p>


                                    </div>


                                </div>




                                {/* Date */}

                                <div className="flex items-center gap-4">


                                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-sm">

                                        <FaCalendarAlt />

                                    </div>


                                    <div>

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            Date
                                        </p>


                                        <p className="font-bold text-gray-900">

                                            {new Date(event.date).toLocaleDateString()}

                                        </p>


                                    </div>


                                </div>





                                {/* Location */}

                                <div className="flex items-center gap-4">


                                    <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-sm">

                                        <FaMapMarkerAlt />

                                    </div>


                                    <div>

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            Location
                                        </p>


                                        <p className="font-bold text-gray-900">

                                            {event.location}

                                        </p>


                                    </div>


                                </div>



                            </div>





                            {/* OTP */}

                            {showOTP && (

                                <div className="mb-5">


                                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                                        Enter OTP to Confirm

                                    </label>



                                    <input

                                        type="text"

                                        required

                                        placeholder="6-digit code"

                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-900 focus:outline-none transition shadow-sm font-bold tracking-widest text-center text-lg"

                                        value={otp}

                                        onChange={(e) => setOtp(e.target.value)}

                                        maxLength="6"

                                    />


                                </div>

                            )}






                            {/* Booking Button */}

                            <button

                                onClick={handleBooking}

                                disabled={isSoldOut || bookingLoading || (showOTP && !otp)}

                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                                    
                                    isSoldOut || (successMsg && !showOTP)

                                    ?

                                    'bg-gray-200 text-gray-500 cursor-not-allowed'

                                    :

                                    'bg-gray-900 hover:bg-black text-white hover:-translate-y-1 hover:shadow-xl'

                                }`}

                            >


                                {
                                    bookingLoading

                                    ?

                                    'Processing...'

                                    :

                                    (

                                        showOTP

                                        ?

                                        'Verify OTP & Confirm'

                                        :

                                        (

                                            successMsg && !showOTP

                                            ?

                                            'Request Sent'

                                            :

                                            (

                                                isSoldOut

                                                ?

                                                'Sold Out'

                                                :

                                                'Confirm Registration'

                                            )

                                        )

                                    )

                                }


                            </button>





                            {/* Messages */}

                            {error && (

                                <p className="text-red-500 mt-4 text-center font-medium bg-red-50 border border-red-100 p-3 rounded-xl">

                                    {error}

                                </p>

                            )}



                            {successMsg && (

                                <p className="text-green-600 mt-4 text-center font-medium bg-green-50 border border-green-100 p-3 rounded-xl">

                                    {successMsg}

                                </p>

                            )}



                        </div>



                    </div>


                </div>


            </div>


        </div>


    );

};


export default EventDetail;