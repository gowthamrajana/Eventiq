import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const { register, verifyOTP } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError('');

        try {


            if (!showOTP) {


                await register(name, email, password);

                setShowOTP(true);


            } else {


                await verifyOTP(email, otp);

                navigate('/dashboard');

            }



        } catch (err) {

            setError(err.message || "Something went wrong");

        } finally {

            setLoading(false);

        }

    };





    return (

        <div className="
            min-h-screen
            bg-[#0d0d0d]
            flex
            items-center
            justify-center
            px-6
        ">


            <div className="
                w-full
                max-w-6xl
                min-h-[650px]
                grid
                md:grid-cols-2
                rounded-3xl
                overflow-hidden
                bg-[#171717]
                border
                border-white/10
                shadow-2xl
            ">




                {/* LEFT SIDE */}



                <div className="
                    hidden
                    md:flex
                    flex-col
                    p-12
                    bg-[#141414]
                    relative
                ">


                    <div>


                        <h1 className="
                            text-5xl
                            font-semibold
                            text-white
                            tracking-tight
                        ">
                            Eventiq
                        </h1>



                        <p className="
                            mt-5
                            text-gray-400
                            text-lg
                            max-w-sm
                            leading-relaxed
                        ">
                            Build memorable events.
                            Connect people.
                            Create experiences.
                        </p>


                    </div>






                    {/* CREATE EVENT CARD */}



                    <div className="
                        mt-14
                        bg-[#1c1c1c]
                        border
                        border-white/10
                        rounded-2xl
                        p-6
                        max-w-md
                    ">



                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-6
                        ">



                            <div>


                                <p className="
                                    text-xs
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">
                                    Creating Event
                                </p>



                                <h3 className="
                                    text-white
                                    mt-2
                                    text-lg
                                    font-medium
                                ">
                                    Developer Conference 2026
                                </h3>


                            </div>



                            <span className="
                                px-3
                                py-1
                                rounded-full
                                bg-white/10
                                text-xs
                                text-gray-300
                            ">
                                Draft
                            </span>


                        </div>






                        <div className="
                            space-y-3
                        ">


                            <div className="
                                h-2
                                rounded-full
                                bg-white/10
                            ">


                            </div>



                            <div className="
                                h-2
                                w-3/4
                                rounded-full
                                bg-white/10
                            ">


                            </div>



                            <div className="
                                h-2
                                w-1/2
                                rounded-full
                                bg-white/10
                            ">


                            </div>



                        </div>






                        <div className="
                            mt-6
                            flex
                            gap-3
                        ">



                            <div className="
                                bg-[#111]
                                rounded-xl
                                px-4
                                py-3
                            ">

                                <p className="
                                    text-xs
                                    text-gray-500
                                ">
                                    Attendees
                                </p>


                                <p className="
                                    text-white
                                    font-semibold
                                ">
                                    500+
                                </p>


                            </div>





                            <div className="
                                bg-[#111]
                                rounded-xl
                                px-4
                                py-3
                            ">

                                <p className="
                                    text-xs
                                    text-gray-500
                                ">
                                    Events
                                </p>


                                <p className="
                                    text-white
                                    font-semibold
                                ">
                                    120+
                                </p>


                            </div>



                        </div>



                    </div>






                    <div className="
                        absolute
                        bottom-12
                        text-sm
                        text-gray-500
                    ">
                        Join thousands creating better events
                    </div>




                </div>









                {/* REGISTER SECTION */}



                <div className="
                    flex
                    items-center
                    p-8
                    md:p-12
                    bg-[#1b1b1b]
                ">


                    <div className="
                        w-full
                        max-w-sm
                        mx-auto
                    ">




                        <h2 className="
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            Create account
                        </h2>



                        <p className="
                            mt-2
                            mb-8
                            text-gray-400
                        ">
                            Start your Eventiq journey
                        </p>







                        {
                            error && (

                                <div className="
                                    mb-5
                                    rounded-xl
                                    bg-red-500/10
                                    border
                                    border-red-500/20
                                    text-red-400
                                    px-4
                                    py-3
                                    text-sm
                                ">
                                    {error}
                                </div>

                            )
                        }








                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >




                        {
                            !showOTP ? (

                            <>


                            <div>

                                <label className="
                                    text-sm
                                    text-gray-300
                                ">
                                    Full name
                                </label>


                                <input

                                    type="text"
                                    required

                                    value={name}

                                    onChange={(e)=>
                                        setName(e.target.value)
                                    }

                                    placeholder="Enter your name"

                                    className="
                                        mt-2
                                        w-full
                                        h-12
                                        px-4
                                        rounded-xl
                                        bg-[#111]
                                        border
                                        border-white/10
                                        text-white
                                        placeholder:text-gray-600
                                        outline-none
                                        focus:border-white/30
                                    "

                                />

                            </div>





                            <div>

                                <label className="
                                    text-sm
                                    text-gray-300
                                ">
                                    Email address
                                </label>


                                <input

                                    type="email"
                                    required

                                    value={email}

                                    onChange={(e)=>
                                        setEmail(e.target.value)
                                    }


                                    placeholder="name@example.com"


                                    className="
                                        mt-2
                                        w-full
                                        h-12
                                        px-4
                                        rounded-xl
                                        bg-[#111]
                                        border
                                        border-white/10
                                        text-white
                                        placeholder:text-gray-600
                                        outline-none
                                        focus:border-white/30
                                    "

                                />

                            </div>







                            <div>

                                <label className="
                                    text-sm
                                    text-gray-300
                                ">
                                    Password
                                </label>


                                <input

                                    type="password"
                                    required

                                    value={password}

                                    onChange={(e)=>
                                        setPassword(e.target.value)
                                    }


                                    placeholder="Create a password"


                                    className="
                                        mt-2
                                        w-full
                                        h-12
                                        px-4
                                        rounded-xl
                                        bg-[#111]
                                        border
                                        border-white/10
                                        text-white
                                        placeholder:text-gray-600
                                        outline-none
                                        focus:border-white/30
                                    "

                                />

                            </div>



                            </>


                            ) : (



                            <div>


                                <div className="
                                    mb-5
                                    bg-white/5
                                    border
                                    border-white/10
                                    text-gray-300
                                    rounded-xl
                                    p-4
                                    text-sm
                                ">
                                    Verification code sent to your email.
                                </div>



                                <label className="
                                    text-sm
                                    text-gray-300
                                ">
                                    OTP Code
                                </label>



                                <input

                                    type="text"
                                    required

                                    maxLength="6"

                                    value={otp}

                                    onChange={(e)=>
                                        setOtp(e.target.value)
                                    }


                                    placeholder="000000"


                                    className="
                                        mt-2
                                        w-full
                                        h-14
                                        rounded-xl
                                        bg-[#111]
                                        border
                                        border-white/10
                                        text-white
                                        text-center
                                        tracking-[10px]
                                        font-semibold
                                        outline-none
                                    "

                                />



                            </div>



                            )

                        }





                        <button

                            type="submit"

                            disabled={loading}


                            className="
                                w-full
                                h-12
                                rounded-xl
                                bg-white
                                text-black
                                font-semibold
                                hover:bg-gray-200
                                transition
                            "

                        >

                            {
                                loading
                                ?
                                "Processing..."
                                :
                                showOTP
                                ?
                                "Verify Account"
                                :
                                "Create Account"
                            }


                        </button>




                        </form>







                        {
                            !showOTP && (

                            <p className="
                                mt-8
                                text-center
                                text-sm
                                text-gray-400
                            ">


                                Already have an account?


                                <Link

                                    to="/login"

                                    className="
                                        ml-2
                                        text-white
                                        font-medium
                                        hover:underline
                                    "
                                >
                                    Sign in
                                </Link>


                            </p>

                            )
                        }




                    </div>


                </div>





            </div>


        </div>

    );

};


export default Register;