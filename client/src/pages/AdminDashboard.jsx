import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import {
    FaCalendarAlt,
    FaUsers,
    FaClock,
    FaPlus,
    FaTrash
} from 'react-icons/fa';


const AdminDashboard = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aiLoading, setAiLoading] = useState(false);

    const [showEventForm, setShowEventForm] = useState(false);


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        totalSeats: '',
        ticketPrice: '',
        image: ''
    });



    useEffect(() => {

        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchData();

    }, [user, navigate]);




    const fetchData = async () => {

        try {

            const [eventsRes, bookingsRes] = await Promise.all([
                api.get('/events'),
                api.get('/bookings/my')
            ]);


            setEvents(eventsRes.data);
            setBookings(bookingsRes.data);


        } catch (error) {

            console.error(
                "Admin fetch error",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleGenerateDescription = async () => {
        try {
            setAiLoading(true);
    
            const response = await api.post('/ai/generate-description', {
                title: formData.title,
                category: formData.category,
                date: formData.date,
                location: formData.location,
                ticketPrice: formData.ticketPrice
            });
    
            setFormData({
                ...formData,
                description: response.data.description
            });
    
        } catch (error) {
            console.error("AI description error:", error);
    
            alert(
                error.response?.data?.message ||
                "Failed to generate description"
            );
    
        } finally {
            setAiLoading(false);
        }
    };
    


    const handleCreateEvent = async (e) => {

        e.preventDefault();

        try {

            await api.post('/events', formData);


            setShowEventForm(false);


            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                category: '',
                totalSeats: '',
                ticketPrice: '',
                image: ''
            });


            fetchData();


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error creating event"
            );

        }

    };





    const handleDeleteEvent = async (id) => {

        if (
            window.confirm(
                "Are you sure you want to delete this event?"
            )
        ) {

            try {

                await api.delete(`/events/${id}`);

                fetchData();


            } catch (error) {

                alert("Error deleting event");

            }

        }

    };





    const handleConfirmBooking = async (
        id,
        paymentStatus
    ) => {

        try {

            await api.put(
                `/bookings/${id}/confirm`,
                {
                    paymentStatus
                }
            );

            fetchData();


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error confirming booking"
            );

        }

    };





    const handleCancelBooking = async (id) => {

        if (
            window.confirm(
                "Cancel this user's booking request?"
            )
        ) {


            try {

                await api.delete(
                    `/bookings/${id}`
                );

                fetchData();


            } catch(error){

                alert(
                    error.response?.data?.message ||
                    "Error cancelling booking"
                );

            }


        }

    };






    if (loading) {

        return (

            <div className="
                min-h-[60vh]
                flex
                items-center
                justify-center
            ">

                <p className="
                    text-xl
                    font-semibold
                    text-gray-600
                ">
                    Loading admin panel...
                </p>


            </div>

        );

    }






    return (

        <div className="
            min-h-screen
            bg-[#f6f6f4]
            p-4
            md:p-8
        ">



            {/* HEADER */}

            <div className="
                bg-black
                rounded-3xl
                p-8
                mb-10
                shadow-2xl
                flex
                flex-col
                md:flex-row
                justify-between
                items-center
                gap-6
            ">


                <div>


                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-black
                        text-white
                        tracking-tight
                    ">

                        Admin Dashboard

                    </h1>



                    <p className="
                        text-gray-400
                        mt-2
                    ">

                        Manage events and bookings smoothly

                    </p>


                </div>





                <button

                    onClick={() =>
                        setShowEventForm(!showEventForm)
                    }

                    className="
                        bg-white
                        text-black
                        px-7
                        py-3
                        rounded-xl
                        font-bold
                        flex
                        items-center
                        gap-2
                        shadow-lg
                        hover:bg-gray-200
                        transition
                    "

                >

                    <FaPlus />

                    {
                        showEventForm
                        ?
                        "Cancel Creation"
                        :
                        "Create New Event"
                    }


                </button>



            </div>






            {/* STAT CARDS */}


            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mb-10
            ">




                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-gray-200
                    shadow-sm
                    hover:shadow-xl
                    transition
                ">


                    <div className="
                        flex
                        justify-between
                        items-center
                    ">


                        <div>

                            <p className="
                                text-xs
                                uppercase
                                tracking-widest
                                font-bold
                                text-gray-400
                            ">

                                Total Events

                            </p>


                            <h2 className="
                                text-4xl
                                font-black
                                text-gray-900
                                mt-2
                            ">

                                {events.length}

                            </h2>


                        </div>



                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            text-xl
                        ">

                            <FaCalendarAlt />

                        </div>



                    </div>


                </div>





                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-gray-200
                    shadow-sm
                    hover:shadow-xl
                    transition
                ">


                    <div className="
                        flex
                        justify-between
                        items-center
                    ">


                        <div>


                            <p className="
                                text-xs
                                uppercase
                                tracking-widest
                                font-bold
                                text-gray-400
                            ">

                                Total Bookings

                            </p>


                            <h2 className="
                                text-4xl
                                font-black
                                text-gray-900
                                mt-2
                            ">

                                {bookings.length}

                            </h2>


                        </div>



                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            text-xl
                        ">

                            <FaUsers />

                        </div>



                    </div>


                </div>






                <div className="
                    bg-white
                    rounded-3xl
                    p-6
                    border
                    border-gray-200
                    shadow-sm
                    hover:shadow-xl
                    transition
                ">


                    <div className="
                        flex
                        justify-between
                        items-center
                    ">


                        <div>


                            <p className="
                                text-xs
                                uppercase
                                tracking-widest
                                font-bold
                                text-gray-400
                            ">

                                Pending Requests

                            </p>


                            <h2 className="
                                text-4xl
                                font-black
                                text-gray-900
                                mt-2
                            ">


                                {
                                    bookings.filter(
                                        b =>
                                        b.status === "pending"
                                    ).length
                                }


                            </h2>


                        </div>



                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            text-xl
                        ">

                            <FaClock />

                        </div>



                    </div>


                </div>



            </div>
                        {/* CREATE EVENT FORM */}

                        {showEventForm && (

<div className="
    bg-white
    rounded-3xl
    p-8
    mb-10
    border
    border-gray-200
    shadow-lg
">


    <h2 className="
        text-2xl
        font-black
        text-gray-900
        mb-6
    ">
        Create New Event
    </h2>



    <form
        onSubmit={handleCreateEvent}
        className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
        "
    >


        <input
            required
            type="text"
            placeholder="Event Title"
            className="admin-input"
            value={formData.title}
            onChange={(e)=>setFormData({
                ...formData,
                title:e.target.value
            })}
        />



        <input
            required
            type="text"
            placeholder="Category"
            className="admin-input"
            value={formData.category}
            onChange={(e)=>setFormData({
                ...formData,
                category:e.target.value
            })}
        />



        <input
            required
            type="date"
            className="admin-input"
            value={formData.date}
            onChange={(e)=>setFormData({
                ...formData,
                date:e.target.value
            })}
        />



        <input
            required
            type="text"
            placeholder="Location"
            className="admin-input"
            value={formData.location}
            onChange={(e)=>setFormData({
                ...formData,
                location:e.target.value
            })}
        />



        <input
            required
            type="number"
            placeholder="Total Seats"
            className="admin-input"
            value={formData.totalSeats}
            onChange={(e)=>setFormData({
                ...formData,
                totalSeats:e.target.value
            })}
        />



        <input
            required
            type="number"
            placeholder="Ticket Price"
            className="admin-input"
            value={formData.ticketPrice}
            onChange={(e)=>setFormData({
                ...formData,
                ticketPrice:e.target.value
            })}
        />



        <input
            type="text"
            placeholder="Image URL"
            className="
                admin-input
                md:col-span-2
            "
            value={formData.image}
            onChange={(e)=>setFormData({
                ...formData,
                image:e.target.value
            })}
        />

<div className="flex justify-between items-center mb-2">

        <label className="font-bold text-gray-700">
            Event Description
        </label>

        <button
            type="button"
            onClick={handleGenerateDescription}
            disabled={aiLoading}
            className="
                bg-black
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-bold
                hover:bg-gray-800
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
            "
        >
            {aiLoading ? "Generating..." : "✨ Generate with AI"}
        </button>

    </div>

        <textarea
            required
            placeholder="Event Description"
            className="
                admin-input
                md:col-span-2
                h-32
                resize-none
            "
            value={formData.description}
            onChange={(e)=>setFormData({
                ...formData,
                description:e.target.value
            })}
        />



        <button
            type="submit"
            className="
                md:col-span-2
                bg-black
                text-white
                py-3
                rounded-xl
                font-bold
                hover:bg-gray-800
                transition
                shadow-lg
            "
        >

            Publish Event

        </button>


    </form>


</div>

)}








{/* EVENTS + BOOKINGS */}


<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
">





{/* EVENTS SECTION */}


<div>


    <div className="
        flex
        items-center
        gap-3
        mb-6
    ">

        <h2 className="
            text-2xl
            font-black
        ">
            All Events
        </h2>


        <span className="
            bg-gray-200
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
        ">
            {events.length}
        </span>


    </div>





    <div className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-md
        overflow-hidden
    ">


        <ul className="
            divide-y
            divide-gray-100
            max-h-[600px]
            overflow-y-auto
        ">


            {
                events.length===0 ?

                <li className="
                    p-8
                    text-center
                    text-gray-500
                ">
                    No events created yet.
                </li>


                :


                events.map(event=>(


                    <li
                    key={event._id}
                    className="
                        p-6
                        flex
                        justify-between
                        items-center
                        gap-5
                        hover:bg-gray-50
                        transition
                    "
                    >


                        <div>


                            <h3 className="
                                font-black
                                text-gray-900
                            ">
                                {event.title}
                            </h3>


                            <div className="
                                text-sm
                                text-gray-500
                                mt-2
                                flex
                                gap-4
                            ">

                                <span>
                                    📅 {new Date(event.date)
                                    .toLocaleDateString()}
                                </span>


                                <span>
                                    🎟 {event.availableSeats}/{event.totalSeats}
                                </span>


                            </div>


                        </div>





                        <button

                        onClick={()=>
                            handleDeleteEvent(event._id)
                        }

                        className="
                            text-red-600
                            border
                            border-red-200
                            px-4
                            py-2
                            rounded-xl
                            font-bold
                            text-sm
                            hover:bg-red-500
                            hover:text-white
                            transition
                            flex
                            items-center
                            gap-2
                        "
                        >

                            <FaTrash/>

                            Delete

                        </button>



                    </li>


                ))

            }


        </ul>


    </div>


</div>








{/* BOOKINGS SECTION */}



<div>


    <div className="
        flex
        items-center
        gap-3
        mb-6
    ">


        <h2 className="
            text-2xl
            font-black
        ">
            Booking Requests
        </h2>


        <span className="
            bg-gray-200
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
        ">
            {bookings.length}
        </span>


    </div>





    <div className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-md
        overflow-hidden
    ">


        <ul className="
            divide-y
            divide-gray-100
            max-h-[600px]
            overflow-y-auto
        ">



        {

        bookings.length===0 ?

        <li className="
            p-8
            text-center
            text-gray-500
        ">
            No bookings yet.
        </li>


        :


        bookings.map(booking=>(


            <li
            key={booking._id}
            className="
                p-6
                hover:bg-gray-50
                transition
            "
            >


                <div className="
                    flex
                    justify-between
                    mb-4
                ">


                    <div>

                        <h3 className="
                            font-black
                            text-gray-900
                        ">
                            {
                                booking.eventId?.title ||
                                "Deleted Event"
                            }
                        </h3>


                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            {booking.userId?.name}
                        </p>


                    </div>





                    <span className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-black
                        uppercase

                        ${
                            booking.status==="confirmed"
                            ?
                            "bg-green-100 text-green-700"
                            :
                            booking.status==="pending"
                            ?
                            "bg-yellow-100 text-yellow-700"
                            :
                            "bg-red-100 text-red-700"
                        }
                    `}>

                        {booking.status}

                    </span>


                </div>





                <div className="
                    bg-gray-50
                    rounded-2xl
                    p-4
                    text-sm
                    space-y-2
                    mb-4
                ">


                    <p>
                        <b>Email:</b> {booking.userId?.email}
                    </p>


                    <p>
                        <b>Amount:</b> ₹{booking.amount}
                    </p>


                    <p>
                        <b>Date:</b> {
                            new Date(
                                booking.bookedAt
                            ).toLocaleString()
                        }
                    </p>


                </div>






                {
                    booking.status==="pending" &&

                    <div className="
                        flex
                        gap-3
                        flex-wrap
                    ">


                        <button
                        onClick={()=>
                            handleConfirmBooking(
                                booking._id,
                                "paid"
                            )
                        }
                        className="
                            flex-1
                            bg-green-50
                            text-green-700
                            border
                            border-green-200
                            py-2
                            rounded-xl
                            font-bold
                            hover:bg-green-600
                            hover:text-white
                            transition
                        "
                        >

                            ✓ Approve Paid

                        </button>




                        <button
                        onClick={()=>
                            handleConfirmBooking(
                                booking._id,
                                "not_paid"
                            )
                        }
                        className="
                            flex-1
                            bg-gray-100
                            py-2
                            rounded-xl
                            font-bold
                            hover:bg-black
                            hover:text-white
                            transition
                        "
                        >

                            Approve

                        </button>





                        <button
                        onClick={()=>
                            handleCancelBooking(
                                booking._id
                            )
                        }
                        className="
                            bg-red-50
                            text-red-600
                            px-5
                            rounded-xl
                            font-bold
                            hover:bg-red-500
                            hover:text-white
                            transition
                        "
                        >

                            Reject

                        </button>


                    </div>

                }



            </li>


        ))

        }



        </ul>


    </div>


</div>


</div>


</div>

);

};


export default AdminDashboard;