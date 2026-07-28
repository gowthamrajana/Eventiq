import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);

    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError('');

        try {

            if (!showOTP) {

                const data = await login(email, password);

                if (data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }


            } else {


                const data = await verifyOTP(email, otp);

                if (data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }

            }



        } catch (err) {


            if (err.needsVerification) {

                setShowOTP(true);

                setError(
                    "Your account is not verified. OTP has been sent."
                );

            } else {

                setError(
                    err.message || "Something went wrong"
                );

            }


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
                            leading-relaxed
                            max-w-sm
                        ">
                            Create, manage and experience
                            events like never before.
                        </p>


                    </div>






                    {/* EVENT CARD */}


                    <div className="
                        mt-14
                        bg-[#1c1c1c]
                        border
                        border-white/10
                        rounded-2xl
                        p-6
                        max-w-md
                        shadow-xl
                    ">


                        <div className="
                            flex
                            justify-between
                            items-start
                            mb-6
                        ">


                            <div>


                                <p className="
                                    text-xs
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">
                                    Upcoming Event
                                </p>


                                <h3 className="
                                    mt-2
                                    text-white
                                    text-lg
                                    font-medium
                                ">
                                    Tech Innovation Summit
                                </h3>


                            </div>



                            <span className="
                                text-xs
                                px-3
                                py-1
                                rounded-full
                                bg-white/10
                                text-gray-300
                            ">
                                Live
                            </span>


                        </div>






                        <div className="
                            grid
                            grid-cols-3
                            gap-3
                        ">


                            <div className="
                                bg-[#111]
                                rounded-xl
                                p-3
                            ">

                                <p className="
                                    text-gray-500
                                    text-xs
                                ">
                                    Guests
                                </p>

                                <p className="
                                    text-white
                                    font-semibold
                                    mt-1
                                ">
                                    2.4K
                                </p>

                            </div>





                            <div className="
                                bg-[#111]
                                rounded-xl
                                p-3
                            ">

                                <p className="
                                    text-gray-500
                                    text-xs
                                ">
                                    Tickets
                                </p>

                                <p className="
                                    text-white
                                    font-semibold
                                    mt-1
                                ">
                                    850
                                </p>

                            </div>





                            <div className="
                                bg-[#111]
                                rounded-xl
                                p-3
                            ">

                                <p className="
                                    text-gray-500
                                    text-xs
                                ">
                                    Status
                                </p>

                                <p className="
                                    text-white
                                    font-semibold
                                    mt-1
                                ">
                                    Ready
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
                        Premium event management platform
                    </div>





                </div>









                {/* LOGIN SECTION */}



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
                            Welcome back
                        </h2>



                        <p className="
                            mt-2
                            mb-8
                            text-gray-400
                        ">
                            Sign in to continue to Eventiq
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
                                            transition
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

                                        placeholder="Enter your password"


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
                                            transition
                                        "

                                    />


                                </div>


                                </>



                            ) : (



                                <div>


                                    <label className="
                                        text-sm
                                        text-gray-300
                                    ">
                                        Verification Code
                                    </label>


                                    <input

                                        type="text"

                                        required

                                        maxLength="6"

                                        placeholder="000000"


                                        value={otp}

                                        onChange={(e)=>
                                            setOtp(e.target.value)
                                        }


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
                                "Verify OTP"
                                :
                                "Sign In"
                            }


                        </button>





                        </form>







                        <p className="
                            mt-8
                            text-center
                            text-sm
                            text-gray-400
                        ">


                            Don't have an account?


                            <Link

                                to="/register"

                                className="
                                    ml-2
                                    text-white
                                    font-medium
                                    hover:underline
                                "

                            >
                                Create account
                            </Link>


                        </p>





                    </div>


                </div>




            </div>



        </div>

    );
};


export default Login;