import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { serverURL } from "../../utils/baseUrl";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const VideoUpload = () => {
  const navigate = useNavigate();
  const store = useSelector((state) => state?.users);
  //console.log(store);
  const { userAuth } = store;

  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    if (!videoUrl) {
      toast.error("please upload video");
    }
    try {
      const data = {
          title: input.title,
          desc: input.desc,
          videoUrl,
          userId: userAuth?._id,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const res = await axiosInstance.post("/api/video", data, config);
      console.log(res);
      if (res.data.success) {
        await toast.success("Video Upload Success");
        navigate("/");
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const buttonClick = async (e) => {
    e.preventDefault();
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "brocamp",
        uploadPreset: "videoApp",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
            setVideoUrl(result.info.url)
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    myWidget.open();
  };

  return (
    <div>
        <ToastContainer />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-xl w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Upload Your Files Here
            </h2>
          </div>
          <form className="mt-8 space-y-6" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px ">
              <div>
                <input
                  id="email-address"
                  name="title"
                  type="text"
                  autoComplete="text"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 my-5 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter a Title"
                  onChange={handleChange}
                />
              </div>

              <div>
                <textarea
                  id="password"
                  name="desc"
                  type="text"
                  autoComplete="text"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter a Description"
                  onChange={handleChange}
                />
              </div>
              <input type="text" value={videoUrl} hidden required />

            </div>
            <div className="flex justify-around mx-2">
              <button
                className=" w-1/2  justify-center
                py-2 mr-3 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-green-600 hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                onClick={buttonClick}
              >
                upload video
              </button>

              <>
                {loading ? (
                  <button 
                    type="submit"
                    className=" w-1/2 justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                  >
                    Loading please wait...
                  </button>
                ) : (
                  <button onClick={handleSubmit}
                    type="submit"
                    className=" w-1/2  justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                  >
                    Upload files
                  </button>
                )}
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
