import React, {useEffect, useState} from 'react';
import axios from "axios";

function Register() {
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const [alert, setAlert] = useState("")
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setDetails((prev) => ({
            ...prev,  // spread the previous state
            [name]: value,  // dynamically set the key (email or password)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("username", details.username, "email", details.email, "value", details.password);

        const response = await axios.post("http://127.0.0.1:8000/users/register/", details);
        console.log(response);
        setAlert(response.data.message)
        setStatus(response.data.status)
        setDetails({
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        })
    }
    return (
        <div
            className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex flex-col justify-center items-center w-full">
            {
                alert && (
                    <div role="alert"
                         className={`flex mb-28 m-4 alert ${status === 200 ? "alert-success" : "alert-error"}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{alert}</span>
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="username" name="username"
                                   value={details.username} onChange={handleChange}
                                   placeholder="username" required/>

                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="email" name="email"
                                   value={details.email} onChange={handleChange}
                                   placeholder="Email" required/>

                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                      clipRule="evenodd"/>
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="password" name="password"
                                   value={details.password} onChange={handleChange}
                                   id="password" placeholder="Password" required/>

                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                      clipRule="evenodd"/>
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="password"
                                   name="confirm_password"
                                   value={details.confirm_password} onChange={handleChange}
                                   id="confirm_password" placeholder="Confirm Password" required/>

                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                            <input type="checkbox" id="rememberMeCheckbox" name="rememberMe" className="mr-2"/>
                            <span className="text-xs font-semibold">Remember me?</span>
                        </p>
                    </div>

                    <button type="submit" value="register" id="register"
                            className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Register
                    </button>
                    <hr/>
                    <div className="flex justify-center items-center mt-4">
                        <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span className="ml-2">Already have an account?<a href="/login"
                                                                          className="text-xs ml-2 text-blue-500 font-semibold">Login &rarr;</a>
                        </span>
                        </p>
                    </div>
                </div>
                <div className="pt-6 text-base font-semibold leading-7">
                    <p className="font-sans text-red-500 text-md hover:text-red-800">
                        <a href="/" className="absolute">&larr; Home</a>
                    </p>
                </div>
            </form>
        </div>

    );
}

export default Register;