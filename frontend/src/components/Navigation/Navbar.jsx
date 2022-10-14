import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, Navigate, useNavigate}from 'react-router-dom'
import { logoutAction, reset } from "../../redux/slices/userSlice";

export default function NavBar() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const store = useSelector((state) => state?.users);
  //console.log(store);
  const { userAuth, loading, serverError, appErr } = store;

    const [navbar, setNavbar] = useState(false);

    const handleClickLogout=()=>{
        dispatch(logoutAction())
        dispatch(reset())
    }



    return (
        <nav className="w-full bg-zinc-50 shadow-sm sticky top-0  z-50 ">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to="">
                            <h2 className="text-2xl font-bold  text-gray-900">Vstreem-X</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center  pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center  justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className=" hover:text-indigo-600">
                                <Link to="">All videos</Link>
                            </li>
                            <li className=" hover:text-indigo-600">
                                <Link to="">Footage</Link>
                            </li>
                            <li className=" hover:text-indigo-600">
                                <Link to="">Trending Videos</Link>
                            </li>
                            <li className=" hover:text-indigo-600">
                                {userAuth? <Link to="/upload-video">Upload Video</Link>:<></>}
                                
                            </li>
                        </ul>
                        
                        {userAuth ?  <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                    <button onClick={handleClickLogout}
                       
                        className="inline-block w-full px-4 py-2 text-center  bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Logout
                    </button>
                    
                </div>: <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                    <Link
                        to="/login"
                        className="inline-block w-full px-4 py-2 text-center  bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/register"
                        className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Sign up
                    </Link>
                </div>}
                       
                    </div>
                </div>
                {userAuth ? <div className="hidden space-x-2 md:inline-block">
                    <button onClick={handleClickLogout}
                        
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Logout
                    </button>
                  
                </div>:<div className="hidden space-x-2 md:inline-block">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                        Sign up
                    </Link>
                </div>}
                
            </div>
        </nav>
    );
}